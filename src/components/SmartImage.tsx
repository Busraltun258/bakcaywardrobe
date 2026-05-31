import React, { useEffect, useRef, useState } from 'react'
import { getCachedImage, getCachedImageSync, setCachedImage } from '../utils/imageCache'

interface Props {
  /** Stabil cache anahtarı (Firestore doc id'si ideal). */
  cacheKey?: string
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  /** Görüntüye lazy-load uygula. */
  lazy?: boolean
  /** Placeholder ikon / emoji. */
  fallback?: React.ReactNode
  /** rootMargin px — viewport'a girmeden önce ne kadar erken yüklensin. */
  rootMargin?: number
  /**
   * 'cover'  = container'ı doldur, gerekirse kırp (grid thumbnail için).
   * 'contain' = orijinal aspect ratio'yu koru, kırpma (lightbox/detay için).
   */
  objectFit?: 'cover' | 'contain'
}

/**
 * Performanslı görsel bileşeni:
 *  - Memory cache'i SYNC kontrol eder → tekrar render'larda flash yok
 *  - IndexedDB cache → sayfa yeniden açıldığında anında görünür
 *  - IntersectionObserver ile gerçek lazy-load
 *  - objectFit ile kırpma / aspect-ratio koruma seçilebilir
 */
const SmartImage: React.FC<Props> = ({
  cacheKey,
  src,
  alt = '',
  className,
  style,
  onClick,
  lazy = true,
  fallback,
  rootMargin = 400,
  objectFit = 'cover',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const initial = cacheKey ? getCachedImageSync(cacheKey) : null
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(initial)
  const [visible, setVisible] = useState(!lazy || !!initial)
  const [loaded, setLoaded] = useState(!!initial)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
            break
          }
        }
      },
      { rootMargin: `${rootMargin}px 0px`, threshold: 0.01 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible, rootMargin])

  useEffect(() => {
    if (!visible || !src) return
    if (resolvedSrc === src) return
    let cancelled = false
    ;(async () => {
      if (cacheKey) {
        const cached = await getCachedImage(cacheKey)
        if (!cancelled && cached) {
          setResolvedSrc(cached)
          return
        }
      }
      if (!cancelled) {
        setResolvedSrc(src)
        if (cacheKey && src.startsWith('data:')) {
          setCachedImage(cacheKey, src)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [visible, src, cacheKey])

  return (
    <div
      ref={ref}
      className={`bk-img-placeholder ${className ?? ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onClick={onClick}
    >
      {!resolvedSrc && (fallback ?? <span style={{ opacity: 0.35, fontSize: 14 }}>•••</span>)}
      {resolvedSrc && (
        <img
          src={resolvedSrc}
          alt={alt}
          className={`bk-img ${loaded ? 'loaded' : 'loading'}`}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          draggable={false}
          style={{
            // Inline style, global .bk-img kuralını override eder
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
          }}
        />
      )}
    </div>
  )
}

export default SmartImage
