import React from 'react'
import { COLORS } from '../theme'

interface Props {
  children: React.ReactNode
  /** Spacer yüksekliği — son içeriğin bar arkasında kalmaması için. */
  spacerHeight?: number
}

/**
 * Sayfanın altında sabit duran submit barı.
 *
 * Önceki Affix pattern'ı sayfa içeriği üzerine biniyordu. Bu bileşen:
 *  - Sayfa sonuna görünmez bir spacer ekler → son grid satırı bar arkasında kalmaz
 *  - Fixed position ile viewport altına yapışır
 *  - Mobilde bottom-nav (70px) üstüne otomatik kayar
 *  - Container'ın max-width'ine sığar (ortalanır)
 *  - Solid background — alttaki içerik görünmez
 */
const StickySubmitBar: React.FC<Props> = ({ children, spacerHeight = 110 }) => {
  return (
    <>
      <div style={{ height: spacerHeight }} aria-hidden />
      <div className="bk-sticky-submit" role="region" aria-label="Aksiyon barı">
        <div style={styles.wrap}>
          <div style={styles.inner}>{children}</div>
        </div>
      </div>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '0 16px 16px',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    background: 'rgba(19, 19, 28, 0.94)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: '12px 16px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
    // backdrop-filter'ı kendi katmanına al ki iOS'ta scroll'da zıplamasın
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    willChange: 'transform',
  },
}

export default StickySubmitBar
