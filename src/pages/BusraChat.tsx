import { ArrowLeftOutlined, SendOutlined, SoundFilled, SoundOutlined } from '@ant-design/icons'
import { App, Button, Input } from 'antd'
import { doc, onSnapshot } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { db, functions } from '../firebase'
import { COLORS } from '../theme'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const busraChat = httpsCallable<{ messages: Msg[]; mood: string }, { reply: string }>(
  functions,
  'busraChat',
)

// --- Sesli okuma (Türkçe TTS) ---
function pickTrVoice(): SpeechSynthesisVoice | null {
  try {
    const vs = window.speechSynthesis?.getVoices() ?? []
    return vs.find((v) => v.lang?.toLowerCase().startsWith('tr')) ?? null
  } catch {
    return null
  }
}

const BusraChat: React.FC = () => {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: 'Efendim aşkım? 💛 Beni mi aradın?' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [mood, setMood] = useState<'normal' | 'trip'>('normal')
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('bk_busra_muted') === '1'
    } catch {
      return false
    }
  })
  const endRef = useRef<HTMLDivElement>(null)
  const unlockedRef = useRef(false)

  // Trip modu açıksa "kızgın Büşra"
  useEffect(() => {
    return onSnapshot(doc(db, 'loveStreak', 'tripMode'), (snap) => {
      setMood(snap.data()?.active === true ? 'trip' : 'normal')
    })
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, sending])

  // Sesler bazı tarayıcılarda geç yükleniyor — tetikle
  useEffect(() => {
    try {
      window.speechSynthesis?.getVoices()
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices()
    } catch {}
    return () => {
      try {
        window.speechSynthesis?.cancel()
      } catch {}
    }
  }, [])

  const speak = (text: string) => {
    if (muted || !text) return
    try {
      const synth = window.speechSynthesis
      if (!synth) return
      synth.cancel()
      const u = new SpeechSynthesisUtterance(text.replace(/[*_#>`]/g, ''))
      u.lang = 'tr-TR'
      const v = pickTrVoice()
      if (v) u.voice = v
      u.rate = 1.02
      u.pitch = 1.15
      u.onstart = () => setSpeaking(true)
      u.onend = () => setSpeaking(false)
      u.onerror = () => setSpeaking(false)
      synth.speak(u)
    } catch {}
  }

  // iOS: sesi ilk kullanıcı dokunuşunda "aç"
  const unlockSpeech = () => {
    if (unlockedRef.current || muted) return
    unlockedRef.current = true
    try {
      const u = new SpeechSynthesisUtterance(' ')
      u.volume = 0
      window.speechSynthesis.speak(u)
    } catch {}
  }

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m
      try {
        localStorage.setItem('bk_busra_muted', next ? '1' : '0')
      } catch {}
      if (next) {
        try {
          window.speechSynthesis?.cancel()
        } catch {}
        setSpeaking(false)
      }
      return next
    })
  }

  const send = async () => {
    const text = input.trim()
    if (!text || sending) return
    unlockSpeech()
    const next = [...msgs, { role: 'user' as const, content: text }]
    setMsgs(next)
    setInput('')
    setSending(true)
    try {
      const res = await busraChat({ messages: next, mood })
      const reply = res.data.reply || '💛'
      setMsgs([...next, { role: 'assistant', content: reply }])
      speak(reply)
    } catch (e) {
      const m = e && typeof e === 'object' && 'message' in e ? String((e as { message: string }).message) : ''
      message.error(m || 'Cevap alınamadı')
      setMsgs([...next, { role: 'assistant', content: '🥺 Şu an konuşamıyorum, birazdan tekrar dene.' }])
    } finally {
      setSending(false)
    }
  }

  const active = speaking || sending

  return (
    <AppLayout>
      <div className="bk-container" style={{ maxWidth: 620 }}>
        {/* Üst bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ color: COLORS.textSecondary }} />
          <Button
            type="text"
            icon={muted ? <SoundOutlined /> : <SoundFilled />}
            onClick={toggleMute}
            style={{ color: muted ? COLORS.textMuted : COLORS.accent }}
            title={muted ? 'Sesi aç' : 'Sesi kapat'}
          />
        </div>

        {/* Büyük avatar — konuşurken kafa sallar */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div
            className={`${active ? 'bk-speaking-ring' : ''}`}
            style={styles.avatarWrap}
          >
            <img
              src="/busra-avatar.png"
              alt="Büşra"
              className={active ? 'bk-nod' : ''}
              onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/apple-touch-icon.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ fontWeight: 700, color: COLORS.text, marginTop: 8, fontSize: 17 }}>
            Büşra {mood === 'trip' ? '😤' : '💛'}
          </div>
          <div style={{ fontSize: 12, color: mood === 'trip' ? COLORS.error : COLORS.success }}>
            {sending ? 'yazıyor…' : speaking ? 'konuşuyor…' : mood === 'trip' ? 'sana biraz kırgın' : 'çevrimiçi'}
          </div>
        </div>

        {/* Sohbet */}
        <div style={styles.thread}>
          {msgs.map((m, i) => (
            <div key={i} style={{ ...styles.row, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ ...styles.bubble, ...(m.role === 'user' ? styles.bubbleUser : styles.bubbleBusra) }}>
                {m.content}
                {m.role === 'assistant' && i > 0 && (
                  <button type="button" style={styles.listenBtn} onClick={() => speak(m.content)} title="Dinle">
                    🔊
                  </button>
                )}
              </div>
            </div>
          ))}
          {sending && (
            <div style={{ ...styles.row, justifyContent: 'flex-start' }}>
              <div style={{ ...styles.bubble, ...styles.bubbleBusra, opacity: 0.7 }}>Büşra yazıyor…</div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={styles.inputRow}>
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            placeholder="Büşra'ya bir şeyler yaz…"
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{ flex: 1 }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={send} loading={sending} disabled={!input.trim()} />
        </div>
      </div>
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto',
    border: '2px solid rgba(244,114,182,0.5)',
    background: COLORS.bgCard,
  },
  thread: { display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 0', minHeight: '42vh' },
  row: { display: 'flex' },
  bubble: {
    position: 'relative',
    maxWidth: '80%',
    padding: '9px 13px',
    borderRadius: 16,
    fontSize: 14,
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  bubbleUser: { background: COLORS.gradient, color: '#fff', borderBottomRightRadius: 4 },
  bubbleBusra: {
    background: 'rgba(244,114,182,0.14)',
    border: '1px solid rgba(244,114,182,0.28)',
    color: COLORS.text,
    borderBottomLeftRadius: 4,
    paddingRight: 30,
  },
  listenBtn: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 12,
    opacity: 0.7,
    padding: 2,
  },
  inputRow: {
    position: 'sticky',
    bottom: 'calc(70px + env(safe-area-inset-bottom))',
    display: 'flex',
    gap: 8,
    alignItems: 'flex-end',
    background: COLORS.bg,
    padding: '8px 0',
  },
}

export default BusraChat
