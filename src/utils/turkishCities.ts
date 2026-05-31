/**
 * Türkiye 81 il + her il için yaygın ilçeler.
 * Hava durumu için il/ilçe seçiminde kullanılır.
 * Veri Open-Meteo geocoding ile coğrafi koordinata çevrilir.
 */
/** Liste başına alınacak öne çıkan iller — varsayılan İstanbul. */
export const PRIMARY_CITIES = ['İstanbul', 'Mardin'] as const

export const DEFAULT_LOCATION: CityDistrict = { city: 'İstanbul' }

export const TR_CITIES: { name: string; districts: string[] }[] = [
  { name: 'Adana', districts: ['Seyhan', 'Çukurova', 'Yüreğir', 'Sarıçam', 'Ceyhan'] },
  { name: 'Adıyaman', districts: ['Merkez', 'Kâhta', 'Besni'] },
  { name: 'Afyonkarahisar', districts: ['Merkez', 'Bolvadin', 'Dinar'] },
  { name: 'Ağrı', districts: ['Merkez', 'Doğubayazıt', 'Patnos'] },
  { name: 'Aksaray', districts: ['Merkez', 'Ortaköy', 'Eskil'] },
  { name: 'Amasya', districts: ['Merkez', 'Merzifon', 'Suluova'] },
  {
    name: 'Ankara',
    districts: [
      'Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan',
      'Altındağ', 'Gölbaşı', 'Pursaklar', 'Polatlı',
    ],
  },
  {
    name: 'Antalya',
    districts: ['Muratpaşa', 'Kepez', 'Konyaaltı', 'Alanya', 'Manavgat', 'Serik', 'Aksu'],
  },
  { name: 'Ardahan', districts: ['Merkez'] },
  { name: 'Artvin', districts: ['Merkez', 'Hopa'] },
  { name: 'Aydın', districts: ['Efeler', 'Kuşadası', 'Didim', 'Nazilli', 'Söke'] },
  { name: 'Balıkesir', districts: ['Karesi', 'Altıeylül', 'Edremit', 'Bandırma', 'Ayvalık'] },
  { name: 'Bartın', districts: ['Merkez', 'Amasra'] },
  { name: 'Batman', districts: ['Merkez', 'Kozluk'] },
  { name: 'Bayburt', districts: ['Merkez'] },
  { name: 'Bilecik', districts: ['Merkez', 'Bozüyük'] },
  { name: 'Bingöl', districts: ['Merkez'] },
  { name: 'Bitlis', districts: ['Merkez', 'Tatvan'] },
  { name: 'Bolu', districts: ['Merkez', 'Gerede'] },
  { name: 'Burdur', districts: ['Merkez', 'Bucak'] },
  {
    name: 'Bursa',
    districts: ['Osmangazi', 'Nilüfer', 'Yıldırım', 'Gemlik', 'İnegöl', 'Mudanya'],
  },
  { name: 'Çanakkale', districts: ['Merkez', 'Biga', 'Çan'] },
  { name: 'Çankırı', districts: ['Merkez'] },
  { name: 'Çorum', districts: ['Merkez', 'Osmancık'] },
  { name: 'Denizli', districts: ['Pamukkale', 'Merkezefendi', 'Çivril'] },
  { name: 'Diyarbakır', districts: ['Bağlar', 'Kayapınar', 'Yenişehir', 'Sur', 'Bismil'] },
  { name: 'Düzce', districts: ['Merkez', 'Akçakoca'] },
  { name: 'Edirne', districts: ['Merkez', 'Keşan', 'Uzunköprü'] },
  { name: 'Elazığ', districts: ['Merkez', 'Kovancılar'] },
  { name: 'Erzincan', districts: ['Merkez'] },
  { name: 'Erzurum', districts: ['Yakutiye', 'Palandöken', 'Aziziye', 'Horasan'] },
  { name: 'Eskişehir', districts: ['Tepebaşı', 'Odunpazarı', 'Sivrihisar'] },
  { name: 'Gaziantep', districts: ['Şahinbey', 'Şehitkamil', 'Nizip', 'İslahiye'] },
  { name: 'Giresun', districts: ['Merkez', 'Bulancak', 'Espiye'] },
  { name: 'Gümüşhane', districts: ['Merkez'] },
  { name: 'Hakkari', districts: ['Merkez', 'Yüksekova'] },
  { name: 'Hatay', districts: ['Antakya', 'İskenderun', 'Defne', 'Samandağ', 'Dörtyol'] },
  { name: 'Iğdır', districts: ['Merkez'] },
  { name: 'Isparta', districts: ['Merkez', 'Eğirdir'] },
  {
    name: 'İstanbul',
    districts: [
      'Kadıköy', 'Üsküdar', 'Beşiktaş', 'Şişli', 'Beyoğlu', 'Fatih', 'Bakırköy',
      'Maltepe', 'Ataşehir', 'Pendik', 'Kartal', 'Tuzla', 'Sancaktepe', 'Çekmeköy',
      'Ümraniye', 'Sarıyer', 'Beykoz', 'Bahçelievler', 'Esenyurt', 'Avcılar',
      'Küçükçekmece', 'Büyükçekmece', 'Beylikdüzü', 'Başakşehir', 'Bağcılar',
      'Bayrampaşa', 'Eyüpsultan', 'Gaziosmanpaşa', 'Sultangazi', 'Esenler',
      'Zeytinburnu', 'Güngören', 'Kağıthane', 'Arnavutköy', 'Çatalca', 'Silivri',
      'Şile', 'Adalar', 'Sultanbeyli',
    ],
  },
  {
    name: 'İzmir',
    districts: [
      'Konak', 'Bornova', 'Karşıyaka', 'Buca', 'Bayraklı', 'Çiğli', 'Karabağlar',
      'Gaziemir', 'Balçova', 'Narlıdere', 'Foça', 'Urla', 'Çeşme', 'Aliağa',
      'Menemen', 'Torbalı',
    ],
  },
  { name: 'Kahramanmaraş', districts: ['Onikişubat', 'Dulkadiroğlu', 'Elbistan'] },
  { name: 'Karabük', districts: ['Merkez', 'Safranbolu'] },
  { name: 'Karaman', districts: ['Merkez'] },
  { name: 'Kars', districts: ['Merkez'] },
  { name: 'Kastamonu', districts: ['Merkez', 'Tosya'] },
  { name: 'Kayseri', districts: ['Melikgazi', 'Kocasinan', 'Talas', 'Develi'] },
  { name: 'Kilis', districts: ['Merkez'] },
  { name: 'Kırıkkale', districts: ['Merkez'] },
  { name: 'Kırklareli', districts: ['Merkez', 'Lüleburgaz'] },
  { name: 'Kırşehir', districts: ['Merkez'] },
  { name: 'Kocaeli', districts: ['İzmit', 'Gebze', 'Darıca', 'Çayırova', 'Körfez'] },
  { name: 'Konya', districts: ['Selçuklu', 'Meram', 'Karatay', 'Ereğli', 'Akşehir'] },
  { name: 'Kütahya', districts: ['Merkez', 'Tavşanlı'] },
  { name: 'Malatya', districts: ['Battalgazi', 'Yeşilyurt'] },
  { name: 'Manisa', districts: ['Şehzadeler', 'Yunusemre', 'Akhisar', 'Salihli', 'Turgutlu'] },
  { name: 'Mardin', districts: ['Artuklu', 'Kızıltepe', 'Midyat'] },
  { name: 'Mersin', districts: ['Yenişehir', 'Mezitli', 'Toroslar', 'Akdeniz', 'Tarsus', 'Erdemli'] },
  { name: 'Muğla', districts: ['Menteşe', 'Bodrum', 'Fethiye', 'Marmaris', 'Milas', 'Datça'] },
  { name: 'Muş', districts: ['Merkez'] },
  { name: 'Nevşehir', districts: ['Merkez', 'Ürgüp'] },
  { name: 'Niğde', districts: ['Merkez', 'Bor'] },
  { name: 'Ordu', districts: ['Altınordu', 'Fatsa', 'Ünye'] },
  { name: 'Osmaniye', districts: ['Merkez', 'Kadirli'] },
  { name: 'Rize', districts: ['Merkez', 'Çayeli', 'Pazar'] },
  { name: 'Sakarya', districts: ['Adapazarı', 'Serdivan', 'Erenler', 'Akyazı', 'Hendek'] },
  { name: 'Samsun', districts: ['İlkadım', 'Atakum', 'Canik', 'Bafra'] },
  { name: 'Şanlıurfa', districts: ['Haliliye', 'Eyyübiye', 'Karaköprü', 'Siverek', 'Viranşehir'] },
  { name: 'Siirt', districts: ['Merkez'] },
  { name: 'Sinop', districts: ['Merkez', 'Boyabat'] },
  { name: 'Sivas', districts: ['Merkez'] },
  { name: 'Şırnak', districts: ['Merkez', 'Cizre'] },
  { name: 'Tekirdağ', districts: ['Süleymanpaşa', 'Çorlu', 'Çerkezköy', 'Kapaklı'] },
  { name: 'Tokat', districts: ['Merkez', 'Turhal', 'Erbaa'] },
  { name: 'Trabzon', districts: ['Ortahisar', 'Akçaabat', 'Yomra', 'Of'] },
  { name: 'Tunceli', districts: ['Merkez'] },
  { name: 'Uşak', districts: ['Merkez'] },
  { name: 'Van', districts: ['İpekyolu', 'Tuşba', 'Edremit', 'Erciş'] },
  { name: 'Yalova', districts: ['Merkez', 'Çiftlikköy'] },
  { name: 'Yozgat', districts: ['Merkez', 'Sorgun'] },
  { name: 'Zonguldak', districts: ['Merkez', 'Ereğli', 'Çaycuma'] },
]

export interface CityDistrict {
  city: string
  district?: string
}

/** İstanbul ve Mardin başta, diğerleri alfabetik. */
export function getOrderedCities() {
  const primary = TR_CITIES.filter((c) => PRIMARY_CITIES.includes(c.name as any))
  const rest = TR_CITIES.filter((c) => !PRIMARY_CITIES.includes(c.name as any))
  return [...primary, ...rest]
}

const STORAGE_KEY = 'bk_user_location'

export function getStoredLocation(): CityDistrict | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CityDistrict
  } catch {
    return null
  }
}

export function setStoredLocation(loc: CityDistrict) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc))
  } catch {}
}

/** İl merkezleri için sabit koordinatlar (geocoding başarısız olursa fallback). */
export const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  Adana: { lat: 37.0, lon: 35.3214 },
  Adıyaman: { lat: 37.7648, lon: 38.2786 },
  Afyonkarahisar: { lat: 38.7507, lon: 30.5567 },
  Ağrı: { lat: 39.7191, lon: 43.0503 },
  Aksaray: { lat: 38.3687, lon: 34.037 },
  Amasya: { lat: 40.6499, lon: 35.8353 },
  Ankara: { lat: 39.9334, lon: 32.8597 },
  Antalya: { lat: 36.8969, lon: 30.7133 },
  Ardahan: { lat: 41.1105, lon: 42.7022 },
  Artvin: { lat: 41.1828, lon: 41.8183 },
  Aydın: { lat: 37.8444, lon: 27.8458 },
  Balıkesir: { lat: 39.6484, lon: 27.8826 },
  Bartın: { lat: 41.6344, lon: 32.3375 },
  Batman: { lat: 37.8812, lon: 41.1351 },
  Bayburt: { lat: 40.2552, lon: 40.2249 },
  Bilecik: { lat: 40.0567, lon: 30.0665 },
  Bingöl: { lat: 38.8853, lon: 40.4983 },
  Bitlis: { lat: 38.4006, lon: 42.108 },
  Bolu: { lat: 40.7392, lon: 31.6089 },
  Burdur: { lat: 37.7203, lon: 30.2906 },
  Bursa: { lat: 40.1828, lon: 29.067 },
  Çanakkale: { lat: 40.1553, lon: 26.4142 },
  Çankırı: { lat: 40.6013, lon: 33.6134 },
  Çorum: { lat: 40.5506, lon: 34.9556 },
  Denizli: { lat: 37.7765, lon: 29.0864 },
  Diyarbakır: { lat: 37.9144, lon: 40.2306 },
  Düzce: { lat: 40.8438, lon: 31.1565 },
  Edirne: { lat: 41.6818, lon: 26.5623 },
  Elazığ: { lat: 38.681, lon: 39.2264 },
  Erzincan: { lat: 39.7464, lon: 39.4914 },
  Erzurum: { lat: 39.9, lon: 41.27 },
  Eskişehir: { lat: 39.7767, lon: 30.5206 },
  Gaziantep: { lat: 37.0662, lon: 37.3833 },
  Giresun: { lat: 40.9128, lon: 38.3895 },
  Gümüşhane: { lat: 40.4607, lon: 39.4814 },
  Hakkari: { lat: 37.5744, lon: 43.7408 },
  Hatay: { lat: 36.4018, lon: 36.3498 },
  Iğdır: { lat: 39.9237, lon: 44.045 },
  Isparta: { lat: 37.7648, lon: 30.5566 },
  İstanbul: { lat: 41.0082, lon: 28.9784 },
  İzmir: { lat: 38.4192, lon: 27.1287 },
  Kahramanmaraş: { lat: 37.5858, lon: 36.937 },
  Karabük: { lat: 41.2061, lon: 32.6204 },
  Karaman: { lat: 37.1759, lon: 33.2287 },
  Kars: { lat: 40.6013, lon: 43.0975 },
  Kastamonu: { lat: 41.3887, lon: 33.7827 },
  Kayseri: { lat: 38.7312, lon: 35.4787 },
  Kilis: { lat: 36.7184, lon: 37.1212 },
  Kırıkkale: { lat: 39.8468, lon: 33.5153 },
  Kırklareli: { lat: 41.7333, lon: 27.2167 },
  Kırşehir: { lat: 39.1425, lon: 34.1709 },
  Kocaeli: { lat: 40.8533, lon: 29.8815 },
  Konya: { lat: 37.8714, lon: 32.4847 },
  Kütahya: { lat: 39.4242, lon: 29.9833 },
  Malatya: { lat: 38.3552, lon: 38.3095 },
  Manisa: { lat: 38.6191, lon: 27.4289 },
  Mardin: { lat: 37.3122, lon: 40.7345 },
  Mersin: { lat: 36.8121, lon: 34.6415 },
  Muğla: { lat: 37.2154, lon: 28.3636 },
  Muş: { lat: 38.7432, lon: 41.5065 },
  Nevşehir: { lat: 38.6244, lon: 34.7236 },
  Niğde: { lat: 37.9669, lon: 34.6796 },
  Ordu: { lat: 40.9839, lon: 37.8764 },
  Osmaniye: { lat: 37.0742, lon: 36.2467 },
  Rize: { lat: 41.0201, lon: 40.5234 },
  Sakarya: { lat: 40.756, lon: 30.3781 },
  Samsun: { lat: 41.2867, lon: 36.33 },
  Şanlıurfa: { lat: 37.1671, lon: 38.7939 },
  Siirt: { lat: 37.9333, lon: 41.95 },
  Sinop: { lat: 42.0231, lon: 35.1531 },
  Sivas: { lat: 39.7477, lon: 37.0179 },
  Şırnak: { lat: 37.5164, lon: 42.4611 },
  Tekirdağ: { lat: 40.9833, lon: 27.5167 },
  Tokat: { lat: 40.3167, lon: 36.55 },
  Trabzon: { lat: 41.0027, lon: 39.7168 },
  Tunceli: { lat: 39.1079, lon: 39.5401 },
  Uşak: { lat: 38.6823, lon: 29.4082 },
  Van: { lat: 38.4942, lon: 43.38 },
  Yalova: { lat: 40.6549, lon: 29.2842 },
  Yozgat: { lat: 39.8181, lon: 34.8147 },
  Zonguldak: { lat: 41.4564, lon: 31.7987 },
}

/**
 * Open-Meteo geocoding ile il+ilçe → lat/lon. Başarısız olursa CITY_COORDS fallback.
 * Birkaç farklı sorgu varyantını dener — Türkçe karakter / boşluk problemlerini azaltır.
 */
export async function geocodeCity(
  city: string,
  district?: string,
): Promise<{ lat: number; lon: number } | null> {
  const attempts = district
    ? [`${district} ${city}`, district, city]
    : [city]
  for (const q of attempts) {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=tr&countryCode=TR`,
      )
      const data = await res.json()
      const tr = (data.results ?? []).find((r: any) => r.country_code === 'TR') ?? data.results?.[0]
      if (tr) return { lat: tr.latitude, lon: tr.longitude }
    } catch {
      // sıradakine geç
    }
  }
  // Fallback: il merkezinin sabit koordinatı
  return CITY_COORDS[city] ?? null
}
