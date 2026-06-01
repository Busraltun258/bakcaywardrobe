import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  App,
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Tag,
} from 'antd'
import dayjs from 'dayjs'
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import SmartImage from '../../components/SmartImage'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { COLORS } from '../../theme'
import {
  ClothingItem,
  OCCASIONS,
  OutfitDraft,
  UserProfile,
} from '../../types'
import { clothingItemImageSrc } from '../../utils/imageUtils'

/**
 * Admin taslak kombinler listesi.
 * Yeni taslak için "Kullanıcı seç" akışına yönlendirir.
 */
const AdminDrafts: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { message, modal } = App.useApp()
  const [drafts, setDrafts] = useState<OutfitDraft[]>([])
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({})
  const [clothesCache, setClothesCache] = useState<Record<string, ClothingItem>>({})
  const [loading, setLoading] = useState(true)

  // 1) localStorage cache'ten anında render (cold start için)
  useEffect(() => {
    if (!user) return
    const cacheKey = `bk_drafts_${user.uid}`
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        setDrafts(JSON.parse(cached) as OutfitDraft[])
        setLoading(false)
      }
    } catch {}

    const q = query(collection(db, 'outfitDrafts'), where('advisorUid', '==', user.uid))
    return onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitDraft))
        list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        setDrafts(list)
        setLoading(false)
        try {
          localStorage.setItem(cacheKey, JSON.stringify(list))
        } catch {}
      },
      (err) => {
        console.error('outfitDrafts subscribe error:', err)
        setLoading(false)
      },
    )
  }, [user])

  // Profilleri yükle
  useEffect(() => {
    const uids = Array.from(new Set(drafts.map((d) => d.wardrobeOwnerUid)))
    const need = uids.filter((uid) => !profiles[uid])
    if (need.length === 0) return
    ;(async () => {
      const map: Record<string, UserProfile> = {}
      await Promise.all(
        need.map(async (uid) => {
          const snap = await getDoc(doc(db, 'profiles', uid))
          if (snap.exists()) map[uid] = { id: snap.id, ...snap.data() } as UserProfile
        }),
      )
      setProfiles((prev) => ({ ...prev, ...map }))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drafts.map((d) => d.id).join('|')])

  // Görselleri batch ile yükle — localStorage'tan anında hidrate et, sonra paralel chunk fetch
  useEffect(() => {
    // localStorage'tan tüm taslak görsellerini hydrate
    try {
      const cached = localStorage.getItem('bk_drafts_clothes')
      if (cached) {
        const obj = JSON.parse(cached) as Record<string, ClothingItem>
        setClothesCache((prev) => ({ ...obj, ...prev }))
      }
    } catch {}

    const allIds = drafts.flatMap((d) => d.clothingItemIds)
    const need = Array.from(new Set(allIds)).filter((id) => !clothesCache[id])
    if (need.length === 0) return

    ;(async () => {
      // Tüm chunk'ları PARALEL çek (sıralı değil)
      const chunks: string[][] = []
      for (let i = 0; i < need.length; i += 30) {
        chunks.push(need.slice(i, i + 30))
      }
      const results = await Promise.all(
        chunks.map(async (chunk) => {
          try {
            const q = query(collection(db, 'clothes'), where(documentId(), 'in', chunk))
            const snap = await getDocs(q)
            return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ClothingItem))
          } catch {
            return []
          }
        }),
      )
      const map: Record<string, ClothingItem> = {}
      results.flat().forEach((c) => {
        map[c.id] = c
      })
      setClothesCache((prev) => {
        const merged = { ...prev, ...map }
        try {
          localStorage.setItem('bk_drafts_clothes', JSON.stringify(merged))
        } catch {}
        return merged
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drafts.map((d) => d.id).join('|')])

  const handleDelete = (draft: OutfitDraft) => {
    modal.confirm({
      title: 'Bu taslağı silmek istiyor musun?',
      okText: 'Sil',
      okType: 'danger',
      cancelText: 'Vazgeç',
      centered: true,
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'outfitDrafts', draft.id))
          message.success('Silindi')
        } catch {
          message.error('Silinemedi')
        }
      },
    })
  }

  return (
    <AppLayout>
      <div className="bk-container-wide">
        <div style={styles.hero}>
          <div style={{ flex: 1 }}>
            <h1 style={styles.heroTitle}>
              <FolderOpenOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
              Taslak Kombinler
            </h1>
            <p style={styles.heroSub}>
              Önceden hazırla, talep gelince tek tıkla gönder
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate('/admin/kullanicilar')}
          >
            Yeni Taslak
          </Button>
        </div>

        {loading ? (
          <Card>
            <Skeleton active />
          </Card>
        ) : drafts.length === 0 ? (
          <Card>
            <Empty
              description={
                <span style={{ color: COLORS.textSecondary }}>
                  Henüz taslak yok. Kullanıcı dolabından hazırlamaya başla.
                </span>
              }
            />
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Button type="primary" onClick={() => navigate('/admin/kullanicilar')}>
                Kullanıcı Seç
              </Button>
            </div>
          </Card>
        ) : (
          <Row gutter={[12, 12]}>
            {drafts.map((d) => {
              const ownerName =
                profiles[d.wardrobeOwnerUid]?.displayName ??
                profiles[d.wardrobeOwnerUid]?.username ??
                d.wardrobeOwnerUid.slice(0, 6)
              const occ = OCCASIONS.find((o) => o.key === d.occasion)
              return (
                <Col xs={24} sm={12} lg={8} key={d.id}>
                  <Card
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar size={26} style={{ background: COLORS.gradient }}>
                          {ownerName[0]?.toUpperCase()}
                        </Avatar>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{ownerName}</span>
                      </div>
                    }
                    extra={
                      occ && (
                        <Tag color="purple">
                          {occ.emoji} {occ.label}
                        </Tag>
                      )
                    }
                    actions={[
                      <Button
                        key="e"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/admin/taslak/duzenle/${d.id}`)}
                      >
                        Düzenle
                      </Button>,
                      <Button
                        key="d"
                        danger
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(d)}
                      />,
                    ]}
                  >
                    <h4 style={styles.draftName}>{d.name}</h4>
                    <p style={styles.draftMeta}>
                      {dayjs(d.createdAt).format('DD MMM YYYY')} · {d.clothingItemIds.length} parça
                    </p>
                    <div style={styles.thumbs}>
                      {d.clothingItemIds.slice(0, 6).map((id) => {
                        const c = clothesCache[id]
                        return c ? (
                          <SmartImage
                            key={id}
                            cacheKey={c.id}
                            src={clothingItemImageSrc(c)}
                            style={{ width: 56, height: 56, borderRadius: 8 }}
                          />
                        ) : (
                          <div
                            key={id}
                            className="skeleton"
                            style={{ width: 56, height: 56, borderRadius: 8 }}
                          />
                        )
                      })}
                      {d.clothingItemIds.length > 6 && (
                        <div style={styles.moreThumb}>+{d.clothingItemIds.length - 6}</div>
                      )}
                    </div>
                    {d.note && (
                      <p
                        style={{
                          fontSize: 12,
                          color: COLORS.textSecondary,
                          margin: '10px 0 0',
                          fontStyle: 'italic',
                        }}
                      >
                        "{d.note}"
                      </p>
                    )}
                  </Card>
                </Col>
              )
            })}
          </Row>
        )}
      </div>
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '4px 0 16px',
    flexWrap: 'wrap' as const,
  },
  heroTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: { margin: '4px 0 0', color: COLORS.textSecondary, fontSize: 14 },
  draftName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.text,
  },
  draftMeta: {
    margin: '2px 0 10px',
    fontSize: 12,
    color: COLORS.textMuted,
  },
  thumbs: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  moreThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    background: 'rgba(124,140,255,0.12)',
    border: '1px solid rgba(124,140,255,0.2)',
    color: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 13,
  },
}

export default AdminDrafts
