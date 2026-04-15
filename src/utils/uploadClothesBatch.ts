import { addDoc, collection, getDocs } from 'firebase/firestore'
import { MAX_CLOTHES_TOTAL } from '../types'
import { compressImageToBase64 } from './imageUtils'
import { db } from '../firebase'

export type ClothesBatchResult = {
  added: number
  skippedOversized: number
  truncatedByQuota: number
  failed: number
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

  const countSnap = await getDocs(collection(db, 'clothes'))
  const myCount = countSnap.docs.filter((d) => (d.data() as { ownerId?: string }).ownerId === ownerId).length
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
      const imageBase64 = await compressImageToBase64(file, 400, 0.55)
      if (imageBase64.length > 950_000) {
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
