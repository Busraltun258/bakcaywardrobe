import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Bir kullanıcının kategori bazlı kıyafet sıralamasını Firestore'da tutar.
 *
 * Koleksiyon: wardrobeOrders/{uid}
 * Şema: { orders: { [categoryKey]: string[] }, updatedAt: number }
 *
 * - Kullanıcı dolapta sürükleyip bıraktığında saveWardrobeOrder çağrılır,
 *   400ms debounce ile Firestore'a yazılır (peş peşe drop'larda spam yok).
 * - Admin / kullanıcı dolabı görüntüleyen her sayfa subscribeWardrobeOrders ile
 *   anlık güncel sırayı alır.
 * - setDoc + merge sayesinde diğer kategorilerin sırası bozulmaz.
 */

export interface WardrobeOrders {
  [categoryKey: string]: string[]
}

interface WardrobeOrderDoc {
  orders?: WardrobeOrders
  updatedAt?: number
}

export function subscribeWardrobeOrders(
  uid: string,
  cb: (orders: WardrobeOrders) => void,
): () => void {
  return onSnapshot(
    doc(db, 'wardrobeOrders', uid),
    (snap) => {
      if (snap.exists()) {
        cb((snap.data() as WardrobeOrderDoc).orders ?? {})
      } else {
        cb({})
      }
    },
    (err) => {
      console.warn('[wardrobeOrder] snapshot error', err)
      cb({})
    },
  )
}

let saveTimer: ReturnType<typeof setTimeout> | null = null
let pending: { uid: string; categoryKey: string; ids: string[] } | null = null

export function saveWardrobeOrder(uid: string, categoryKey: string, ids: string[]): void {
  pending = { uid, categoryKey, ids }
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(async () => {
    if (!pending) return
    const { uid: u, categoryKey: k, ids: list } = pending
    pending = null
    try {
      await setDoc(
        doc(db, 'wardrobeOrders', u),
        {
          orders: { [k]: list },
          updatedAt: Date.now(),
        },
        { merge: true },
      )
    } catch (e) {
      console.error('[wardrobeOrder] save failed', e)
    }
  }, 400)
}

/**
 * Verilen liste, custom sıraya göre sıralanır.
 * Custom sırada olmayanlar en sona createdAt desc ile eklenir.
 */
export function sortByCustomOrder<T extends { id: string; createdAt?: number }>(
  items: T[],
  order: string[] | undefined,
): T[] {
  if (!order || order.length === 0) {
    return [...items].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  }
  const pos = new Map(order.map((id, i) => [id, i]))
  return [...items].sort((a, b) => {
    const pa = pos.has(a.id) ? pos.get(a.id)! : Infinity
    const pb = pos.has(b.id) ? pos.get(b.id)! : Infinity
    if (pa !== pb) return pa - pb
    return (b.createdAt ?? 0) - (a.createdAt ?? 0)
  })
}
