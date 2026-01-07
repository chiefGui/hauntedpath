import { type IDBPDatabase, openDB } from 'idb'

const DB_NAME = 'hauntedpath'
const DB_VERSION = 2

type DBSchema = {
  'saved-games': {
    key: string
    value: {
      id: string
      campaignId: string
      state: unknown
      createdAt: number
      updatedAt: number
    }
    indexes: { 'by-campaign': string }
  }
  settings: {
    key: string
    value: { id: string; accentColor: string }
  }
}

export type HauntedPathDB = IDBPDatabase<DBSchema>

let dbPromise: Promise<HauntedPathDB> | null = null

function createDB(): Promise<HauntedPathDB> {
  return openDB<DBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        const store = db.createObjectStore('saved-games', { keyPath: 'id' })
        store.createIndex('by-campaign', 'campaignId')
      }
      if (oldVersion < 2) {
        db.createObjectStore('settings', { keyPath: 'id' })
      }
    },
  })
}

export async function getDB(): Promise<HauntedPathDB> {
  if (!dbPromise) {
    dbPromise = createDB().catch(async (error) => {
      // If version error, delete and recreate
      if (
        error.name === 'VersionError' ||
        error.message?.includes('version')
      ) {
        console.warn('Database version mismatch, clearing and rebuilding...')
        await deleteDatabase()
        dbPromise = null
        return getDB()
      }
      throw error
    })
  }
  return dbPromise
}

export async function deleteDatabase(): Promise<void> {
  dbPromise = null
  const deleteRequest = indexedDB.deleteDatabase(DB_NAME)

  return new Promise((resolve, reject) => {
    deleteRequest.onsuccess = () => resolve()
    deleteRequest.onerror = () => reject(deleteRequest.error)
    deleteRequest.onblocked = () => {
      console.warn('Database deletion blocked, forcing...')
      resolve()
    }
  })
}

export async function clearAllData(): Promise<void> {
  try {
    const db = await getDB()
    const tx = db.transaction(['saved-games', 'settings'], 'readwrite')
    await Promise.all([
      tx.objectStore('saved-games').clear(),
      tx.objectStore('settings').clear(),
      tx.done,
    ])
  } catch {
    // If clearing fails, delete entire database
    await deleteDatabase()
  }
}
