import { Carousel } from 'antd'
import React, { useRef, useState } from 'react'
import { COLORS } from '../theme'

export interface DaySlide {
  /** Gün anahtarı (0=Pzt … 4=Cum) */
  key: number
  /** Pill üzerinde görünen kısa etiket (ör. "Pzt") */
  label: string
  /** Etiketin yanına küçük işaret (✓, ⭐ sayısı vb.) */
  badge?: React.ReactNode
  /** O günün içeriği */
  content: React.ReactNode
}

/**
 * Haftalık kombinleri TEK kartta gösteren gün slider'ı.
 * Üstte Pzt/Sal/… pill'leri (tıkla-geç), altta kaydırılabilir (swipe) içerik.
 * Pill'ler ve swipe birbirine senkron (carousel ref + afterChange).
 */
const DaySlider: React.FC<{ days: DaySlide[]; initialKey?: number }> = ({ days, initialKey }) => {
  const ref = useRef<{ goTo: (i: number) => void } | null>(null)
  const startIdx = Math.max(
    0,
    initialKey != null ? days.findIndex((d) => d.key === initialKey) : 0,
  )
  const [active, setActive] = useState(startIdx)

  if (days.length === 0) return null

  return (
    <div>
      <div style={styles.pillRow}>
        {days.map((d, i) => (
          <button
            key={d.key}
            type="button"
            onClick={() => ref.current?.goTo(i)}
            style={{ ...styles.pill, ...(i === active ? styles.pillActive : {}) }}
          >
            {d.label}
            {d.badge}
          </button>
        ))}
      </div>
      <Carousel
        ref={ref as never}
        initialSlide={startIdx}
        afterChange={(i) => setActive(i)}
        dots={false}
        infinite={false}
        adaptiveHeight
      >
        {days.map((d) => (
          <div key={d.key}>
            <div style={{ padding: '2px 1px' }}>{d.content}</div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  pillRow: {
    display: 'flex',
    gap: 6,
    overflowX: 'auto',
    padding: '2px 0 10px',
    WebkitOverflowScrolling: 'touch',
  },
  pill: {
    flex: '0 0 auto',
    minWidth: 46,
    padding: '6px 10px',
    borderRadius: 999,
    border: `1px solid ${COLORS.border}`,
    background: 'rgba(255,255,255,0.04)',
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  pillActive: {
    background: 'rgba(124,140,255,0.18)',
    borderColor: 'rgba(124,140,255,0.45)',
    color: COLORS.text,
  },
}

export default DaySlider
