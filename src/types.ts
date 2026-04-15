/** Ücretsiz Firestore: görsel base64 (data URL) veya eski Storage kayıtları için imageUrl */
export interface ClothingItem {
  id: string
  category: string
  createdAt: number
  ownerId?: string
  imageBase64?: string
  imageUrl?: string
  userId?: string
}

export type OutfitRequestStatus = 'pending' | 'answered' | 'closed'

export interface OutfitRequest {
  id: string
  fromUid: string
  toUid: string
  wardrobeOwnerUid: string
  note: string
  status: OutfitRequestStatus
  createdAt: number
}

export type OutfitLiked = 'yes' | 'no' | null

export interface OutfitSuggestion {
  id: string
  requestId: string
  advisorUid: string
  clothingItemIds: string[]
  advisorNote: string
  createdAt: number
  liked: OutfitLiked
  comment: string
  feedbackAt: number | null
}

export interface UserProfile {
  id: string
  username?: string
  displayName?: string
  email?: string
  updatedAt?: number
}

/** Spark / ücretsiz kullanım için toplam üst sınır */
export const MAX_CLOTHES_TOTAL = 300

export const CATEGORIES = [
  { key: 'pantolon', label: 'Pantolon', emoji: '👖' },
  { key: 'tisort', label: 'Tişört', emoji: '👕' },
  { key: 'kazak', label: 'Kazak', emoji: '🧶' },
  { key: 'ceket', label: 'Ceket', emoji: '🧥' },
  { key: 'gomlek', label: 'Gömlek', emoji: '👔' },
  { key: 'etek', label: 'Etek', emoji: '👗' },
  { key: 'sort', label: 'Şort', emoji: '🩳' },
  { key: 'ayakkabi', label: 'Ayakkabı', emoji: '👟' },
] as const
