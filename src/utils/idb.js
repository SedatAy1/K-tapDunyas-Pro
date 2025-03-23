import { openDB } from 'idb'

const DB_NAME = 'KitapDunyasiDB'
const STORE_NAME = 'books'

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

export async function saveBook(book) {
  const db = await getDB()
  await db.put(STORE_NAME, book)
}

export async function getAllBooks() {
  const db = await getDB()
  return await db.getAll(STORE_NAME)
}

export async function clearBooks() {
  const db = await getDB()
  await db.clear(STORE_NAME)
}