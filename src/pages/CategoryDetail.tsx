import {
  ArrowLeftOutlined,
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
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { CATEGORIES, ClothingItem, SEASONS, Season } from '../types'
import {
  getStoredSeasonFilter,
  matchesSeasonFilter,
  setStoredSeasonFilter,
} from '../utils/seasonFilter'
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
  const [customOrder, setCustomOrder] = useState<string[]>([])
  
  // O anda sürüklenen resmi havada uçurmak için ID takibi
  const [activeId, setActiveId] = useState<string | null>(null)

  // Dokunmatik ve Masaüstü için optimize hassas sensörler
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      // 150ms basılı tutunca sürükleme canlanır, normal kaydırmayı engellemez
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
  )

  const cacheKey = user && categoryKey ? `bk_clothes_${user.uid}_${categoryKey}` : null
  const orderKey = user && categoryKey ? `bk_order_${user.uid}_${categoryKey}` : null

  useEffect(() => {
    if (!orderKey) return
    try {
      const saved = localStorage.getItem(orderKey)
      if (saved) setCustomOrder(JSON.parse(saved))
    } catch {}
  }, [orderKey])

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

  // Wardrobe sayfasında seçilen sezon filtresini al — localStorage'tan canlı oku
  const [seasonFilter, setSeasonFilter] = useState<Set<Season>>(() =>
    getStoredSeasonFilter(),
  )
  // Diğer sekmeden değişirse senkron olsun
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'bk_wardrobe_season_filter') {
        setSeasonFilter(getStoredSeasonFilter())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const orderedItems = useMemo(() => {
    const sorted = sortByCustomOrder(items, customOrder)
    return sorted.filter((c) => matchesSeasonFilter(c.season, seasonFilter))
  }, [items, customOrder, seasonFilter])

  // Havada uçan aktif kıyafeti bulalım
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId),
    [items, activeId],
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

  // Sezonu döngüsel olarak değiştir: 🌍 → ☀️ → 🍂 → ❄️ → 🌍
  const cycleSeason = async (item: ClothingItem) => {
    const order: Season[] = ['all', 'summer', 'transitional', 'winter']
    const currentIdx = order.indexOf(item.season ?? 'all')
    const nextSeason = order[(currentIdx + 1) % order.length]
    try {
      await updateDoc(doc(db, 'clothes', item.id), { season: nextSeason })
      const label = SEASONS.find((s) => s.key === nextSeason)?.label
      message.success(`${label}`)
    } catch (e) {
      console.error(e)
      message.error('Sezon değiştirilemedi')
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null) // Uçuş bitti, sıfırla
    
    if (!over || active.id === over.id) return
    const ids = orderedItems.map((i) => i.id)
    const fromIdx = ids.indexOf(String(active.id))
    const toIdx = ids.indexOf(String(over.id))
    if (fromIdx === -1 || toIdx === -1) return
    const newIds = arrayMove(ids, fromIdx, toIdx)
    setCustomOrder(newIds)
    if (orderKey) {
      try {
        localStorage.setItem(orderKey, JSON.stringify(newIds))
      } catch {}
    }
    
    if (user && categoryKey) {
      saveWardrobeOrder(user.uid, categoryKey, newIds)
    }
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
              {seasonFilter.size > 0
                ? `${orderedItems.length} / ${items.length} parça · sezon filtresi aktif`
                : `${items.length} parça · ${items.length > 1 ? 'Parmağını basılı tutup ekranda özgürce gezdir' : 'Kıyafet eklemek için aşağıdaki butona dokun'}`}
            </p>
            {seasonFilter.size > 0 && (
              <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {Array.from(seasonFilter).map((s) => (
                  <span key={s} style={styles.seasonChip}>
                    {SEASONS.find((x) => x.key === s)?.emoji}{' '}
                    {SEASONS.find((x) => x.key === s)?.label}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const empty = new Set<Season>()
                    setSeasonFilter(empty)
                    setStoredSeasonFilter(empty)
                  }}
                  style={styles.clearLink}
                >
                  temizle
                </button>
              </div>
            )}
          </div>

          <div style={styles.heroActions}>
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
                size="middle"
                icon={<PlusOutlined />}
                loading={uploading}
                style={{ height: 40, padding: '0 14px', borderRadius: 12, minWidth: 20 }}
              >
                {uploading ? `Yükleniyor ${uploadProgress}%` : 'Ekle'}
              </Button>
            </Upload>
          </div>
        </div>

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
          >
            <SortableContext
              items={orderedItems.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="bk-wardrobe-grid">
                {orderedItems.map((item) => (
                  <SortableCell
                    key={item.id}
                    item={item}
                    isOwner={item.ownerId === user?.uid}
                    isEditing={editingId === item.id}
                    editLabel={editLabel}
                    setEditLabel={setEditLabel}
                    onOpen={() => setEnlargedItem(item)}
                    onDelete={() => handleDelete(item)}
                    onStartEdit={() => startEdit(item)}
                    onSaveLabel={() => saveLabel(item)}
                    onCancelEdit={() => setEditingId(null)}
                    onCycleSeason={() => cycleSeason(item)}
                  />
                ))}
              </div>
            </SortableContext>

            {/* DRAG OVERLAY: Parmağın altında özgürce uçan katman */}
            <DragOverlay adjustScale={true} style={{ zIndex: 9999 }}>
              {activeItem ? (
                <div
                  style={{
                    ...styles.card,
                    transform: 'none',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
                    scale: '1.08',
                    opacity: 0.95,
                    cursor: 'grabbing',
                  }}
                >
                  <SmartImage
                    cacheKey={activeItem.id}
                    src={clothingItemImageSrc(activeItem)}
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                  />
                  {activeItem.label && (
                    <div style={styles.cardOverlay}>
                      <div style={styles.labelText}>{activeItem.label}</div>
                    </div>
                  )}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
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

const SortableCell: React.FC<{
  item: ClothingItem
  isOwner: boolean
  isEditing: boolean
  editLabel: string
  setEditLabel: (v: string) => void
  onOpen: () => void
  onDelete: () => void
  onStartEdit: () => void
  onSaveLabel: () => void
  onCancelEdit: () => void
  onCycleSeason: () => void
}> = ({
  item,
  isOwner,
  isEditing,
  editLabel,
  setEditLabel,
  onOpen,
  onDelete,
  onStartEdit,
  onSaveLabel,
  onCancelEdit,
  onCycleSeason,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style: React.CSSProperties = {
    ...styles.card,
    transform: CSS.Transform.toString(transform),
    transition,
    // Sürüklenen orijinal yerdeki kart arkada hafif soluk bir 'gölge/iz' olarak kalır
    opacity: isDragging ? 0.25 : 1,
    zIndex: isDragging ? 0 : 1,
    // Sadece sürükleme anında scroll'u durdur, normal dururken sayfa kaydırılabilsin
    touchAction: isDragging ? 'none' : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      className="bk-card-hover"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div 
        draggable={false} 
        onClick={onOpen} 
        style={{ width: '100%', height: '100%', cursor: 'pointer', userSelect: 'none' }}
      >
        <SmartImage
          cacheKey={item.id}
          src={clothingItemImageSrc(item)}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        />
      </div>

      {isOwner && !isEditing && (
        <>
          {/* Sezon tıkla-değiştir butonu (sol-üst) — döngü: 🌍→☀️→🍂→❄️ */}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              onCycleSeason()
            }}
            style={styles.seasonBtn}
            title="Sezon değiştir"
          >
            {SEASONS.find((s) => s.key === (item.season ?? 'all'))?.emoji}
          </button>
          <Button
            type="text"
            danger
            shape="circle"
            size="small"
            icon={<DeleteOutlined />}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            style={styles.deleteBtn}
          />
        </>
      )}

      <div 
        style={styles.cardOverlay} 
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <div style={{ display: 'flex', gap: 4, width: '100%' }}>
            <Input
              size="small"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              placeholder="Marka, renk…"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveLabel()
                if (e.key === 'Escape') onCancelEdit()
              }}
              style={{ flex: 1, fontSize: 12 }}
            />
            <Button
              size="small"
              type="primary"
              icon={<CheckOutlined />}
              onClick={onSaveLabel}
            />
            <Button size="small" icon={<CloseOutlined />} onClick={onCancelEdit} />
          </div>
        ) : (
          <>
            {item.label && (
              <div style={styles.labelText} title={item.label}>
                {item.label}
              </div>
            )}
            <button 
              type="button" 
              onClick={(e) => {
                e.stopPropagation()
                onStartEdit()
              }} 
              style={styles.labelBtn}
            >
              <EditOutlined style={{ marginRight: 6 }} />
              {item.label ? 'Düzenle' : 'Etiket ekle'}
            </button>
          </>
        )}
      </div>
    </div>
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
  heroActions: {
    marginLeft: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
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
    userSelect: 'none' as const,
    willChange: 'transform',
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
    zIndex: 3,
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
    zIndex: 4,
  },
  seasonChip: {
    fontSize: 10,
    color: COLORS.textSecondary,
    background: 'rgba(124,140,255,0.10)',
    border: `1px solid ${COLORS.border}`,
    padding: '2px 7px',
    borderRadius: 999,
  },
  clearLink: {
    background: 'transparent',
    border: 'none',
    color: COLORS.textMuted,
    fontSize: 11,
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '2px 4px',
  },
  seasonBtn: {
    position: 'absolute' as const,
    top: 6,
    left: 6,
    width: 26,
    height: 26,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: '#fff',
    fontSize: 13,
    lineHeight: 1,
    cursor: 'pointer',
    zIndex: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
