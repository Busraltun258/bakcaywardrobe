/** Ücretsiz Firestore: görsel base64 (data URL) veya eski Storage kayıtları için imageUrl */
export interface ClothingItem {
  id: string
  category: string
  createdAt: number
  ownerId?: string
  imageBase64?: string
  imageUrl?: string
  userId?: string
  label?: string
  description?: string
}

export type OutfitRequestStatus = 'pending' | 'answered' | 'closed'
export type RequestType = 'single' | 'weekly'

export interface OutfitRequest {
  id: string
  fromUid: string
  toUid: string
  wardrobeOwnerUid: string
  note: string
  status: OutfitRequestStatus
  createdAt: number
  /** Tek seferlik talep için kombin günü. */
  requestDate?: string
  /** 'single' (varsayılan) veya 'weekly'. */
  requestType?: RequestType
  /** Haftalık talep için: hafta başlangıcı (YYYY-MM-DD). */
  weekStartDate?: string
  /** Talep anındaki hava durumu (stilistin görmesi için). */
  weather?: {
    temp: number
    description: string
    icon: string
    city: string
    district?: string
  }
}

export type OutfitLiked = 'yes' | 'no' | null

export interface OutfitSuggestion {
  id: string
  requestId: string
  requesterUid?: string
  advisorUid: string
  clothingItemIds: string[]
  advisorNote: string
  createdAt: number
  liked: OutfitLiked
  comment: string
  feedbackAt: number | null
  /** Haftalık öneri için: hangi gün (0=Pzt, 6=Pzr). */
  dayIndex?: number
  /** 1-5 yıldız değerlendirme. 5 yıldız favori demek. */
  rating?: 1 | 2 | 3 | 4 | 5
}

/**
 * Kullanıcının her gün ne giydiğini kaydettiği günlük.
 * date alanı 'YYYY-MM-DD' formatında — gün başına 1 doc.
 */
export interface OutfitDiaryEntry {
  id: string
  userUid: string
  date: string
  clothingItemIds: string[]
  note?: string
  createdAt: number
  updatedAt?: number
}

/** Admin'in önceden hazırladığı taslak kombinler. */
export interface OutfitDraft {
  id: string
  advisorUid: string
  /** Hangi kullanıcının dolabından — bu kullanıcıya talep geldiğinde gösterilecek. */
  wardrobeOwnerUid: string
  name: string
  occasion?: string
  clothingItemIds: string[]
  note: string
  createdAt: number
  updatedAt?: number
}

export interface UserProfile {
  id: string
  username?: string
  displayName?: string
  email?: string
  updatedAt?: number
  isAdmin?: boolean
  fcmToken?: string
}

/** Spark / ücretsiz kullanım için toplam üst sınır */
export const MAX_CLOTHES_TOTAL = 300

export const CATEGORIES = [
  { key: 'pantolon', label: 'Pantolon', emoji: '👖' },
  { key: 'tisort', label: 'Tişört', emoji: '👕' },
  { key: 'kazak', label: 'Kazak', emoji: '🧶' },
  { key: 'ceket', label: 'Ceket', emoji: '🧥' },
  { key: 'gomlek', label: 'Gömlek', emoji: '👔' },
  { key: 'mont', label: 'Mont', emoji: '🥼' },
  { key: 'sort', label: 'Şort', emoji: '🩳' },
  { key: 'ayakkabi', label: 'Ayakkabı', emoji: '👟' },
  { key: 'aksesuar', label: 'Aksesuar', emoji: '⌚' },
] as const

/** Hafta içi 5 gün — kullanıcı genelde iş/okul için kombin istiyor. */
export const WEEKDAYS = [
  { key: 0, label: 'Pazartesi', short: 'Pzt' },
  { key: 1, label: 'Salı', short: 'Sal' },
  { key: 2, label: 'Çarşamba', short: 'Çar' },
  { key: 3, label: 'Perşembe', short: 'Per' },
  { key: 4, label: 'Cuma', short: 'Cum' },
] as const

export const OCCASIONS = [
  { key: 'casual', label: 'Günlük', emoji: '☕' },
  { key: 'work', label: 'İş', emoji: '💼' },
  { key: 'evening', label: 'Davet', emoji: '🥂' },
  { key: 'sport', label: 'Spor', emoji: '🏃' },
  { key: 'travel', label: 'Seyahat', emoji: '✈️' },
  { key: 'other', label: 'Diğer', emoji: '✨' },
] as const
