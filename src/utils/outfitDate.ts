import dayjs from 'dayjs'
import { OutfitRequest, OutfitSuggestion } from '../types'

/** Türkiye saat dilimi — kombin "giyildi" geçişi bu saate göre hesaplanır. */
export const TR_TZ = 'Europe/Istanbul'

/**
 * Bir önerinin giyileceği/giyildiği günü (YYYY-MM-DD) döndürür.
 * - Haftalık öneri: hafta başlangıcı + dayIndex
 * - Tekil öneri: talebin requestDate'i
 * Tarih yoksa undefined.
 */
export function getWornDate(
  s: Pick<OutfitSuggestion, 'dayIndex'>,
  r: Pick<OutfitRequest, 'requestType' | 'weekStartDate' | 'requestDate'> | undefined,
): string | undefined {
  if (!r) return undefined
  if (r.requestType === 'weekly' && typeof s.dayIndex === 'number' && r.weekStartDate) {
    return dayjs(r.weekStartDate).add(s.dayIndex, 'day').format('YYYY-MM-DD')
  }
  if (r.requestDate) return r.requestDate
  return undefined
}

/**
 * Kombin giyildi mi?
 * Giyilme GÜNÜ, Türkiye saatiyle 06:00'ı geçildiyse "giyildi" sayılır.
 * Örn: 9 Haziran kombini → 9 Haziran TR saati 06:00'a kadar "planlandı/yaklaşan",
 * 9 Haziran 06:00 (TR) sonrası "giyildi/geçmiş".
 */
export function isWorn(date: string): boolean {
  const cutoff = dayjs
    .tz(date, TR_TZ)
    .hour(6)
    .minute(0)
    .second(0)
    .millisecond(0)
  return dayjs().isAfter(cutoff)
}
