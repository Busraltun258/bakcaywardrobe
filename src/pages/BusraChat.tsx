import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons'
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

const busraChat = httpsCallable<
  { messages: Msg[]; mood: string },
  { reply: string }
>(functions, 'busraChat')

const BusraChat: React.FC = () => {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: 'Efendim aşkım? 💛 Beni mi aradın?' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [mood, setMood] = useState<'normal' | 'trip'>('normal')
  const endRef = useRef<HTMLDivElement>(null)

  // Trip modu açıksa "kızgın Büşra" moduna geç
  useEffect(() => {
    return onSnapshot(doc(db, 'loveStreak', 'tripMode'), (snap) => {
      setMood(snap.data()?.active === true ? 'trip' : 'normal')
    })
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, sending])

  const send = async () => {
    const text = input.trim()
    if (!text || sending) return
    const next = [...msgs, { role: 'user' as const, content: text }]
    setMsgs(next)
    setInput('')
    setSending(true)
    try {
      const res = await busraChat({ messages: next, mood })
      setMsgs([...next, { role: 'assistant', content: res.data.reply || '💛' }])
    } catch (e) {
      const m = e && typeof e === 'object' && 'message' in e ? String((e as { message: string }).message) : ''
      message.error(m || 'Cevap alınamadı')
      setMsgs([...next, { role: 'assistant', content: '🥺 Şu an konuşamıyorum, birazdan tekrar dene.' }])
    } finally {
      setSending(false)
    }
  }

  return (
    <AppLayout>
      <div className="bk-container" style={{ maxWidth: 620 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ color: COLORS.textSecondary }} />
          <img
            src="/busra-avatar.png"
            alt="Büşra"
            onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/apple-touch-icon.png')}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: COLORS.text }}>Büşra {mood === 'trip' ? '😤' : '💛'}</div>
            <div style={{ fontSize: 12, color: mood === 'trip' ? COLORS.error : COLORS.success }}>
              {mood === 'trip' ? 'sana biraz kırgın…' : 'çevrimiçi'}
            </div>
          </div>
        </div>

        <div style={styles.thread}>
          {msgs.map((m, i) => (
            <div key={i} style={{ ...styles.row, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  ...styles.bubble,
                  ...(m.role === 'user' ? styles.bubbleUser : styles.bubbleBusra),
                }}
              >
                {m.content}
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
  thread: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '8px 0',
    minHeight: '55vh',
  },
  row: { display: 'flex' },
  bubble: {
    maxWidth: '78%',
    padding: '9px 13px',
    borderRadius: 16,
    fontSize: 14,
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  bubbleUser: {
    background: COLORS.gradient,
    color: '#fff',
    borderBottomRightRadius: 4,
  },
  bubbleBusra: {
    background: 'rgba(244,114,182,0.14)',
    border: '1px solid rgba(244,114,182,0.28)',
    color: COLORS.text,
    borderBottomLeftRadius: 4,
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
