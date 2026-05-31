import type { ClothingItem } from '../types'

export function clothingItemImageSrc(item: ClothingItem): string {
  if (item.imageBase64) return item.imageBase64
  if (item.imageUrl) return item.imageUrl
  return ''
}

const TINY_PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%231a1a26"/></svg>'

export function tinyImagePlaceholder(): string {
  return TINY_PLACEHOLDER
}

/**
 * Tarayıcıda resmi yeniden boyutlandırıp WebP üretir.
 * WebP, JPEG'e göre ~%30 daha küçük olduğu için Firestore okuma/yazma maliyetini düşürür.
 */
export async function compressImageToBase64(
  file: File,
  maxDimension: number,
  quality: number,
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
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, width, height)
      try {
        // WebP destekli tarayıcılarda WebP, değilse JPEG
        const webp = canvas.toDataURL('image/webp', quality)
        if (webp.startsWith('data:image/webp')) {
          resolve(webp)
        } else {
          resolve(canvas.toDataURL('image/jpeg', quality))
        }
      } catch {
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Resim okunamadı'))
    }
    img.src = objectUrl
  })
}
