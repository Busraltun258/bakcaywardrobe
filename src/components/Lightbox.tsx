import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getCachedImage, getCachedImageSync, setCachedImage } from '../utils/imageCache'
import { COLORS } from '../theme'

interface SlideItem {
  src: string
  imageKey?: string
  title?: React.ReactNode
  description?: React.ReactNode
}

interface Props {
  open: boolean
  onClose: () => void
  /** Tek görsel için. */
  imageKey?: string
  src?: string
  title?: React.ReactNode
  description?: React.ReactNode
  /** Çoklu görseller — sağ/sol geçiş için. */
  slides?: SlideItem[]
  /** Çoklu görsel modunda hangi slayttan başlanacak. */
  startIndex?: number
  actions?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * Mobil-öncelikli görsel önizleyici.
 *  - Tek görsel veya `slides` ile çoklu görsel
 *  - Çoklu modda yatay swipe + ok tuşları (← →) ile geçiş, yumuşak transition
 *  - Aşağı sürükleyince kapanır, ESC ile kapanır
 */
const Lightbox: React.FC<Props> = ({
  open,
  onClose,
  imageKey,
  src,
  title,
  description,
  slides,
  startIndex = 0,
  actions,
  footer,
}) => {
  const startY = useRef<number | null>(null)
  const startX = useRef<number | null>(null)
  const [dragY, setDragY] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [index, setIndex] = useState(startIndex)
  const [animDir, setAnimDir] = useState<'next' | 'prev' | null>(null)

  const usingSlides = slides && slides.length > 0
  const active: SlideItem = usingSlides
    ? slides![Math.min(index, slides!.length - 1)]
    : { src: src ?? '', imageKey, title, description }

  const initial = active.imageKey ? getCachedImageSync(active.imageKey) : null
  const [resolved, setResolved] = useState<string | null>(initial ?? (open ? active.src : null))

  // Aç/kapan veya slayt değişince başlangıç indeksini sıfırla
  useEffect(() => {
    if (open) setIndex(startIndex)
  }, [open, startIndex])

  // Görseli (cache → kaynak) yükle
  useEffect(() => {
    if (!open || !active.src) return
    let cancelled = false
    setResolved(active.imageKey ? getCachedImageSync(active.imageKey) ?? null : null)
    ;(async () => {
      if (active.imageKey) {
        const cached = await getCachedImage(active.imageKey)
        if (!cancelled && cached) {
          setResolved(cached)
          return
        }
      }
      if (!cancelled) {
        setResolved(active.src)
        if (active.imageKey && active.src.startsWith('data:')) {
          setCachedImage(active.imageKey, active.src)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [open, active.src, active.imageKey])

  // Klavye: ESC kapatır, ← → kaydırır
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (usingSlides && e.key === 'ArrowRight') next()
      if (usingSlides && e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, usingSlides, index])

  // Slayt değişince transition animasyonunu kısa süre sonra kapat
  useEffect(() => {
    if (!animDir) return
    const t = setTimeout(() => setAnimDir(null), 260)
    return () => clearTimeout(t)
  }, [animDir])

  if (!open) return null

  const next = () => {
    if (!usingSlides) return
    if (index >= slides!.length - 1) return
    setAnimDir('next')
    setIndex((i) => i + 1)
  }
  const prev = () => {
    if (!usingSlides) return
    if (index <= 0) return
    setAnimDir('prev')
    setIndex((i) => i - 1)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    startX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (startY.current == null || startX.current == null) return
    const dy = e.touches[0].clientY - startY.current
    const dx = e.touches[0].clientX - startX.current
    if (Math.abs(dx) > Math.abs(dy)) {
      setDragX(dx)
      setDragY(0)
    } else if (dy > 0) {
      setDragY(dy)
      setDragX(0)
    }
  }
  const onTouchEnd = () => {
    if (dragY > 120) {
      onClose()
    } else if (usingSlides && Math.abs(dragX) > 70) {
      if (dragX < 0) next()
      else prev()
    }
    setDragY(0)
    setDragX(0)
    startY.current = null
    startX.current = null
  }

  const canPrev = usingSlides && index > 0
  const canNext = usingSlides && index < (slides!.length - 1)

  const titleNode = active.title ?? title
  const descNode = active.description ?? description

  return createPortal(
    <div style={styles.backdrop} onClick={onClose} className="bk-lightbox-backdrop">
      <div
        style={{
          ...styles.sheet,
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? 'transform 0.3s ease' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div style={styles.grabber} />

        <button type="button" style={styles.close} onClick={onClose} aria-label="Kapat">
          <CloseOutlined />
        </button>

        {usingSlides && (
          <div style={styles.counter}>
            {index + 1} / {slides!.length}
          </div>
        )}

        <div style={styles.imageWrap}>
          {canPrev && (
            <button
              type="button"
              style={{ ...styles.nav, left: 10 }}
              onClick={prev}
              aria-label="Önceki"
            >
              <LeftOutlined />
            </button>
          )}
          {canNext && (
            <button
              type="button"
              style={{ ...styles.nav, right: 10 }}
              onClick={next}
              aria-label="Sonraki"
            >
              <RightOutlined />
            </button>
          )}
          {resolved ? (
            <img
              key={resolved}
              src={resolved}
              alt=""
              draggable={false}
              style={{
                ...styles.image,
                transform:
                  dragX !== 0
                    ? `translateX(${dragX}px)`
                    : animDir === 'next'
                    ? 'translateX(0)'
                    : animDir === 'prev'
                    ? 'translateX(0)'
                    : 'translateX(0)',
                opacity: dragX === 0 ? 1 : Math.max(0.4, 1 - Math.abs(dragX) / 400),
                transition:
                  dragX === 0
                    ? 'transform 0.25s ease, opacity 0.25s ease'
                    : 'none',
                animation: animDir
                  ? `${animDir === 'next' ? 'slideInRight' : 'slideInLeft'} 0.26s ease`
                  : undefined,
              }}
            />
          ) : (
            <div style={styles.imageLoading}>•••</div>
          )}
        </div>

        {(titleNode || descNode || actions || footer) && (
          <div style={styles.body}>
            {titleNode && <div style={styles.title}>{titleNode}</div>}
            {descNode && <div style={styles.desc}>{descNode}</div>}
            {actions && <div style={styles.actions}>{actions}</div>}
            {footer && <div style={styles.footer}>{footer}</div>}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(60px); opacity: 0.2; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-60px); opacity: 0.2; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @media (max-width: 720px) {
          .bk-lightbox-backdrop > div {
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            margin: auto 0 0 !important;
            max-height: 94vh !important;
          }
          .bk-lightbox-backdrop {
            align-items: flex-end !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>,
    document.body,
  )
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.88)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  sheet: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: 560,
    maxHeight: '92vh',
    overflowY: 'auto' as const,
    background: COLORS.bgElevated,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 20,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    animation: 'fadeIn 0.25s ease-out',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  grabber: {
    position: 'absolute' as const,
    top: 8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 42,
    height: 4,
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    zIndex: 2,
  },
  close: {
    position: 'absolute' as const,
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.55)',
    color: '#fff',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  counter: {
    position: 'absolute' as const,
    top: 18,
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#fff',
    fontSize: 12,
    background: 'rgba(0,0,0,0.55)',
    padding: '3px 10px',
    borderRadius: 12,
    zIndex: 3,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  imageWrap: {
    position: 'relative' as const,
    width: '100%',
    background: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
    maxHeight: '70vh',
    overflow: 'hidden',
  },
  image: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '70vh',
    objectFit: 'contain' as const,
    willChange: 'transform, opacity',
  },
  nav: {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.55)',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  imageLoading: {
    color: COLORS.textMuted,
    fontSize: 24,
    padding: 40,
  },
  body: { padding: '18px 20px 22px' },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 6,
    letterSpacing: '-0.3px',
  },
  desc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 1.55,
    marginBottom: 14,
  },
  actions: { marginTop: 4 },
  footer: { marginTop: 16, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` },
}

export default Lightbox
