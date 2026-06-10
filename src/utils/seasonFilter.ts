import { Season } from '../types'

/**
 * Bir parçanın geçerli sezon dizisini döndürür.
 * Yeni format: item.seasons (array)
 * Eski format: item.season (tek string) → array'e çevrilir
 * 'all'/'transitional' → boş array (etiketsiz = evrensel)
 */
export function getItemSeasons(item: {
  seasons?: Season[]
  season?: Season
}): Season[] {
  if (Array.isArray(item.seasons) && item.seasons.length > 0) {
    return item.seasons.filter(
      (s) => s === 'spring' || s === 'summer' || s === 'autumn' || s === 'winter',
    )
  }
  if (item.season && item.season !== 'all' && item.season !== 'transitional') {
    return [item.season]
  }
  return []
}

const STORAGE_KEY = 'bk_wardrobe_season_filter'

const VALID_SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter', 'all']

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
    return new Set(arr.filter((s) => VALID_SEASONS.includes(s as Season)) as Season[])
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
 *  - Filtre boşsa: hepsi uyar
 *  - Etiketsiz parça: her zaman görünür (evrensel)
 *  - Aksi: parçanın sezonlarından herhangi biri filtre setinde varsa uyar
 */
export function matchesSeasonFilter(
  itemSeasons: Season[] | undefined,
  filter: Set<Season>,
): boolean {
  if (filter.size === 0) return true
  if (!itemSeasons || itemSeasons.length === 0) return true
  return itemSeasons.some((s) => filter.has(s))
}

/**
 * Türkiye'de iklim geçişleri yumuşaktır; çoğu ay 1-3 sezona girer.
 * Kullanıcının verdiği geçiş tablosu:
 *   Ocak: Kış · Şubat: Kış · Mart: Kış+Sonbahar
 *   Nisan: İlkbahar+Sonbahar · Mayıs: İlkbahar+Yaz
 *   Haziran: Yaz · Temmuz: Yaz · Ağustos: Yaz
 *   Eylül: Sonbahar+Yaz · Ekim: Sonbahar+İlkbahar
 *   Kasım: Sonbahar+Kış · Aralık: Kış+Sonbahar
 */
const MONTH_SEASONS: Record<number, Season[]> = {
  0: ['winter'], // Ocak
  1: ['winter'], // Şubat
  2: ['winter', 'autumn'], // Mart
  3: ['spring', 'autumn'], // Nisan
  4: ['spring', 'summer'], // Mayıs
  5: ['summer'], // Haziran
  6: ['summer'], // Temmuz
  7: ['summer'], // Ağustos
  8: ['autumn', 'summer'], // Eylül
  9: ['autumn', 'spring'], // Ekim
  10: ['autumn', 'winter'], // Kasım
  11: ['winter', 'autumn'], // Aralık
}

/** Bugün hangi sezon(lar) aktif — ayın overlap zonu döner. */
export function getCurrentSeasons(): Season[] {
  return MONTH_SEASONS[new Date().getMonth()] ?? []
}

/** İlkincil ekran etiketi için tek sezon — ayın ilk eşleşmesi. */
export function getPrimarySeason(): Season {
  return getCurrentSeasons()[0] ?? 'all'
}

/**
 * Bir parça şu an mevsimi dışı mı?
 * Etiketsiz parça → her zaman geçerli.
 * Diğerleri: parçanın sezonlarından en az biri şu anki ayın overlap setinde olmalı.
 */
export function isOutOfSeason(
  itemSeasons: Season[] | undefined,
  currentSeasons: Season[],
): boolean {
  if (!itemSeasons || itemSeasons.length === 0) return false
  return !itemSeasons.some((s) => currentSeasons.includes(s))
}
