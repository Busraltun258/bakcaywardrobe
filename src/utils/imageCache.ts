/**
 * IndexedDB tabanlı görsel cache.
 * Firestore'dan gelen base64 görselleri kalıcı olarak saklar.
 * Aynı görsel tekrar tekrar download/parse edilmez.
 *
 * Ayrıca in-memory bir Map ile aynı sayfa içinde tekrarlayan lookup'ları
 * sync (await'siz) yanıtlayabilmek için RAM cache tutuyoruz.
 */

const DB_NAME = 'bk-img-cache'
const STORE = 'images'
const DB_VERSION = 1

type DB = IDBDatabase

let dbPromise: Promise<DB> | null = null
const memCache = new Map<string, string>()

function openDB(): Promise<DB> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

/** Bellek cache'ten anında dön — render flash'ı önler. */
export function getCachedImageSync(id: string): string | null {
  return memCache.get(id) ?? null
}

export async function getCachedImage(id: string): Promise<string | null> {
  const mem = memCache.get(id)
  if (mem) return mem
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(id)
      req.onsuccess = () => {
        const val = (req.result as string) ?? null
        if (val) memCache.set(id, val)
        resolve(val)
      }
      req.onerror = () => resolve(null)
    })
  } catch {
    return null
  }
}

export async function setCachedImage(id: string, dataUrl: string): Promise<void> {
  memCache.set(id, dataUrl)
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(dataUrl, id)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
  } catch {
    /* ignore */
  }
}

export async function removeCachedImage(id: string): Promise<void> {
  memCache.delete(id)
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).delete(id)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
  } catch {
    /* ignore */
  }
}

export async function clearImageCache(): Promise<void> {
  memCache.clear()
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).clear()
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
  } catch {
    /* ignore */
  }
}

/**
 * Belirli sayıda görseli arka planda IndexedDB'den belleğe alır.
 * Liste sayfaları açıldıktan sonra görünürlüğe girmeden önce hazır olur.
 */
export async function warmImageCache(ids: string[]): Promise<void> {
  const need = ids.filter((id) => !memCache.has(id))
  if (!need.length) return
  try {
    const db = await openDB()
    await Promise.all(
      need.map(
        (id) =>
          new Promise<void>((resolve) => {
            const tx = db.transaction(STORE, 'readonly')
            const req = tx.objectStore(STORE).get(id)
            req.onsuccess = () => {
              const val = req.result as string | undefined
              if (val) memCache.set(id, val)
              resolve()
            }
            req.onerror = () => resolve()
          }),
      ),
    )
  } catch {
    /* ignore */
  }
}
