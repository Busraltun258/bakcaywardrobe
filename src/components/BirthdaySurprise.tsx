import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { COLORS } from '../theme'

/* ============================================================================
 * 🎂 KAMURAN'IN DOĞUM GÜNÜ SÜRPRİZİ
 *
 * Aşağıdaki CARDS listesini düzenle: her kart için bir fotoğraf (src) ve
 * altında görünecek 2 cümle (line1, line2). Fotoğraflar public/birthday/
 * klasöründe — yeni foto eklersen oraya koyup adını buraya yaz.
 * ========================================================================== */
interface BirthdayCard {
  src: string
  line1: string
  line2: string
}

const CARDS: BirthdayCard[] = [
  {
    src: '/birthday/IMG_2194.jpg',
    line1: 'Birlikteğimiz başlangıcı için atılan o tatlı adım, hayatımın en güzel anı oldu.',
    line2: 'İyi ki biz olduk, iyi ki varsın.',
  },
  {
    src: '/birthday/IMG_3220.jpg',
    line1: 'İlk defa sıcak yuvanda beni ağırladığındaki o muhteşem özenin ve değerin.',
    line2: 'Seninle heyecanlanmak, senin için heyecanlanmak.',
  },
  {
    src: '/birthday/IMG_4495.jpg',
    line1: 'Yılbaşı ağacımızın süslerini alırkenki o mutluluğumuz.',
    line2: 'Her anını biriktiriyorum.',
  },
  {
    src: '/birthday/IMG_6281.jpg',
    line1: 'O mutluluğun, isteğin ve çocuklar gibi heyecanının yanında olmak çok güzel.',
    line2: 'Her zaman yanında hayallerin ve isteklerin için olucam.',
  },
  {
    src: '/birthday/IMG_1674.jpg',
    line1: 'İlk sevgililer günümüzü kutladığımız o tatlı günümüz.',
    line2: 'O içtenliğin ve samimiyetin.',
  },
  {
    src: '/birthday/IMG_8427.jpg',
    line1: 'Prensesler gibi hissettirdiğin o mükemmel günümüz.',
    line2: 'Üzerime titrediğin, verdiğin değer çok güzel.',
  },
  {
    src: '/birthday/2f668399-1819-4e73-9229-3a69db46be5d.jpg',
    line1: 'Sıcacık ailenin mutluluğu ve huzuruna beni davet ettiğiniz o heyecan dolu günümüz.',
    line2: 'İçten gülüşün, masumluğun ve samimiyetin.',
  },
  {
    src: '/birthday/IMG_2002.jpg',
    line1: 'Ailemizden biri olduğun o gün, içimizi ısıtan o güzel anımız.',
    line2: 'İçim içime sığmıyor, seninle her şey çok güzel.',
  },
  {
    src: '/birthday/IMG_7939.jpg',
    line1: 'EVEETTTTT 🤍 Ve o gün her şeye her duruma ve koşula rağmen hep birlikte olduğumuz o gün.',
    line2: 'Seni yaşayacak olmak çok heyecan verici ve güzel.',
  },

]

// 9 Temmuz (ay 1-12 olarak)
const BIRTHDAY = { month: 7, day: 9 }
const SEEN_KEY = `bk_bday_seen_${BIRTHDAY.day}_${BIRTHDAY.month}_${new Date().getFullYear()}`
const SLIDE_MS = 9500

/** Dışarıdan (Dolap'taki buton) slaytı yeniden açmak için kullanılan event adı. */
export const BIRTHDAY_EVENT = 'bk-open-birthday'

/** Slaytı baştan açar — Dolap'taki "Sürprizini izle" butonu bunu çağırır. */
export function openBirthdaySurprise() {
  window.dispatchEvent(new Event(BIRTHDAY_EVENT))
}

/** Bugün 9 Temmuz mu? Butonu yalnızca o gün göstermek için. */
export function isBirthdayToday(): boolean {
  const t = dayjs()
  return t.month() + 1 === BIRTHDAY.month && t.date() === BIRTHDAY.day
}

/** ?bday parametresiyle her zaman önizleme/prova. */
export function isBirthdayPreview(): boolean {
  return new URLSearchParams(window.location.search).has('bday')
}

const CONFETTI_COLORS = ['#7c8cff', '#c084fc', '#f472b6', '#facc15', '#34d399', '#f5f5f7']

const BirthdaySurprise: React.FC = () => {
  const { user, isAdmin } = useAuth()

  // ?bday=1 ile her zaman önizlenebilir (test/prova için)
  const forced = useMemo(
    () => new URLSearchParams(window.location.search).has('bday'),
    [],
  )

  const isBirthday = useMemo(() => {
    const t = dayjs()
    return t.month() + 1 === BIRTHDAY.month && t.date() === BIRTHDAY.day
  }, [])

  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<'intro' | 'slides' | 'finale'>('intro')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Açılma kararı
  useEffect(() => {
    if (forced) {
      setOpen(true)
      return
    }
    if (!user || isAdmin || !isBirthday) return
    let seen = false
    try {
      seen = localStorage.getItem(SEEN_KEY) === '1'
    } catch {}
    if (!seen) setOpen(true)
  }, [user, isAdmin, isBirthday, forced])

  // Dolap'taki "Sürprizini izle" butonu → slaytı baştan aç
  useEffect(() => {
    const handler = () => {
      setIndex(0)
      setStage('intro')
      setOpen(true)
    }
    window.addEventListener(BIRTHDAY_EVENT, handler)
    return () => window.removeEventListener(BIRTHDAY_EVENT, handler)
  }, [])

  // Sonraki birkaç görseli önceden yükle (akıcı geçiş için)
  useEffect(() => {
    if (!open) return
    for (let i = index; i < Math.min(index + 3, CARDS.length); i++) {
      const img = new Image()
      img.src = CARDS[i].src
    }
  }, [open, index])

  // Otomatik ilerleme
  useEffect(() => {
    if (!open || stage !== 'slides' || paused) return
    const t = setTimeout(() => {
      setIndex((i) => {
        if (i >= CARDS.length - 1) {
          setStage('finale')
          return i
        }
        return i + 1
      })
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [open, stage, paused, index])

  const close = () => {
    setOpen(false)
    if (!forced) {
      try {
        localStorage.setItem(SEEN_KEY, '1')
      } catch {}
    }
  }

  const restart = () => {
    setIndex(0)
    setStage('intro')
  }

  const goNext = () => {
    if (stage !== 'slides') return
    setIndex((i) => {
      if (i >= CARDS.length - 1) {
        setStage('finale')
        return i
      }
      return i + 1
    })
  }
  const goPrev = () => {
    if (stage !== 'slides') return
    setIndex((i) => Math.max(0, i - 1))
  }

  // Dekoratif öğeler (sabit kalsın diye useMemo)
  const bokeh = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const size = 40 + Math.random() * 120
        const colors = ['rgba(124,140,255,0.5)', 'rgba(192,132,252,0.5)', 'rgba(244,114,182,0.45)']
        return {
          left: `${Math.random() * 100}%`,
          width: size,
          height: size,
          background: colors[i % colors.length],
          animationDuration: `${10 + Math.random() * 12}s`,
          animationDelay: `${Math.random() * 10}s`,
        }
      }),
    [],
  )

  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }).map(() => ({
        left: `${Math.random() * 100}%`,
        background: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        animationDuration: `${4 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 6}s`,
        transform: `scale(${0.7 + Math.random() * 0.9})`,
      })),
    [],
  )

  if (!open) return null

  const card = CARDS[index]

  return (
    <div className="bk-bday-overlay" role="dialog" aria-modal="true">
      {/* Yüzen ışıklar */}
      {bokeh.map((b, i) => (
        <span key={`b${i}`} className="bk-bday-bokeh" style={b} />
      ))}
      {/* Konfeti (intro ve finale'de) */}
      {stage !== 'slides' &&
        confetti.map((c, i) => (
          <span key={`c${i}`} className="bk-bday-confetti" style={c} />
        ))}

      {/* Kapat */}
      <button type="button" onClick={close} style={styles.closeBtn} aria-label="Kapat">
        ×
      </button>

      {/* ---------- INTRO ---------- */}
      {stage === 'intro' && (
        <div style={styles.center} className="bk-bday-fadeup">
          <div style={styles.cake}>🎂</div>
          <h1 style={styles.introTitle} className="bk-bday-title-shine">
            İyi ki doğdun
          </h1>
          <h2 style={styles.introName} className="bk-bday-title-shine">
            Sevgilim
          </h2>
          <p style={styles.introSub}>Senin için küçük bir sürpriz hazırladım…</p>
          <button
            type="button"
            style={styles.startBtn}
            onClick={() => {
              setIndex(0)
              setStage('slides')
            }}
          >
            Başla ✨
          </button>
        </div>
      )}

      {/* ---------- SLIDES ---------- */}
      {stage === 'slides' && (
        <>
          {/* Üst başlık + ilerleme */}
          <div style={styles.topBar}>
            <div style={styles.topTitle}>🎂 Doğum günün kutlu olsun, küçük kafam</div>
            <div style={styles.progressTrack}>
              <div
                key={index}
                className="bk-bday-progress-fill"
                style={{
                  animationDuration: `${SLIDE_MS}ms`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              />
            </div>
            <div style={styles.counter}>
              {index + 1} / {CARDS.length}
            </div>
          </div>

          {/* Kart */}
          <div style={styles.cardWrap}>
            <div key={index} className="bk-bday-card" style={styles.card}>
              <div style={styles.photoFrame}>
                <img src={card.src} alt="" style={styles.photo} draggable={false} />
                <div style={styles.photoGlow} />
              </div>
              <div style={styles.caption}>
                <p style={styles.line1}>{card.line1}</p>
                <p style={styles.line2}>{card.line2}</p>
              </div>
            </div>
          </div>

          {/* Görünmez sol/sağ dokunma alanları */}
          <button type="button" style={styles.tapLeft} onClick={goPrev} aria-label="Önceki" />
          <button type="button" style={styles.tapRight} onClick={goNext} aria-label="Sonraki" />

          {/* Kontroller */}
          <div style={styles.controls}>
            <button type="button" style={styles.ctrlBtn} onClick={goPrev} aria-label="Önceki">
              ‹
            </button>
            <button
              type="button"
              style={styles.ctrlBtn}
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Devam' : 'Duraklat'}
            >
              {paused ? '▶' : '⏸'}
            </button>
            <button type="button" style={styles.ctrlBtn} onClick={goNext} aria-label="Sonraki">
              ›
            </button>
          </div>

          {/* Noktalar */}
          <div style={styles.dots}>
            {CARDS.map((_, i) => (
              <span
                key={i}
                style={{
                  ...styles.dot,
                  ...(i === index ? styles.dotActive : {}),
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* ---------- FINALE ---------- */}
      {stage === 'finale' && (
        <div style={styles.center} className="bk-bday-fadeup">
          <div style={styles.cake}>🎉</div>
          <h1 style={styles.introTitle} className="bk-bday-title-shine">
            Nice yaşlara
          </h1>
          <p style={{ ...styles.introSub, maxWidth: 360 }}>
            Her günün bugünkü kadar güzel olsun. Seni çok seviyorum.
          </p>
          <p style={{ ...styles.introSub, maxWidth: 360 }}>
                İyi ki doğdun ve iyi ki varsın 🤍
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" style={styles.startBtn} onClick={restart}>
              Tekrar İzle ↺
            </button>
            <button type="button" style={styles.ghostBtn} onClick={close}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 24px',
  },
  cake: { fontSize: 72, lineHeight: 1, marginBottom: 8, filter: 'drop-shadow(0 8px 24px rgba(192,132,252,0.5))' },
  introTitle: {
    margin: 0,
    fontSize: 'clamp(34px, 9vw, 58px)',
    fontWeight: 800,
    letterSpacing: '-1px',
  },
  introName: {
    margin: '2px 0 0',
    fontSize: 'clamp(40px, 11vw, 72px)',
    fontWeight: 800,
    letterSpacing: '-1.5px',
  },
  introSub: {
    margin: '16px 0 28px',
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
  startBtn: {
    border: 'none',
    borderRadius: 999,
    padding: '14px 36px',
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    background: COLORS.gradient,
    boxShadow: '0 10px 30px rgba(124,140,255,0.45)',
  },
  ghostBtn: {
    border: `1px solid ${COLORS.border}`,
    borderRadius: 999,
    padding: '14px 30px',
    fontSize: 15,
    fontWeight: 600,
    color: COLORS.text,
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.05)',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: `1px solid ${COLORS.border}`,
    background: 'rgba(0,0,0,0.35)',
    color: COLORS.text,
    fontSize: 24,
    lineHeight: 1,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    padding: '16px 18px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.textSecondary,
    letterSpacing: '0.3px',
  },
  progressTrack: {
    width: 'min(420px, 80vw)',
    height: 4,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  counter: { fontSize: 11, color: COLORS.textMuted },
  cardWrap: {
    position: 'relative',
    zIndex: 2,
    width: 'min(440px, 90vw)',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    background: 'linear-gradient(160deg, rgba(26,26,38,0.9), rgba(20,16,31,0.9))',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 26,
    padding: 16,
    boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(192,132,252,0.08)',
    backdropFilter: 'blur(10px)',
  },
  photoFrame: {
    position: 'relative',
    width: '100%',
    height: 'min(52vh, 420px)',
    borderRadius: 18,
    overflow: 'hidden',
    background: '#000',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  photoGlow: {
    position: 'absolute',
    inset: 0,
    boxShadow: 'inset 0 -80px 80px -40px rgba(0,0,0,0.55)',
    pointerEvents: 'none',
  },
  caption: {
    padding: '16px 10px 6px',
    textAlign: 'center',
  },
  line1: {
    margin: 0,
    fontSize: 'clamp(17px, 4.6vw, 21px)',
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.4,
    letterSpacing: '-0.2px',
  },
  line2: {
    margin: '8px 0 0',
    fontSize: 'clamp(14px, 4vw, 16px)',
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  tapLeft: { position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '28%', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 2 },
  tapRight: { position: 'absolute', right: 0, top: '20%', bottom: '20%', width: '28%', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 2 },
  controls: {
    position: 'relative',
    zIndex: 3,
    marginTop: 22,
    display: 'flex',
    gap: 14,
    alignItems: 'center',
  },
  ctrlBtn: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: `1px solid ${COLORS.border}`,
    background: 'rgba(255,255,255,0.06)',
    color: COLORS.text,
    fontSize: 20,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
  },
  dots: {
    position: 'relative',
    zIndex: 3,
    marginTop: 16,
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '80vw',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.22)',
    transition: 'all 0.3s ease',
  },
  dotActive: {
    width: 22,
    borderRadius: 999,
    background: COLORS.gradient,
  },
}

export default BirthdaySurprise
