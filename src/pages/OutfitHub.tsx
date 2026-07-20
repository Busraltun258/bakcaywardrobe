import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HistoryOutlined,
  InboxOutlined,
  PlusOutlined,
  SearchOutlined,
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
  Rate,
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
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import {
  ClothingItem,
  OutfitMessage,
  OutfitRequest,
  OutfitSuggestion,
  RequestType,
  UserProfile,
  WEEKDAYS,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { buildThread, sendMessageToSuggestion } from '../utils/outfitMessages'
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
  const [allClothes, setAllClothes] = useState<Record<string, ClothingItem>>({})
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
  const [searchParams] = useSearchParams()
  // Sekme seçimi:
  //  - URL'de ?tab=history/new varsa (örn. bildirim linki) ona uyulur.
  //  - Yoksa: değerlendirilmemiş (yıldız verilmemiş) öneri varsa "Önceki Kombinler",
  //    yoksa "Yeni Kombin". Karar, öneriler yüklendikten sonra bir kez verilir.
  const explicitTab = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState<'new' | 'history'>(
    explicitTab === 'history' ? 'history' : 'new',
  )
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false)
  const autoTabDone = useRef(false)
  // Bildirimden gelen ?focus=<id> — o kombine kaydırmak için
  const focusId = searchParams.get('focus')
  const focusDone = useRef(false)
  // Zaten onarılan öneriler — aynı kaydı tekrar tekrar yazmamak için
  const healedRef = useRef<Set<string>>(new Set())
  const [historySearch, setHistorySearch] = useState('')
  const [editingReq, setEditingReq] = useState<OutfitRequest | null>(null)
  // "Geri dön" için: bir parçadan kombine atlarken kaydedilen kaydırma konumu
  const [jumpBackY, setJumpBackY] = useState<number | null>(null)

  const openSlideshow = (items: ClothingItem[], item: ClothingItem) => {
    const idx = Math.max(0, items.findIndex((i) => i.id === item.id))
    setLightboxSlides(items)
    setLightboxIndex(idx)
  }

  // Tüm değerlendirilmemiş (liked=null) önerileri "gördüm" olarak işaretle.
  // Badge'i temizler ama yıldız vermek hâlâ mümkün.
  const markAllSeen = async () => {
    const unrated = suggestions.filter((s) => s.liked === null || s.liked === undefined)
    if (unrated.length === 0) {
      message.info('Zaten her şeyi değerlendirmişsin')
      return
    }
    try {
      // 500'lü chunk'lar (firestore batch limit)
      for (let i = 0; i < unrated.length; i += 400) {
        const chunk = unrated.slice(i, i + 400)
        const batch = writeBatch(db)
        chunk.forEach((s) => {
          batch.update(doc(db, 'outfitSuggestions', s.id), {
            liked: 'yes',
            feedbackAt: Date.now(),
          })
        })
        await batch.commit()
      }
      message.success(`${unrated.length} öneri okundu işaretlendi`)
    } catch (e) {
      console.error(e)
      message.error('İşaretlenemedi')
    }
  }

  const unreadCount = useMemo(
    () => suggestions.filter((s) => s.liked === null || s.liked === undefined).length,
    [suggestions],
  )

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
      setSuggestionsLoaded(true)
    })
  }, [user])

  // Kendini onar: puanı olup 'liked'ı boş kalmış öneriler (örn. eski bir düzenlemeden
  // kalan tutarsızlık) puana göre otomatik 'liked'a bağlanır — böylece "değerlendirilmemiş"
  // sayacı gerçeği yansıtır. Yazma sonrası snapshot yeniden gelir, koşul kalkar → döngü yok.
  useEffect(() => {
    suggestions.forEach((s) => {
      const needsHeal =
        typeof s.rating === 'number' &&
        s.rating > 0 &&
        (s.liked === null || s.liked === undefined) &&
        !healedRef.current.has(s.id)
      if (!needsHeal) return
      healedRef.current.add(s.id)
      updateDoc(doc(db, 'outfitSuggestions', s.id), {
        liked: (s.rating as number) >= 3 ? 'yes' : 'no',
      }).catch(() => healedRef.current.delete(s.id))
    })
  }, [suggestions])

  // Bildirimsiz (URL'de tab yok) girişte varsayılan sekmeyi bir kez belirle:
  // değerlendirilmemiş öneri varsa "Önceki Kombinler", yoksa "Yeni Kombin".
  useEffect(() => {
    if (autoTabDone.current) return
    if (explicitTab) {
      autoTabDone.current = true
      return
    }
    if (!suggestionsLoaded) return
    autoTabDone.current = true
    setActiveTab(unreadCount > 0 ? 'history' : 'new')
  }, [explicitTab, suggestionsLoaded, unreadCount])

  // Bildirime tıklayınca gelen kombine kaydır + vurgula (bir kez).
  useEffect(() => {
    if (!focusId || focusDone.current || !suggestionsLoaded) return
    setActiveTab('history')
    const t = setTimeout(() => {
      const el = document.getElementById(`suggestion-${focusId}`)
      if (!el) return
      focusDone.current = true
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('bk-pulse-highlight')
      setTimeout(() => el.classList.remove('bk-pulse-highlight'), 2500)
    }, 450)
    return () => clearTimeout(t)
  }, [focusId, suggestionsLoaded])

  // Dolabı sayfa açılınca BİR KEZ yükle — her SuggestionCard'ın ayrı sorgu atmasını
  // engeller. Dolabım sayfasının cache'ini de paylaşırız → cold start anında render.
  useEffect(() => {
    if (!user) return
    const cacheKey = `bk_clothes_all_${user.uid}`
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const list = JSON.parse(cached) as ClothingItem[]
        const map: Record<string, ClothingItem> = {}
        list.forEach((c) => {
          map[c.id] = c
        })
        setAllClothes(map)
      }
    } catch {}
    const q = query(collection(db, 'clothes'), where('ownerId', '==', user.uid))
    return onSnapshot(q, (snap) => {
      const map: Record<string, ClothingItem> = {}
      snap.docs.forEach((d) => {
        map[d.id] = { id: d.id, ...d.data() } as ClothingItem
      })
      setAllClothes(map)
      try {
        localStorage.setItem(cacheKey, JSON.stringify(Object.values(map)))
      } catch {}
    })
  }, [user])

  // Hava durumu — kullanıcı il/ilçe seçtiyse onu kullan, yoksa konum izniyle GPS.
  // Seçilen tarih bugünden ileriyse o günün forecast'ı çekilir; bugünse current.
  const targetDate =
    requestType === 'weekly' ? weekStart.format('YYYY-MM-DD') : requestDate.format('YYYY-MM-DD')

  useEffect(() => {
    const cacheKey = `bk_weather_${location?.city ?? 'auto'}_${location?.district ?? ''}_${targetDate}`
    const TTL = 30 * 60 * 1000
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
        const today = dayjs().startOf('day')
        const target = dayjs(targetDate)
        const dayDiff = target.diff(today, 'day')
        let temp = 0
        let code = 0
        // Open-Meteo daily forecast 0-15 gün arası. Bugün dahil.
        if (dayDiff >= 0 && dayDiff <= 15) {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
              `&daily=temperature_2m_max,weather_code&timezone=auto` +
              `&start_date=${targetDate}&end_date=${targetDate}`,
          )
          const data = await res.json()
          temp = data.daily?.temperature_2m_max?.[0] ?? 0
          code = data.daily?.weather_code?.[0] ?? 0
        } else {
          // Geçmiş ya da 15 günden uzak gelecek — güncel hava
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`,
          )
          const data = await res.json()
          temp = data.current?.temperature_2m ?? 0
          code = data.current?.weather_code ?? 0
        }
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
  }, [location?.city, location?.district, targetDate])

  const profileName = (uid: string) =>
    profiles.find((p) => p.id === uid)?.displayName ??
    profiles.find((p) => p.id === uid)?.username ??
    uid.slice(0, 6)

  const myOutgoing = useMemo(
    () => [...fromMe].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [fromMe],
  )

  // Geçmiş kombinler arama: marka/renk/etiket/açıklama/not içinde geçen kelime
  const filteredOutgoing = useMemo(() => {
    const term = historySearch.trim().toLowerCase()
    if (!term) return myOutgoing
    return myOutgoing.filter((r) => {
      if (r.note?.toLowerCase().includes(term)) return true
      const suggs = suggestions.filter((s) => s.requestId === r.id)
      return suggs.some((s) => {
        if (s.advisorNote?.toLowerCase().includes(term)) return true
        if (s.comment?.toLowerCase().includes(term)) return true
        return s.clothingItemIds.some((id) => {
          const c = allClothes[id]
          return (
            c?.label?.toLowerCase().includes(term) ||
            c?.description?.toLowerCase().includes(term)
          )
        })
      })
    })
  }, [historySearch, myOutgoing, suggestions, allClothes])

  const myIncoming = useMemo(
    () =>
      toMe
        .filter((r) => r.status === 'pending')
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [toMe],
  )

  // Stilist (admin) seçimi. Birden fazla admin profili olabilir (eski/duplice
  // hesaplar). Talebin doğru kişiye — ve token'ı olan gerçek hesaba — gitmesi için:
  //  1) ADMIN_EMAILS önceliğine göre (altunbusra32 önce) eşleşen profili seç,
  //  2) o da yoksa fcmToken'ı OLAN bir admin, 3) en son herhangi bir admin.
  const adminProfile = useMemo(() => {
    for (const email of ADMIN_EMAILS) {
      const p = profiles.find((pr) => (pr.email ?? '') === email)
      if (p) return p
    }
    const withToken = profiles.find(
      (p) => p.isAdmin === true && (p.fcmToken || (p.fcmTokens?.length ?? 0) > 0),
    )
    if (withToken) return withToken
    return profiles.find((p) => p.isAdmin === true)
  }, [profiles])

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

  const selectedDateStr =
    requestType === 'weekly'
      ? `${weekStart.format('DD MMM')} - ${weekStart.add(4, 'day').format('DD MMM')}`
      : requestDate.format('DD MMMM YYYY, dddd')

  const locationText = location
    ? location.district
      ? `${location.district}, ${location.city}`
      : location.city
    : 'Konum seçilmedi'

  const renderWeather = () => (
    <Card
      style={styles.weatherCard}
      bodyStyle={{ padding: 14 }}
      hoverable
      onClick={() => setLocationOpen(true)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 30 }}>{weather?.icon ?? '📍'}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {weather ? (
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
              {weather.temp}°C · {weather.description}
            </div>
          ) : (
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
              Hava durumu yükleniyor…
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <EnvironmentOutlined style={{ color: COLORS.textMuted, fontSize: 12 }} />
            <span style={{ color: COLORS.textSecondary, fontSize: 13 }}>
              {locationText}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <CalendarOutlined style={{ color: COLORS.textMuted, fontSize: 12 }} />
            <span style={{ color: COLORS.textMuted, fontSize: 12 }}>
              {selectedDateStr}
            </span>
          </div>
        </div>
        <Tag color="blue" style={{ margin: 0 }}>
          Değiştir
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

  // Bir parçanın en son kullanıldığı BAŞKA kombine kaydır + vurgu.
  // Kaydırmadan önce mevcut konumu sakla ki "Geri dön" ile dönebilsin.
  const jumpToItemUsage = (itemId: string, fromSuggestionId: string) => {
    const target = [...suggestions]
      .filter(
        (s) => s.id !== fromSuggestionId && (s.clothingItemIds ?? []).includes(itemId),
      )
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))[0]
    if (!target) {
      message.info('Bu parça başka bir kombinde kullanılmamış')
      return
    }
    const el = document.getElementById(`suggestion-${target.id}`)
    if (!el) {
      message.info('İlgili kombin bu listede görünmüyor')
      return
    }
    setJumpBackY(window.scrollY)
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('bk-pulse-highlight')
    setTimeout(() => el.classList.remove('bk-pulse-highlight'), 2500)
  }

  // İlk değerlendirilmemiş öneriye scroll et + glow efekti
  const scrollToUnread = () => {
    const firstUnread = suggestions
      .filter((s) => s.liked === null || s.liked === undefined)
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))[0]
    if (!firstUnread) return
    const el = document.getElementById(`suggestion-${firstUnread.id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('bk-pulse-highlight')
      setTimeout(() => el.classList.remove('bk-pulse-highlight'), 2500)
    }
  }

  // Önceki kombinler — kullanıcının kendisine yapılmış TÜM önerileri admin gibi göster
  const historyTab = (
    <>
      {unreadCount > 0 && (
        <Card
          style={styles.unreadBanner}
          bodyStyle={{ padding: '10px 14px' }}
          hoverable
          onClick={scrollToUnread}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: COLORS.text, flex: 1 }}>
              💡 <strong>{unreadCount}</strong> değerlendirilmemiş öneri var — tıkla, götüreyim
            </span>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                markAllSeen()
              }}
            >
              Tümünü gördüm
            </Button>
          </div>
        </Card>
      )}
      {myOutgoing.length > 0 && (
        <Input
          size="middle"
          placeholder="Marka, renk, etiket ara…"
          prefix={<SearchOutlined style={{ color: COLORS.textMuted }} />}
          allowClear
          value={historySearch}
          onChange={(e) => setHistorySearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />
      )}
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
      ) : filteredOutgoing.length === 0 ? (
        <Card>
          <Empty
            description={
              <span style={{ color: COLORS.textSecondary }}>
                "{historySearch}" için sonuç yok
              </span>
            }
            imageStyle={{ height: 60 }}
          />
        </Card>
      ) : (
        filteredOutgoing.map((r) => {
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
              allClothes={allClothes}
              onPreview={openSlideshow}
              onJumpToItem={jumpToItemUsage}
              onEditRequest={() => setEditingReq(r)}
              onDeleteSuggestion={(s) => {
                modal.confirm({
                  title: 'Öneriyi sil?',
                  content:
                    'Bu, talep için kalan son öneriyse talep kartı da silinir.',
                  okText: 'Sil',
                  okType: 'danger',
                  cancelText: 'Vazgeç',
                  centered: true,
                  onOk: async () => {
                    try {
                      await deleteDoc(doc(db, 'outfitSuggestions', s.id))
                      const remaining = suggestions.filter(
                        (x) => x.requestId === s.requestId && x.id !== s.id,
                      )
                      if (remaining.length === 0 && s.requestId) {
                        await deleteDoc(doc(db, 'outfitRequests', s.requestId)).catch(
                          () => undefined,
                        )
                      }
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

      {jumpBackY !== null && (
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: jumpBackY, behavior: 'smooth' })
            setJumpBackY(null)
          }}
          style={styles.jumpBackBtn}
        >
          <ArrowUpOutlined /> Geri dön
        </button>
      )}

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
        requestType={requestType}
        requestDate={requestDate}
        weekStart={weekStart}
        onDateChange={setRequestDate}
        onWeekChange={setWeekStart}
        onClose={() => setLocationOpen(false)}
        onSave={(loc) => {
          setLocation(loc)
          setStoredLocation(loc)
          setLocationOpen(false)
        }}
      />

      <EditRequestModal
        request={editingReq}
        canEditType={
          !!editingReq && suggestions.filter((s) => s.requestId === editingReq.id).length === 0
        }
        onClose={() => setEditingReq(null)}
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
  onEditRequest: () => void
  onPreview: (items: ClothingItem[], item: ClothingItem) => void
  onJumpToItem: (itemId: string, fromSuggestionId: string) => void
  allClothes: Record<string, ClothingItem>
}

const RequestThread: React.FC<RequestThreadProps> = ({
  request,
  suggestions,
  profileName,
  isAdmin,
  onDeleteSuggestion,
  onEditRequest,
  onPreview,
  onJumpToItem,
  allClothes,
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
        </div>
        {isWeekly && <Tag color="purple">5 gün</Tag>}
        <Tag color={request.status === 'pending' ? 'warning' : 'success'}>
          {request.status === 'pending' ? 'Bekliyor' : 'Yanıtlandı'}
        </Tag>
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={onEditRequest}
          style={{ color: COLORS.textSecondary }}
          title="Talebi düzenle"
        />
      </div>

      {/* İki tarih bir arada, etiketli */}
      <div style={styles.dateBlock}>
        <div style={styles.dateLine}>
          <span style={styles.dateLabelTxt}>📤 Talep edildi:</span>
          <span style={styles.dateValTxt}>
            {dayjs(request.createdAt).format('DD MMM YYYY · HH:mm')}
          </span>
        </div>
        {(request.requestDate || request.weekStartDate) && (
          <div style={styles.dateLine}>
            <span style={styles.dateLabelTxt}>👕 Giyilecek:</span>
            <span style={{ ...styles.dateValTxt, color: COLORS.primary, fontWeight: 600 }}>
              {isWeekly
                ? `${dayjs(request.weekStartDate).format('DD MMM')} - ${dayjs(request.weekStartDate).add(4, 'day').format('DD MMM YYYY')}`
                : dayjs(request.requestDate).format('DD MMMM YYYY, dddd')}
            </span>
          </div>
        )}
      </div>

      {request.weather && (
        <p style={styles.weatherPill}>
          {request.weather.icon} {request.weather.temp}°C · {request.weather.description}
          {request.weather.city && (
            <>
              {' · '}📍 {request.weather.district ? `${request.weather.district}, ` : ''}
              {request.weather.city}
            </>
          )}
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
          allClothes={allClothes}
          onDelete={onDeleteSuggestion}
          onPreview={onPreview}
          onJumpToItem={onJumpToItem}
        />
      ) : (
        suggestions.map((s) => (
          <SuggestionCard
            key={s.id}
            suggestion={s}
            profileName={profileName}
            isAdmin={isAdmin}
            allClothes={allClothes}
            onDelete={() => onDeleteSuggestion(s)}
            onPreview={onPreview}
            onJumpToItem={onJumpToItem}
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
  allClothes: Record<string, ClothingItem>
  onDelete: (s: OutfitSuggestion) => void
  onPreview: (items: ClothingItem[], item: ClothingItem) => void
  onJumpToItem: (itemId: string, fromSuggestionId: string) => void
}> = ({ suggestions, profileName, isAdmin, allClothes, onDelete, onPreview, onJumpToItem }) => {
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
                allClothes={allClothes}
                onDelete={() => onDelete(s)}
                onPreview={onPreview}
                onJumpToItem={onJumpToItem}
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
  allClothes: Record<string, ClothingItem>
  onDelete: () => void
  onPreview: (items: ClothingItem[], item: ClothingItem) => void
  onJumpToItem?: (itemId: string, fromSuggestionId: string) => void
  compact?: boolean
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion: s,
  profileName,
  isAdmin,
  allClothes,
  onDelete,
  onPreview,
  onJumpToItem,
  compact = false,
}) => {
  const { message } = App.useApp()
  const { user } = useAuth()
  // Compose kutusu — her zaman boş başlar (chat tarzı). Gönderince temizlenir.
  const [comment, setComment] = useState('')
  const [, setLiked] = useState<'yes' | 'no' | null>(s.liked ?? null)
  const [rating, setRating] = useState<number>(s.rating ?? 0)
  const [savingFeedback, setSavingFeedback] = useState(false)

  // Yeni öneriye geçince (s.id değişince) compose kutusunu boşalt.
  useEffect(() => {
    setComment('')
  }, [s.id])

  useEffect(() => {
    setLiked(s.liked ?? null)
    setRating(s.rating ?? 0)
  }, [s.id, s.liked, s.rating])

  // Üst seviyede yüklenmiş tüm dolaptan parçaları hızlıca seç — fetch yok
  const items = useMemo(() => {
    const map: Record<string, ClothingItem> = {}
    s.clothingItemIds.forEach((id) => {
      if (allClothes[id]) map[id] = allClothes[id]
    })
    return map
  }, [s.clothingItemIds, allClothes])

  // Tüm mesaj geçmişi (ağaç) — eski kayıtlarda advisorNote+comment'ten türetilir.
  const thread = useMemo(() => buildThread(s), [s])

  // Sadece yıldız/beğeni — yorum ve mesaj geçmişine DOKUNMAZ.
  const saveRating = async (newLiked: 'yes' | 'no' | undefined, newRating: number) => {
    setSavingFeedback(true)
    try {
      const patch: { feedbackAt: number; liked?: 'yes' | 'no'; rating: number } = {
        feedbackAt: Date.now(),
        rating: newRating,
      }
      if (newLiked !== undefined) patch.liked = newLiked
      await updateDoc(doc(db, 'outfitSuggestions', s.id), patch)
    } catch {
      message.error('Kaydedilemedi')
    } finally {
      setSavingFeedback(false)
    }
  }

  // Kullanıcı yorumu gönder — mesaj geçmişine EKLER (silmeden), kutuyu temizler.
  const sendComment = async (newLiked?: 'yes' | 'no') => {
    const text = comment.trim()
    if (!text) {
      message.warning('Önce bir şeyler yaz 😊')
      return
    }
    setSavingFeedback(true)
    try {
      const msg: OutfitMessage = {
        role: 'user',
        uid: user?.uid ?? s.requesterUid ?? '',
        text,
        at: Date.now(),
      }
      const extra: { comment: string; feedbackAt: number; liked?: 'yes' | 'no' } = {
        comment: text,
        feedbackAt: Date.now(),
      }
      if (newLiked !== undefined) extra.liked = newLiked
      await sendMessageToSuggestion(s.id, msg, extra)
      setComment('')
      message.success('Yorumun gönderildi 💌')
    } catch {
      message.error('Kaydedilemedi')
    } finally {
      setSavingFeedback(false)
    }
  }

  const handleRate = (val: number) => {
    setRating(val)
    // 5 yıldız = favori, 1-4 yıldız = beğenildi ama favori değil, 0 = nötr.
    if (val === 0) {
      saveRating(undefined, val)
      return
    }
    const newLiked: 'yes' | 'no' = val >= 3 ? 'yes' : 'no'
    setLiked(newLiked)
    saveRating(newLiked, val)
  }

  return (
    <div
      id={`suggestion-${s.id}`}
      style={{ ...styles.suggCard, marginTop: compact ? 8 : 10 }}
    >
      {!compact && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <ThunderboltOutlined style={{ color: COLORS.primary }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
            {profileName(s.advisorUid)}'in önerisi
          </span>
        </div>
      )}

      <div style={styles.thumbsRow}>
        {s.clothingItemIds.map((id) => {
          const c = items[id]
          const orderedItems = s.clothingItemIds
            .map((cid) => items[cid])
            .filter(Boolean) as ClothingItem[]
          const showJump =
            !!onJumpToItem && !!c && c.category !== 'aksesuar' && c.category !== 'ayakkabi'
          return (
            <div key={id} style={{ ...styles.thumbWrap, position: 'relative' }}>
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
                  {showJump && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onJumpToItem!(id, s.id)
                      }}
                      style={styles.jumpArrow}
                      title="Bu parçanın en son kullanıldığı kombine git"
                      aria-label="En son kullanıldığı kombine git"
                    >
                      <ArrowDownOutlined style={{ fontSize: 10 }} />
                    </button>
                  )}
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

      <div style={styles.ratingRow}>
        <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Puanın:</span>
        <Rate
          value={rating}
          onChange={handleRate}
          allowClear
          style={{ fontSize: 22 }}
        />
        {rating === 5 && (
          <Tag color="success" icon={<HeartFilled />} style={{ margin: 0 }}>
            Favori
          </Tag>
        )}
        {rating > 0 && rating <= 2 && (
          <Tag color="warning" icon={<CommentOutlined />} style={{ margin: 0 }}>
            Değişiklik
          </Tag>
        )}
      </div>

      {/* Mesajlaşma: stilist ↔ kullanıcı tüm geçmiş, ağaç gibi alt alta */}
      {thread.length > 0 && (
        <div style={styles.chatBlock}>
          <div style={styles.chatHeader}>💬 Mesajlar</div>
          {thread.map((m, i) => (
            <div key={i} style={styles.chatRow}>
              <span
                style={{
                  ...styles.chatWho,
                  ...(m.role === 'user' ? { color: '#f472b6' } : {}),
                }}
              >
                {m.role === 'advisor'
                  ? `✨ ${profileName(m.uid || s.advisorUid)}`
                  : '💗 Sen'}
              </span>
              <span style={styles.chatText}>"{m.text}"</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>
          {thread.length > 0 ? 'Yanıt yaz:' : 'Yorum ekle:'}
        </div>
        <Input.TextArea
          placeholder="(örn: gri yerine beyaz, mavi mont)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        <Button size="small" onClick={() => sendComment()} loading={savingFeedback}>
          {thread.length > 0 ? 'Yanıtla' : 'Yorumu Kaydet'}
        </Button>
        <Button
          size="small"
          danger
          icon={<CommentOutlined />}
          onClick={() => {
            setLiked('no')
            sendComment('no')
          }}
        >
          Değişiklik İste
        </Button>
        {isAdmin && (
          <Button size="small" danger icon={<DeleteOutlined />} onClick={onDelete}>
            Sil
          </Button>
        )}
      </div>
    </div>
  )
}

/** İl/ilçe + tarih seçici modal. */
const LocationPicker: React.FC<{
  open: boolean
  value: CityDistrict | null
  requestType: RequestType
  requestDate: Dayjs
  weekStart: Dayjs
  onDateChange: (d: Dayjs) => void
  onWeekChange: (d: Dayjs) => void
  onClose: () => void
  onSave: (loc: CityDistrict) => void
}> = ({
  open,
  value,
  requestType,
  requestDate,
  weekStart,
  onDateChange,
  onWeekChange,
  onClose,
  onSave,
}) => {
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
          getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
          options={orderedCities.map((c) => ({ value: c.name, label: c.name }))}
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={styles.label}>İlçe (isteğe bağlı)</label>
        <Select
          value={district || undefined}
          onChange={(v) => setDistrict(v)}
          placeholder={city ? 'İlçe seç' : 'Önce il seç'}
          showSearch
          allowClear
          disabled={!city}
          style={{ width: '100%' }}
          getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
          options={districts.map((d) => ({ value: d, label: d }))}
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      <div>
        <label style={styles.label}>
          <CalendarOutlined style={{ marginRight: 6 }} />
          {requestType === 'weekly' ? 'Hafta başlangıcı (Pzt)' : 'Kombin tarihi'}
        </label>
        {requestType === 'weekly' ? (
          <DatePicker
            value={weekStart}
            onChange={(d) => d && onWeekChange(d)}
            format="DD MMM YYYY"
            allowClear={false}
            picker="week"
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
          />
        ) : (
          <DatePicker
            value={requestDate}
            onChange={(d) => d && onDateChange(d)}
            format="DD MMM YYYY"
            allowClear={false}
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
          />
        )}
      </div>
    </Modal>
  )
}

/** Talebi düzenleme modalı — talebi oluşturan kullanıcı not/tarih/türünü düzeltebilir. */
const EditRequestModal: React.FC<{
  request: OutfitRequest | null
  canEditType: boolean
  onClose: () => void
}> = ({ request, canEditType, onClose }) => {
  const { message } = App.useApp()
  const [note, setNote] = useState('')
  const [type, setType] = useState<RequestType>('single')
  const [date, setDate] = useState<Dayjs>(() => dayjs())
  const [weekStart, setWeekStart] = useState<Dayjs>(() => dayjs().startOf('week').add(1, 'day'))
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!request) return
    setNote(request.note ?? '')
    setType(request.requestType ?? 'single')
    setDate(request.requestDate ? dayjs(request.requestDate) : dayjs())
    setWeekStart(
      request.weekStartDate ? dayjs(request.weekStartDate) : dayjs().startOf('week').add(1, 'day'),
    )
  }, [request])

  const save = async () => {
    if (!request) return
    setSaving(true)
    try {
      const patch: {
        note: string
        requestType: RequestType
        requestDate?: string
        weekStartDate?: string
      } = {
        note: note.trim(),
        requestType: type,
      }
      if (type === 'single') {
        patch.requestDate = date.format('YYYY-MM-DD')
      } else {
        patch.weekStartDate = weekStart.format('YYYY-MM-DD')
      }
      await updateDoc(doc(db, 'outfitRequests', request.id), patch)
      message.success('Talep güncellendi')
      onClose()
    } catch (e) {
      console.error(e)
      message.error('Güncellenemedi')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={!!request}
      title="Talebi Düzenle"
      centered
      onCancel={onClose}
      onOk={save}
      okText="Kaydet"
      cancelText="Vazgeç"
      okButtonProps={{ loading: saving }}
    >
      <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 0 }}>
        Yanlış mı istedin? Notunu, tarihini ya da türünü buradan düzeltebilirsin.
      </p>

      <div style={{ marginBottom: 12 }}>
        <label style={styles.label}>Tür</label>
        <Segmented
          value={type}
          onChange={(v) => setType(v as RequestType)}
          block
          disabled={!canEditType}
          options={[
            { label: 'Tek Gün', value: 'single' },
            { label: 'Haftalık (5 Gün)', value: 'weekly' },
          ]}
        />
        {!canEditType && (
          <p style={{ fontSize: 11, color: COLORS.textMuted, margin: '4px 0 0' }}>
            Öneri hazırlandığı için tür değiştirilemez — not ve tarihi düzenleyebilirsin.
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={styles.label}>
          <CalendarOutlined style={{ marginRight: 6 }} />
          {type === 'weekly' ? 'Hafta başlangıcı (Pzt)' : 'Kombin tarihi'}
        </label>
        {type === 'weekly' ? (
          <DatePicker
            value={weekStart}
            onChange={(d) => d && setWeekStart(d)}
            format="DD MMM YYYY"
            allowClear={false}
            picker="week"
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
          />
        ) : (
          <DatePicker
            value={date}
            onChange={(d) => d && setDate(d)}
            format="DD MMM YYYY"
            allowClear={false}
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
          />
        )}
      </div>

      <div>
        <label style={styles.label}>Not</label>
        <Input.TextArea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Kısa not (örn: yarın akşam davet)"
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
  dateBlock: {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '6px 10px',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 3,
  },
  dateLine: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    flexWrap: 'wrap' as const,
    fontSize: 12,
  },
  dateLabelTxt: {
    color: COLORS.textMuted,
    fontSize: 11,
    minWidth: 90,
  },
  dateValTxt: {
    color: COLORS.textSecondary,
    fontSize: 12,
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
  unreadBanner: {
    marginBottom: 12,
    background: 'rgba(251,191,36,0.08)',
    border: '1px solid rgba(251,191,36,0.25)',
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
  jumpArrow: {
    position: 'absolute' as const,
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(124,140,255,0.92)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    zIndex: 3,
    boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
  },
  jumpBackBtn: {
    position: 'fixed' as const,
    right: 18,
    bottom: 'calc(84px + env(safe-area-inset-bottom))',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    borderRadius: 999,
    border: 'none',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    background: COLORS.gradient,
    boxShadow: '0 8px 24px rgba(124,140,255,0.45)',
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
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap' as const,
    padding: '8px 0',
    marginBottom: 6,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  chatBlock: {
    marginTop: 10,
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  chatHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  chatRow: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
    paddingBottom: 4,
    borderBottom: `1px solid rgba(255,255,255,0.05)`,
  },
  chatWho: {
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.primary,
  },
  chatText: {
    fontSize: 13,
    color: COLORS.text,
    fontStyle: 'italic' as const,
    lineHeight: 1.4,
  },
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
