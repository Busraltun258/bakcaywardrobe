import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PictureOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  App,
  Button,
  Empty,
  Input,
  Upload,
} from 'antd'
import Lightbox from '../components/Lightbox'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { CATEGORIES, ClothingItem } from '../types'
import { removeCachedImage } from '../utils/imageCache'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { summarizeBatchUpload, uploadClothesBatch } from '../utils/uploadClothesBatch'
import {
  saveWardrobeOrder,
  sortByCustomOrder,
  subscribeWardrobeOrders,
} from '../utils/wardrobeOrder'

const CategoryDetail: React.FC = () => {
  const { user } = useAuth()
  const { categoryKey } = useParams<{ categoryKey: string }>()
  const navigate = useNavigate()
  const { message, modal } = App.useApp()
  const category = CATEGORIES.find((c) => c.key === categoryKey)

  const [items, setItems] = useState<ClothingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [enlargedItem, setEnlargedItem] = useState<ClothingItem | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const [customOrder, setCustomOrder] = useState<string[]>([])
  const draggedId = useRef<string | null>(null)

  const cacheKey = user && categoryKey ? `bk_clothes_${user.uid}_${categoryKey}` : null
  const orderKey = user && categoryKey ? `bk_order_${user.uid}_${categoryKey}` : null

  // localStorage'dan ilk sırayı oku (offline / Firestore yüklenmeden flash önler)
  useEffect(() => {
    if (!orderKey) return
    try {
      const saved = localStorage.getItem(orderKey)
      if (saved) setCustomOrder(JSON.parse(saved))
    } catch {}
  }, [orderKey])

  // Firestore'dan sıralama dinleyici (canlı senkron — başka cihazda değişse hemen yansır)
  useEffect(() => {
    if (!user || !categoryKey) return
    return subscribeWardrobeOrders(user.uid, (orders) => {
      const list = orders[categoryKey]
      if (list && list.length > 0) {
        setCustomOrder(list)
        if (orderKey) {
          try {
            localStorage.setItem(orderKey, JSON.stringify(list))
          } catch {}
        }
      }
    })
  }, [user, categoryKey, orderKey])

  useEffect(() => {
    if (!categoryKey || !user) return

    if (cacheKey) {
      try {
        const cached = localStorage.getItem(cacheKey)
        if (cached) {
          setItems(JSON.parse(cached))
          setLoading(false)
        }
      } catch {}
    }

    // Doğrudan ownerId + category compound query → daha az read
    const q = query(
      collection(db, 'clothes'),
      where('ownerId', '==', user.uid),
      where('category', '==', categoryKey),
    )
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const mapped = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
        if (cacheKey) {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(mapped))
          } catch {}
        }
        setItems(mapped)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setLoading(false)
      },
    )
    return () => unsubscribe()
  }, [categoryKey, user, cacheKey])

  const orderedItems = useMemo(
    () => sortByCustomOrder(items, customOrder),
    [items, customOrder],
  )

  const handleUpload = async (files: FileList) => {
    if (!categoryKey || !user) return
    setUploading(true)
    setUploadProgress(10)
    try {
      const r = await uploadClothesBatch(files, categoryKey, user.uid)
      setUploadProgress(100)
      const msg = summarizeBatchUpload(r)
      if (msg) {
        message.warning(msg)
      } else if (r.added > 0) {
        message.success(`${r.added} parça başarıyla eklendi`)
      }
    } catch (e) {
      console.error(e)
      message.error('Yükleme sırasında hata oluştu')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 400)
    }
  }

  const handleDelete = async (item: ClothingItem) => {
    modal.confirm({
      title: 'Bu kıyafeti silmek istediğine emin misin?',
      content: 'Bu işlem geri alınamaz.',
      okText: 'Sil',
      okType: 'danger',
      cancelText: 'Vazgeç',
      centered: true,
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'clothes', item.id))
          await removeCachedImage(item.id)
          message.success('Silindi')
        } catch (e) {
          console.error(e)
          message.error('Silinemedi')
        }
      },
    })
  }

  const startEdit = (item: ClothingItem) => {
    setEditingId(item.id)
    setEditLabel(item.label ?? '')
  }

  const saveLabel = async (item: ClothingItem) => {
    try {
      await updateDoc(doc(db, 'clothes', item.id), { label: editLabel.trim() })
      message.success('Kaydedildi')
    } catch (e) {
      console.error(e)
      message.error('Kaydedilemedi')
    }
    setEditingId(null)
  }

  const insertToday = () => {
    const d = new Date()
    const dateStr = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`
    setEditLabel((prev) => (prev ? `${prev} ${dateStr}` : dateStr))
  }

  const handleDragStart = (id: string) => {
    draggedId.current = id
  }
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDragOverId(id)
  }
  const handleDrop = (targetId: string) => {
    if (!draggedId.current || draggedId.current === targetId) {
      draggedId.current = null
      setDragOverId(null)
      return
    }
    const ids = orderedItems.map((i) => i.id)
    const fromIdx = ids.indexOf(draggedId.current)
    const toIdx = ids.indexOf(targetId)
    if (fromIdx === -1 || toIdx === -1) return
    ids.splice(fromIdx, 1)
    ids.splice(toIdx, 0, draggedId.current)
    setCustomOrder(ids)
    if (orderKey) {
      try {
        localStorage.setItem(orderKey, JSON.stringify(ids))
      } catch {}
    }
    // Firestore'a kalıcı kaydet — admin de aynı sırayı görsün
    if (user && categoryKey) {
      saveWardrobeOrder(user.uid, categoryKey, ids)
    }
    draggedId.current = null
    setDragOverId(null)
  }
  const handleDragEnd = () => {
    draggedId.current = null
    setDragOverId(null)
  }

  if (!category) {
    return (
      <AppLayout>
        <div className="bk-container">
          <Empty description="Kategori bulunamadı" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="bk-container">
        {/* Header */}
        <div style={styles.header}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/wardrobe')}
            style={{ color: COLORS.textSecondary }}
          >
            Geri
          </Button>
        </div>

        <div style={styles.hero}>
          <div style={styles.heroIcon}>
            <span style={{ fontSize: 30 }}>{category.emoji}</span>
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={styles.heroTitle}>{category.label}</h1>
            <p style={styles.heroSub}>
              {items.length} parça · {items.length > 1 ? 'sürükleyerek sırala' : 'kıyafet eklemek için aşağıdaki butona dokun'}
            </p>
          </div>
        </div>

        {/* Upload area */}
        <Upload
          multiple
          accept="image/*"
          showUploadList={false}
          beforeUpload={(_file, fileList) => {
            const dt = new DataTransfer()
            fileList.forEach((f) => dt.items.add(f))
            handleUpload(dt.files)
            return false
          }}
          disabled={uploading}
        >
          <Button
            type="primary"
            block
            size="large"
            icon={<PlusOutlined />}
            loading={uploading}
            style={{ marginBottom: 20, height: 50 }}
          >
            {uploading ? `Yükleniyor ${uploadProgress}%` : 'Kıyafet Ekle'}
          </Button>
        </Upload>

        {/* Content */}
        {loading ? (
          <div style={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={styles.skeletonCard} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div style={styles.empty}>
            <PictureOutlined style={{ fontSize: 48, color: COLORS.textMuted }} />
            <p style={{ color: COLORS.textSecondary, margin: '14px 0 0', fontWeight: 600 }}>
              Henüz kıyafet eklenmedi
            </p>
            <p style={{ color: COLORS.textMuted, margin: 0, fontSize: 13 }}>
              Birden fazla fotoğrafı tek seferde seçebilirsin
            </p>
          </div>
        ) : (
          <div className="bk-wardrobe-grid">
            {orderedItems.map((item) => (
              <div
                key={item.id}
                className="bk-card-hover"
                style={{
                  ...styles.card,
                  ...(dragOverId === item.id ? styles.cardDragOver : {}),
                }}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDrop={() => handleDrop(item.id)}
                onDragEnd={handleDragEnd}
              >
                <SmartImage
                  cacheKey={item.id}
                  src={clothingItemImageSrc(item)}
                  style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                  onClick={() => setEnlargedItem(item)}
                />

                {item.ownerId === user?.uid && editingId !== item.id && (
                  <Button
                    type="text"
                    danger
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(item)
                    }}
                    style={styles.deleteBtn}
                  />
                )}

                <div style={styles.cardOverlay}>
                  {editingId === item.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                      <div style={{ display: 'flex', gap: 4, width: '100%' }}>
                        <Input
                          size="small"
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          placeholder="Etiket ekle"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveLabel(item)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          style={{ flex: 1, fontSize: 12 }}
                        />
                        <Button
                          size="small"
                          type="primary"
                          icon={<CheckOutlined />}
                          onClick={() => saveLabel(item)}
                        />
                        <Button
                          size="small"
                          icon={<CloseOutlined />}
                          onClick={() => setEditingId(null)}
                        />
                      </div>
                      <Button
                        size="small"
                        icon={<CalendarOutlined />}
                        onClick={insertToday}
                        style={{ background: 'rgba(124,140,255,0.18)', border: 'none', color: '#fff', fontSize: 11 }}
                      >
                        Bugünün tarihi
                      </Button>
                    </div>
                  ) : (
                    <>
                      {item.label && (
                        <div style={styles.labelText} title={item.label}>
                          {item.label}
                        </div>
                      )}
                      <button type="button" onClick={() => startEdit(item)} style={styles.labelBtn}>
                        <EditOutlined style={{ marginRight: 6 }} />
                        {item.label ? 'Düzenle' : 'Açıklama'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={!!enlargedItem}
        onClose={() => setEnlargedItem(null)}
        slides={orderedItems.map((c) => ({
          src: clothingItemImageSrc(c),
          imageKey: c.id,
          title: c.label,
          description: c.description,
        }))}
        startIndex={Math.max(
          0,
          orderedItems.findIndex((c) => c.id === enlargedItem?.id),
        )}
        actions={
          enlargedItem &&
          enlargedItem.ownerId === user?.uid && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  startEdit(enlargedItem)
                  setEnlargedItem(null)
                }}
              >
                Etiketi Düzenle
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setEnlargedItem(null)
                  handleDelete(enlargedItem)
                }}
              >
                Sil
              </Button>
            </div>
          )
        }
      />
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  header: { marginBottom: 8 },
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    background: COLORS.gradientSoft,
    border: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  heroTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.4px',
  },
  heroSub: {
    margin: '4px 0 0',
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  skeletonCard: {
    aspectRatio: '1',
    borderRadius: 14,
  },
  card: {
    position: 'relative' as const,
    borderRadius: 14,
    overflow: 'hidden',
    background: COLORS.bgCard,
    aspectRatio: '1',
    cursor: 'grab',
  },
  cardDragOver: {
    outline: `2px solid ${COLORS.primary}`,
    outlineOffset: 2,
  },
  cardOverlay: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.9) 100%)',
    padding: '24px 6px 6px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  },
  labelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    padding: '0 2px',
  },
  labelBtn: {
    width: '100%',
    background: 'rgba(255,255,255,0.12)',
    border: 'none',
    color: '#fff',
    fontSize: 11,
    padding: '4px 6px',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  deleteBtn: {
    position: 'absolute' as const,
    top: 6,
    right: 6,
    width: 26,
    height: 26,
    minWidth: 26,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 2,
  },
  empty: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '60px 0',
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
  },
}

export default CategoryDetail
