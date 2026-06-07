import { Season } from '../types'

const STORAGE_KEY = 'bk_wardrobe_season_filter'

/**
 * Kullanıcının seçtiği sezon filtresi — Dolabım/Kategori sayfalarında ortak.
 * Boş set = "tümünü göster" (filtre yok).
 * Cihaz başına localStorage'da kalıcı, login/logout'ta kaybolmaz.
 */
export function getStoredSeasonFilter(): Set<Season> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(arr.filter((s) => ['summer', 'winter', 'transitional', 'all'].includes(s)) as Season[])
  } catch {
    return new Set()
  }
}

export function setStoredSeasonFilter(set: Set<Season>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)))
  } catch {}
}

/**
 * Bir parça mevcut sezon filtresine uyuyor mu?
 * Filtre boşsa hepsi uyar.
 */
export function matchesSeasonFilter(
  itemSeason: Season | undefined,
  filter: Set<Season>,
): boolean {
  if (filter.size === 0) return true
  // 'all' (tüm sezon) etiketli parçalar herhangi bir filtreye uyar
  if (itemSeason === 'all' || !itemSeason) return filter.has('all')
  return filter.has(itemSeason)
}

/**
 * Bugünün ayına göre o anki gerçek dünyadaki sezon.
 * Aralık-Şubat = winter, Mart-Mayıs/Eylül-Kasım = transitional, Haziran-Ağustos = summer.
 */
export function getCurrentRealSeason(): Season {
  const month = new Date().getMonth() // 0-11
  if (month >= 5 && month <= 7) return 'summer' // Haz-Tem-Ağu
  if (month === 11 || month <= 1) return 'winter' // Ara-Oca-Şub
  return 'transitional' // Mar-Nis-May, Eyl-Eki-Kas
}

/**
 * Bir parça şu an mevsimi dışı mı?
 * Yazlık parça kışın "out of season", kışlık parça yazın.
 * Mevsimlik, tüm-sezon ve etiketsiz parçalar hiçbir zaman mevsim dışı sayılmaz.
 */
export function isOutOfSeason(itemSeason: Season | undefined, current: Season): boolean {
  if (!itemSeason || itemSeason === 'all' || itemSeason === 'transitional') return false
  if (current === 'summer' && itemSeason === 'winter') return true
  if (current === 'winter' && itemSeason === 'summer') return true
  return false
}
