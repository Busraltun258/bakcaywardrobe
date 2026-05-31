import { addDoc, collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { MAX_CLOTHES_TOTAL } from '../types'
import { compressImageToBase64 } from './imageUtils'

export type ClothesBatchResult = {
  added: number
  skippedOversized: number
  truncatedByQuota: number
  failed: number
}

const COUNT_TTL = 5 * 60 * 1000 // 5 dakika

async function getMyClothesCount(ownerId: string): Promise<number> {
  const cacheKey = `bk_count_${ownerId}`
  try {
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const { count, ts } = JSON.parse(cached)
      if (Date.now() - ts < COUNT_TTL) return count as number
    }
  } catch {}

  const q = query(collection(db, 'clothes'), where('ownerId', '==', ownerId))
  const snap = await getCountFromServer(q)
  const count = snap.data().count

  try { localStorage.setItem(cacheKey, JSON.stringify({ count, ts: Date.now() })) } catch {}
  return count
}

function updateCachedCount(ownerId: string, delta: number) {
  const cacheKey = `bk_count_${ownerId}`
  try {
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const { count, ts } = JSON.parse(cached)
      localStorage.setItem(cacheKey, JSON.stringify({ count: count + delta, ts }))
    }
  } catch {}
}

export async function uploadClothesBatch(
  fileList: FileList | null | undefined,
  categoryKey: string,
  ownerId: string
): Promise<ClothesBatchResult> {
  const files = Array.from(fileList ?? [])
  const result: ClothesBatchResult = {
    added: 0,
    skippedOversized: 0,
    truncatedByQuota: 0,
    failed: 0,
  }
  if (!files.length) return result

  const myCount = await getMyClothesCount(ownerId)
  const slots = MAX_CLOTHES_TOTAL - myCount
  if (slots <= 0) {
    result.truncatedByQuota = files.length
    return result
  }

  const toProcess = files.slice(0, slots)
  result.truncatedByQuota = files.length - toProcess.length

  for (let i = 0; i < toProcess.length; i++) {
    const file = toProcess[i]
    try {
      // Boyut yüksek tutulur (lightbox'ta detay görmek için), WebP @ 0.82 ile
      // genelde 200-500 KB civarı çıkar — Firestore'un 1 MB doc limitinin altında.
      let imageBase64 = await compressImageToBase64(file, 1200, 0.82)
      // Eğer çok büyükse kalite düşürerek yeniden dene (renkli/karmaşık resimler için)
      if (imageBase64.length > 900_000) {
        imageBase64 = await compressImageToBase64(file, 1000, 0.75)
      }
      if (imageBase64.length > 900_000) {
        result.skippedOversized++
        continue
      }
      await addDoc(collection(db, 'clothes'), {
        category: categoryKey,
        ownerId,
        imageBase64,
        createdAt: Date.now() + i,
      })
      result.added++
    } catch (e) {
      console.error('Tek foto yükleme hatası:', e)
      result.failed++
    }
  }

  if (result.added > 0) {
    updateCachedCount(ownerId, result.added)
  }

  return result
}

export function summarizeBatchUpload(r: ClothesBatchResult): string | null {
  const parts: string[] = []
  if (r.truncatedByQuota > 0) {
    parts.push(
      `${r.truncatedByQuota} fotoğraf toplam ${MAX_CLOTHES_TOTAL} parça sınırı yüzünden yüklenmedi.`
    )
  }
  if (r.skippedOversized > 0) {
    parts.push(`${r.skippedOversized} fotoğraf sıkıştırıldıktan sonra bile çok büyüktü.`)
  }
  if (r.failed > 0) {
    parts.push(`${r.failed} fotoğrafta yükleme hatası oluştu.`)
  }
  return parts.length ? parts.join(' ') : null
}
