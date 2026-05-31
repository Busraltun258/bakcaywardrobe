import {
  CalendarOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  HistoryOutlined,
  InboxOutlined,
  PlusOutlined,
  SendOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import {
  App,
  Avatar,
  Button,
  Card,
  DatePicker,
  Empty,
  Input,
  Modal,
  Segmented,
  Select,
  Skeleton,
  Tabs,
  Tag,
} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import {
  ClothingItem,
  OutfitRequest,
  OutfitSuggestion,
  RequestType,
  UserProfile,
  WEEKDAYS,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import {
  CityDistrict,
  DEFAULT_LOCATION,
  TR_CITIES,
  geocodeCity,
  getOrderedCities,
  getStoredLocation,
  setStoredLocation,
} from '../utils/turkishCities'

const ADMIN_EMAILS = ['altunbusra32@gmail.com', 'busra@dolap.com']

function weatherCodeToDesc(code: number): string {
  if (code === 0) return 'Açık'
  if (code <= 3) return 'Parçalı bulutlu'
  if (code <= 48) return 'Sisli'
  if (code <= 57) return 'Çisenti'
  if (code <= 65) return 'Yağmurlu'
  if (code <= 67) return 'Dondurucu yağmur'
  if (code <= 77) return 'Karlı'
  if (code <= 82) return 'Sağanak'
  if (code <= 86) return 'Kar yağışı'
  if (code >= 95) return 'Gök gürültülü'
  return 'Bilinmiyor'
}
function weatherCodeToIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 57) return '🌦️'
  if (code <= 65) return '🌧️'
  if (code <= 67) return '🧊'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌧️'
  if (code <= 86) return '🌨️'
  if (code >= 95) return '⛈️'
  return '🌡️'
}

interface WeatherData {
  temp: number
  description: string
  icon: string
  city: string
  district?: string
}

const OutfitHub: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { message, modal } = App.useApp()

  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [fromMe, setFromMe] = useState<OutfitRequest[]>([])
  const [toMe, setToMe] = useState<OutfitRequest[]>([])
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [note, setNote] = useState('')
  const [requestType, setRequestType] = useState<RequestType>('single')
  const [requestDate, setRequestDate] = useState<Dayjs>(() => dayjs())
  const [weekStart, setWeekStart] = useState<Dayjs>(() => dayjs().startOf('week').add(1, 'day'))
  const [sending, setSending] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<CityDistrict | null>(
    () => getStoredLocation() ?? DEFAULT_LOCATION,
  )
  const [locationOpen, setLocationOpen] = useState(false)
  const [loadingReqs, setLoadingReqs] = useState(true)
  const [lightboxSlides, setLightboxSlides] = useState<ClothingItem[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new')

  const openSlideshow = (items: ClothingItem[], item: ClothingItem) => {
    const idx = Math.max(0, items.findIndex((i) => i.id === item.id))
    setLightboxSlides(items)
    setLightboxIndex(idx)
  }

  useEffect(() => {
    if (!user) return
    const cacheKey = 'bk_profiles_cache'
    const TTL = 10 * 60 * 1000
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < TTL) setProfiles(data)
      }
    } catch {}

    ;(async () => {
      const snap = await getDocs(collection(db, 'profiles'))
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as UserProfile[]
      setProfiles(list)
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ data: list, ts: Date.now() }))
      } catch {}
    })()
  }, [user])

  useEffect(() => {
    if (!user) return
    const q1 = query(collection(db, 'outfitRequests'), where('fromUid', '==', user.uid))
    const q2 = query(collection(db, 'outfitRequests'), where('toUid', '==', user.uid))
    const u1 = onSnapshot(q1, (s) => {
      setFromMe(s.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitRequest)))
      setLoadingReqs(false)
    })
    const u2 = onSnapshot(q2, (s) =>
      setToMe(s.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitRequest))),
    )
    return () => {
      u1()
      u2()
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'outfitSuggestions'), where('requesterUid', '==', user.uid))
    return onSnapshot(q, (snap) => {
      setSuggestions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion)))
    })
  }, [user])

  // Hava durumu — kullanıcı il/ilçe seçtiyse onu kullan, yoksa konum izniyle GPS
  useEffect(() => {
    const cacheKey = `bk_weather_${location?.city ?? 'auto'}_${location?.district ?? ''}`
    const TTL = 30 * 60 * 1000
    // Konum değişti — eski şehrin verisini hemen temizle (kullanıcı eski sıcaklığı görmesin)
    setWeather((prev) =>
      prev && prev.city === (location?.city ?? '') && prev.district === location?.district
        ? prev
        : null,
    )
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < TTL) {
          setWeather(data)
          return
        }
      }
    } catch {}

    const applyCoords = async (lat: number, lon: number, city: string, district?: string) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`,
        )
        const data = await res.json()
        const code = data.current?.weather_code ?? 0
        const temp = data.current?.temperature_2m ?? 0
        const w: WeatherData = {
          temp: Math.round(temp),
          description: weatherCodeToDesc(code),
          icon: weatherCodeToIcon(code),
          city,
          district,
        }
        setWeather(w)
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ data: w, ts: Date.now() }))
        } catch {}
      } catch (e) {
        console.error('Weather fetch error:', e)
      }
    }

    if (location?.city) {
      ;(async () => {
        const coords = await geocodeCity(location.city, location.district)
        if (coords) applyCoords(coords.lat, coords.lon, location.city, location.district)
      })()
      return
    }

    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          let city = ''
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=tr`,
            )
            const geoData = await geoRes.json()
            city = geoData.address?.city || geoData.address?.town || geoData.address?.province || ''
          } catch {
            city = ''
          }
          applyCoords(latitude, longitude, city)
        } catch (e) {
          console.error('Weather fetch error:', e)
        }
      },
      () => {},
      { timeout: 10000 },
    )
  }, [location?.city, location?.district])

  const profileName = (uid: string) =>
    profiles.find((p) => p.id === uid)?.displayName ??
    profiles.find((p) => p.id === uid)?.username ??
    uid.slice(0, 6)

  const myOutgoing = useMemo(
    () => [...fromMe].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [fromMe],
  )

  const myIncoming = useMemo(
    () =>
      toMe
        .filter((r) => r.status === 'pending')
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [toMe],
  )

  const adminProfile = useMemo(
    () =>
      profiles.find((p) => p.isAdmin === true) ??
      profiles.find((p) => ADMIN_EMAILS.includes(p.email ?? '')),
    [profiles],
  )

  const sendRequest = async () => {
    if (!user) return
    const adminUid = adminProfile?.id
    if (!adminUid) {
      message.error('Stilist bulunamadı. Birazdan tekrar deneyin.')
      return
    }
    setSending(true)
    try {
      const payload: Record<string, unknown> = {
        fromUid: user.uid,
        toUid: adminUid,
        wardrobeOwnerUid: user.uid,
        note: note.trim(),
        status: 'pending',
        createdAt: Date.now(),
        requestType,
      }
      if (requestType === 'single') {
        payload.requestDate = requestDate.format('YYYY-MM-DD')
      } else {
        payload.weekStartDate = weekStart.format('YYYY-MM-DD')
      }
      if (weather) {
        payload.weather = weather
      }
      await addDoc(collection(db, 'outfitRequests'), payload)
      setNote('')
      setRequestDate(dayjs())
      setWeekStart(dayjs().startOf('week').add(1, 'day'))
      message.success(
        requestType === 'weekly'
          ? 'Haftalık (5 gün) kombin talebi gönderildi!'
          : 'İstek gönderildi!',
      )
      setActiveTab('history')
    } catch (e) {
      console.error(e)
      message.error('Gönderilemedi.')
    } finally {
      setSending(false)
    }
  }

  const renderWeather = () => (
    <Card
      style={styles.weatherCard}
      bodyStyle={{ padding: 14 }}
      hoverable
      onClick={() => setLocationOpen(true)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 38 }}>{weather?.icon ?? '📍'}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {weather ? (
            <>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>
                {weather.temp}°C · {weather.description}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <EnvironmentOutlined style={{ color: COLORS.textMuted, fontSize: 12 }} />
                <span style={{ color: COLORS.textSecondary, fontSize: 13 }}>
                  {weather.district ? `${weather.district}, ${weather.city}` : weather.city || 'Konum seçilmedi'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>
                Konumunu seç
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
                Hava durumunu kombin önerine ekleyelim
              </div>
            </>
          )}
        </div>
        <Tag color="blue" style={{ margin: 0 }}>
          {weather ? 'Değiştir' : 'Seç'}
        </Tag>
      </div>
    </Card>
  )

  const newRequestCard = (
    <Card
      title={
        <div style={styles.cardTitle}>
          <SendOutlined style={{ color: COLORS.primary }} />
          <span>Yeni Kombin İsteği</span>
        </div>
      }
      style={{ marginBottom: 16 }}
    >
      <Segmented
        value={requestType}
        onChange={(v) => setRequestType(v as RequestType)}
        block
        style={{ marginBottom: 14 }}
        options={[
          {
            label: (
              <span>
                <CalendarOutlined /> Tek Gün
              </span>
            ),
            value: 'single',
          },
          {
            label: (
              <span>
                📅 Haftalık (5 Gün)
              </span>
            ),
            value: 'weekly',
          },
        ]}
      />

      <Input.TextArea
        placeholder={
          requestType === 'weekly'
            ? 'Hafta için kısa not (örn: pzt-cuma iş)'
            : 'Kısa not (örn: yarın akşam davet)'
        }
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        style={{ marginBottom: 12 }}
      />

      {requestType === 'single' ? (
        <div style={styles.dateRow}>
          <span style={styles.dateLabel}>
            <CalendarOutlined style={{ marginRight: 6 }} />
            Tarih:
          </span>
          <DatePicker
            value={requestDate}
            onChange={(d) => d && setRequestDate(d)}
            format="DD MMM YYYY"
            allowClear={false}
            size="small"
            style={{ width: 170 }}
          />
        </div>
      ) : (
        <div style={styles.dateRow}>
          <span style={styles.dateLabel}>📅 Pzt:</span>
          <DatePicker
            value={weekStart}
            onChange={(d) => d && setWeekStart(d)}
            format="DD MMM YYYY"
            allowClear={false}
            picker="week"
            size="small"
            style={{ width: 170 }}
          />
        </div>
      )}

      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={sendRequest}
        loading={sending}
        size="large"
        block
      >
        {sending ? 'Gönderiliyor…' : 'İstek Gönder'}
      </Button>

      <p style={styles.sweetNote}>
        ❤️  Ne kadar şanslısın — senin için kombinini düşünen biri var.
      </p>
    </Card>
  )

  const newTab = (
    <>
      {renderWeather()}
      {!isAdmin && newRequestCard}
      {myIncoming.length > 0 && (
        <Card
          title={
            <div style={styles.cardTitle}>
              <InboxOutlined style={{ color: COLORS.warning }} />
              <span>Gelen İstekler ({myIncoming.length})</span>
            </div>
          }
        >
          {myIncoming.map((r, idx) => (
            <div
              key={r.id}
              style={{
                ...styles.requestBlock,
                borderBottom:
                  idx < myIncoming.length - 1 ? `1px solid ${COLORS.border}` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Avatar size={36} style={{ background: COLORS.gradient }}>
                  {profileName(r.fromUid)[0]?.toUpperCase()}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: COLORS.text }}>
                    {profileName(r.fromUid)}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                    {dayjs(r.createdAt).format('DD MMM HH:mm')}
                  </div>
                </div>
                {r.requestType === 'weekly' && <Tag color="purple">Haftalık · 5 gün</Tag>}
                <Tag color="warning" icon={<ClockCircleOutlined />}>
                  Bekliyor
                </Tag>
              </div>
              {r.weather && (
                <p style={styles.weatherPill}>
                  {r.weather.icon} {r.weather.temp}°C · {r.weather.description} ·{' '}
                  {r.weather.district ? `${r.weather.district}, ` : ''}
                  {r.weather.city}
                </p>
              )}
              {r.note && (
                <p
                  style={{
                    fontSize: 14,
                    color: COLORS.textSecondary,
                    margin: '0 0 8px',
                    fontStyle: 'italic',
                  }}
                >
                  "{r.note}"
                </p>
              )}
              {(r.requestDate || r.weekStartDate) && (
                <p style={{ fontSize: 13, color: COLORS.primary, margin: '0 0 12px' }}>
                  <CalendarOutlined style={{ marginRight: 6 }} />
                  {r.requestType === 'weekly'
                    ? `Hafta: ${dayjs(r.weekStartDate).format('DD MMM')} - ${dayjs(r.weekStartDate).add(4, 'day').format('DD MMM')}`
                    : dayjs(r.requestDate).format('DD MMMM YYYY')}
                </p>
              )}
              <Button type="primary" onClick={() => navigate(`/kombin/yanit/${r.id}`)}>
                Kombin Öner
              </Button>
            </div>
          ))}
        </Card>
      )}
    </>
  )

  // Önceki kombinler — kullanıcının kendisine yapılmış TÜM önerileri admin gibi göster
  const historyTab = (
    <>
      {loadingReqs ? (
        <Card>
          <Skeleton active />
        </Card>
      ) : myOutgoing.length === 0 ? (
        <Card>
          <Empty
            description={
              <span style={{ color: COLORS.textSecondary }}>
                Henüz kombin talep etmemişsin
              </span>
            }
            imageStyle={{ height: 60 }}
          />
        </Card>
      ) : (
        myOutgoing.map((r) => {
          const suggs = suggestions
            .filter((s) => s.requestId === r.id)
            .sort((a, b) => (a.dayIndex ?? 0) - (b.dayIndex ?? 0))
          return (
            <RequestThread
              key={r.id}
              request={r}
              suggestions={suggs}
              profileName={profileName}
              isAdmin={isAdmin}
              onPreview={openSlideshow}
              onDeleteSuggestion={(s) => {
                modal.confirm({
                  title: 'Öneriyi sil?',
                  okText: 'Sil',
                  okType: 'danger',
                  cancelText: 'Vazgeç',
                  centered: true,
                  onOk: async () => {
                    try {
                      await deleteDoc(doc(db, 'outfitSuggestions', s.id))
                      message.success('Silindi')
                    } catch {
                      message.error('Silinemedi')
                    }
                  },
                })
              }}
            />
          )
        })
      )}
    </>
  )

  return (
    <AppLayout>
      <div className="bk-container">
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <ThunderboltOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
            Kombin Önerileri
          </h1>
          <p style={styles.heroSub}>
            {isAdmin
              ? 'Sana gelen istekleri yanıtla, önerilerini gönder'
              : 'Stilistinden tek günlük veya haftalık kombin önerisi al'}
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={(k) => setActiveTab(k as 'new' | 'history')}
          items={[
            {
              key: 'new',
              label: (
                <span>
                  <PlusOutlined /> Yeni Kombin
                </span>
              ),
              children: newTab,
            },
            {
              key: 'history',
              label: (
                <span>
                  <HistoryOutlined /> Önceki Kombinler
                  {myOutgoing.length > 0 && (
                    <span style={styles.tabCount}>{myOutgoing.length}</span>
                  )}
                </span>
              ),
              children: historyTab,
            },
          ]}
        />
      </div>

      <Lightbox
        open={!!lightboxSlides}
        onClose={() => setLightboxSlides(null)}
        slides={
          lightboxSlides?.map((c) => ({
            src: clothingItemImageSrc(c),
            imageKey: c.id,
            title: c.label,
            description: c.description,
          })) ?? []
        }
        startIndex={lightboxIndex}
      />

      <LocationPicker
        open={locationOpen}
        value={location}
        onClose={() => setLocationOpen(false)}
        onSave={(loc) => {
          setLocation(loc)
          setStoredLocation(loc)
          setLocationOpen(false)
        }}
      />
    </AppLayout>
  )
}

interface RequestThreadProps {
  request: OutfitRequest
  suggestions: OutfitSuggestion[]
  profileName: (uid: string) => string
  isAdmin: boolean
  onDeleteSuggestion: (s: OutfitSuggestion) => void
  onPreview: (items: ClothingItem[], item: ClothingItem) => void
}

const RequestThread: React.FC<RequestThreadProps> = ({
  request,
  suggestions,
  profileName,
  isAdmin,
  onDeleteSuggestion,
  onPreview,
}) => {
  const isWeekly = request.requestType === 'weekly'
  return (
    <Card style={{ marginBottom: 10 }} bodyStyle={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Avatar size={30} style={{ background: COLORS.gradient }}>
          {profileName(request.toUid)[0]?.toUpperCase()}
        </Avatar>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
            {profileName(request.toUid)}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>
            {dayjs(request.createdAt).format('DD MMM HH:mm')}
          </div>
        </div>
        {isWeekly && <Tag color="purple">5 gün</Tag>}
        <Tag color={request.status === 'pending' ? 'warning' : 'success'}>
          {request.status === 'pending' ? 'Bekliyor' : 'Yanıtlandı'}
        </Tag>
      </div>
      {request.weather && (
        <p style={styles.weatherPill}>
          {request.weather.icon} {request.weather.temp}°C ·{' '}
          {request.weather.description}
        </p>
      )}
      {request.note && (
        <p
          style={{
            fontSize: 13,
            color: COLORS.textSecondary,
            margin: '0 0 6px',
            fontStyle: 'italic',
          }}
        >
          "{request.note}"
        </p>
      )}
      {(request.requestDate || request.weekStartDate) && (
        <p style={{ fontSize: 12, color: COLORS.primary, margin: '0 0 10px' }}>
          <CalendarOutlined style={{ marginRight: 6 }} />
          {isWeekly
            ? `${dayjs(request.weekStartDate).format('DD MMM')} - ${dayjs(request.weekStartDate).add(4, 'day').format('DD MMM YYYY')}`
            : dayjs(request.requestDate).format('DD MMMM YYYY')}
        </p>
      )}
      {suggestions.length === 0 && request.status === 'pending' && (
        <p style={{ color: COLORS.textMuted, fontSize: 13, margin: 0 }}>
          Öneri henüz hazırlanmadı.
        </p>
      )}
      {isWeekly ? (
        <WeeklyView
          suggestions={suggestions}
          profileName={profileName}
          isAdmin={isAdmin}
          onDelete={onDeleteSuggestion}
          onPreview={onPreview}
        />
      ) : (
        suggestions.map((s) => (
          <SuggestionCard
            key={s.id}
            suggestion={s}
            profileName={profileName}
            isAdmin={isAdmin}
            onDelete={() => onDeleteSuggestion(s)}
            onPreview={onPreview}
          />
        ))
      )}
    </Card>
  )
}

const WeeklyView: React.FC<{
  suggestions: OutfitSuggestion[]
  profileName: (uid: string) => string
  isAdmin: boolean
  onDelete: (s: OutfitSuggestion) => void
  onPreview: (items: ClothingItem[], item: ClothingItem) => void
}> = ({ suggestions, profileName, isAdmin, onDelete, onPreview }) => {
  const byDay = useMemo(() => {
    const map: Record<number, OutfitSuggestion> = {}
    suggestions.forEach((s) => {
      if (typeof s.dayIndex === 'number') map[s.dayIndex] = s
    })
    return map
  }, [suggestions])

  return (
    <div style={{ marginTop: 10 }}>
      {WEEKDAYS.map((day) => {
        const s = byDay[day.key]
        return (
          <div key={day.key} style={styles.weekDayCard}>
            <div style={styles.weekDayHeader}>
              <strong style={{ color: COLORS.text }}>{day.label}</strong>
              {s ? (
                s.liked === 'yes' ? (
                  <Tag color="success" icon={<CheckCircleFilled />}>
                    Beğenildi
                  </Tag>
                ) : s.liked === 'no' ? (
                  <Tag color="error" icon={<CloseCircleFilled />}>
                    Değişiklik
                  </Tag>
                ) : (
                  <Tag color="warning">Yanıt bekliyor</Tag>
                )
              ) : (
                <Tag>Bekliyor</Tag>
              )}
            </div>
            {s ? (
              <SuggestionCard
                suggestion={s}
                profileName={profileName}
                isAdmin={isAdmin}
                onDelete={() => onDelete(s)}
                onPreview={onPreview}
                compact
              />
            ) : (
              <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>
                Henüz öneri hazırlanmadı.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface SuggestionCardProps {
  suggestion: OutfitSuggestion
  profileName: (uid: string) => string
  isAdmin: boolean
  onDelete: () => void
  onPreview: (items: ClothingItem[], item: ClothingItem) => void
  compact?: boolean
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion: s,
  profileName,
  isAdmin,
  onDelete,
  onPreview,
  compact = false,
}) => {
  const { message } = App.useApp()
  const [comment, setComment] = useState(s.comment ?? '')
  const [liked, setLiked] = useState<'yes' | 'no' | null>(s.liked ?? null)
  const [items, setItems] = useState<Record<string, ClothingItem>>({})
  const [savingFeedback, setSavingFeedback] = useState(false)

  useEffect(() => {
    setComment(s.comment ?? '')
    setLiked(s.liked ?? null)
  }, [s.id, s.comment, s.liked])

  useEffect(() => {
    if (s.clothingItemIds.length === 0) return
    let cancelled = false
    ;(async () => {
      const map: Record<string, ClothingItem> = {}
      for (let i = 0; i < s.clothingItemIds.length; i += 30) {
        const chunk = s.clothingItemIds.slice(i, i + 30)
        try {
          const q = query(collection(db, 'clothes'), where(documentId(), 'in', chunk))
          const snap = await getDocs(q)
          snap.docs.forEach((d) => {
            map[d.id] = { id: d.id, ...d.data() } as ClothingItem
          })
        } catch {
          await Promise.all(
            chunk.map(async (id) => {
              const snap = await getDoc(doc(db, 'clothes', id))
              if (snap.exists()) map[snap.id] = { id: snap.id, ...snap.data() } as ClothingItem
            }),
          )
        }
      }
      if (!cancelled) setItems(map)
    })()
    return () => {
      cancelled = true
    }
  }, [s.id, s.clothingItemIds.join('|')])

  const saveFeedback = async (newLiked: 'yes' | 'no' | undefined, commentVal: string) => {
    setSavingFeedback(true)
    try {
      const patch: { comment: string; feedbackAt: number; liked?: 'yes' | 'no' } = {
        comment: commentVal.trim(),
        feedbackAt: Date.now(),
      }
      if (newLiked !== undefined) patch.liked = newLiked
      await updateDoc(doc(db, 'outfitSuggestions', s.id), patch)
      message.success('Kaydedildi')
    } catch {
      message.error('Kaydedilemedi')
    } finally {
      setSavingFeedback(false)
    }
  }

  return (
    <div style={{ ...styles.suggCard, marginTop: compact ? 8 : 10 }}>
      {!compact && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <ThunderboltOutlined style={{ color: COLORS.primary }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
            {profileName(s.advisorUid)}'in önerisi
          </span>
        </div>
      )}

      {s.advisorNote && (
        <p
          style={{
            fontSize: 13,
            color: COLORS.textSecondary,
            margin: '0 0 10px',
            fontStyle: 'italic',
          }}
        >
          "{s.advisorNote}"
        </p>
      )}

      <div style={styles.thumbsRow}>
        {s.clothingItemIds.map((id) => {
          const c = items[id]
          const orderedItems = s.clothingItemIds
            .map((cid) => items[cid])
            .filter(Boolean) as ClothingItem[]
          return (
            <div key={id} style={styles.thumbWrap}>
              {c ? (
                <>
                  <button
                    type="button"
                    onClick={() => onPreview(orderedItems, c)}
                    style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                  >
                    <SmartImage
                      cacheKey={c.id}
                      src={clothingItemImageSrc(c)}
                      style={{ width: 70, height: 70, borderRadius: 10 }}
                    />
                  </button>
                  {(c.description || c.label) && (
                    <span style={styles.thumbLabel}>{c.description || c.label}</span>
                  )}
                </>
              ) : (
                <div className="skeleton" style={{ width: 70, height: 70, borderRadius: 10 }} />
              )}
            </div>
          )
        })}
      </div>

      <div style={styles.feedbackRow}>
        <Button
          type={liked === 'yes' ? 'primary' : 'default'}
          icon={liked === 'yes' ? <HeartFilled /> : <HeartOutlined />}
          onClick={() => {
            setLiked('yes')
            saveFeedback('yes', comment)
          }}
          loading={savingFeedback && liked !== 'yes'}
        >
          Beğendim
        </Button>
        <Button
          danger={liked === 'no'}
          type={liked === 'no' ? 'primary' : 'default'}
          icon={<CommentOutlined />}
          onClick={() => {
            setLiked('no')
            saveFeedback('no', comment)
          }}
        >
          Değişiklik İste
        </Button>
      </div>

      <Input.TextArea
        placeholder="Yorum ekle…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        style={{ marginTop: 10 }}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <Button onClick={() => saveFeedback(undefined, comment)} loading={savingFeedback}>
          Yorumu Kaydet
        </Button>
        {isAdmin && (
          <Button danger icon={<DeleteOutlined />} onClick={onDelete}>
            Sil
          </Button>
        )}
      </div>
    </div>
  )
}

/** İl/ilçe seçici modal. */
const LocationPicker: React.FC<{
  open: boolean
  value: CityDistrict | null
  onClose: () => void
  onSave: (loc: CityDistrict) => void
}> = ({ open, value, onClose, onSave }) => {
  const [city, setCity] = useState<string>(value?.city ?? '')
  const [district, setDistrict] = useState<string>(value?.district ?? '')

  useEffect(() => {
    if (!open) return
    setCity(value?.city ?? '')
    setDistrict(value?.district ?? '')
  }, [open, value])

  const districts = TR_CITIES.find((c) => c.name === city)?.districts ?? []
  const orderedCities = getOrderedCities()

  return (
    <Modal
      open={open}
      title="Konumunu seç"
      centered
      onCancel={onClose}
      onOk={() => {
        if (!city) return
        onSave({ city, district: district || undefined })
      }}
      okText="Kaydet"
      cancelText="Vazgeç"
      okButtonProps={{ disabled: !city }}
    >
      <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 0 }}>
        Hava durumu seçtiğin yere göre hesaplanır ve kombin isteğinle stiliste gönderilir.
      </p>
      <div style={{ marginBottom: 12 }}>
        <label style={styles.label}>İl</label>
        <Select
          value={city || undefined}
          onChange={(v) => {
            setCity(v)
            setDistrict('')
          }}
          placeholder="İl seç"
          showSearch
          style={{ width: '100%' }}
          options={orderedCities.map((c) => ({ value: c.name, label: c.name }))}
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      <div>
        <label style={styles.label}>İlçe (isteğe bağlı)</label>
        <Select
          value={district || undefined}
          onChange={(v) => setDistrict(v)}
          placeholder={city ? 'İlçe seç' : 'Önce il seç'}
          showSearch
          allowClear
          disabled={!city}
          style={{ width: '100%' }}
          options={districts.map((d) => ({ value: d, label: d }))}
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
    </Modal>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { padding: '4px 0 8px' },
  heroTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: { margin: '4px 0 8px', color: COLORS.textSecondary, fontSize: 14 },
  weatherCard: {
    marginBottom: 14,
    cursor: 'pointer',
    background: `linear-gradient(135deg, ${COLORS.bgCard}, rgba(124,140,255,0.08))`,
  },
  weatherPill: {
    display: 'inline-block',
    fontSize: 12,
    color: COLORS.textSecondary,
    background: 'rgba(124,140,255,0.10)',
    border: `1px solid ${COLORS.border}`,
    padding: '3px 8px',
    borderRadius: 999,
    margin: '0 0 8px',
  },
  cardTitle: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600 },
  dateRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  dateLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 500,
  },
  sweetNote: {
    margin: '12px 0 0',
    padding: '8px 12px',
    background: 'linear-gradient(135deg, rgba(244,114,182,0.10), rgba(167,139,250,0.10))',
    border: `1px solid rgba(244,114,182,0.18)`,
    borderRadius: 10,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
    fontStyle: 'italic' as const,
    lineHeight: 1.5,
  },
  requestBlock: { padding: '12px 0' },
  weekDayCard: {
    background: 'rgba(255,255,255,0.02)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  weekDayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggCard: {
    background: 'rgba(124, 140, 255, 0.04)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: 14,
  },
  thumbsRow: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  thumbWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
    maxWidth: 80,
  },
  thumbLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: 'center' as const,
    lineHeight: 1.2,
    maxWidth: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
  },
  feedbackRow: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' },
  tabCount: {
    marginLeft: 6,
    background: COLORS.primary,
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    padding: '1px 7px',
    borderRadius: 10,
  },
  label: {
    display: 'block',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
}

export default OutfitHub
