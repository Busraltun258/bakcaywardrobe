import type { ClothingItem } from '../types'

export function clothingItemImageSrc(item: ClothingItem): string {
  if (item.imageBase64) return item.imageBase64
  if (item.imageUrl) return item.imageUrl
  return ''
}

/** Tarayıcıda yeniden boyutlandırıp JPEG data URL üretir (Firestore ücretsiz kullanım için küçük tutar). */
export async function compressImageToBase64(
  file: File,
  maxDimension: number,
  quality: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      let { width, height } = img
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas desteklenmiyor'))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Resim okunamadı'))
    }
    img.src = objectUrl
  })
}
