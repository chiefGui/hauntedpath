import { type IDBPDatabase, openDB } from 'idb'
import type { GameState } from './services'

export type SavedGame = {
  id: string
  campaignId: string
  state: GameState
  createdAt: number
  updatedAt: number
}

const DB_NAME = 'hauntedpath'
const DB_VERSION = 2
const STORE_NAME = 'saved-games'

type HauntedPathDB = IDBPDatabase<{
  'saved-games': {
    key: string
    value: SavedGame
    indexes: { 'by-campaign': string }
  }
  settings: {
    key: string
    value: unknown
  }
}>

let dbPromise: Promise<HauntedPathDB> | null = null

function getDB(): Promise<HauntedPathDB> {
  if (!dbPromise) {
    dbPromise = openDB<{
      'saved-games': {
        key: string
        value: SavedGame
        indexes: { 'by-campaign': string }
      }
      settings: {
        key: string
        value: unknown
      }
    }>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
          store.createIndex('by-campaign', 'campaignId')
        }
        if (oldVersion < 2) {
          db.createObjectStore('settings', { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function saveGame(
  campaignId: string,
  state: GameState,
): Promise<SavedGame> {
  const db = await getDB()
  const now = Date.now()

  const existing = await db.getFromIndex(STORE_NAME, 'by-campaign', campaignId)

  const savedGame: SavedGame = existing
    ? { ...existing, state, updatedAt: now }
    : {
        id: crypto.randomUUID(),
        campaignId,
        state,
        createdAt: now,
        updatedAt: now,
      }

  await db.put(STORE_NAME, savedGame)
  return savedGame
}

export async function loadGame(campaignId: string): Promise<SavedGame | null> {
  const db = await getDB()
  const savedGame = await db.getFromIndex(STORE_NAME, 'by-campaign', campaignId)
  return savedGame ?? null
}

export async function deleteGame(campaignId: string): Promise<void> {
  const db = await getDB()
  const savedGame = await db.getFromIndex(STORE_NAME, 'by-campaign', campaignId)
  if (savedGame) {
    await db.delete(STORE_NAME, savedGame.id)
  }
}

export async function getAllSavedGames(): Promise<SavedGame[]> {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}

export async function clearAllData(): Promise<void> {
  const db = await getDB()
  await db.clear(STORE_NAME)
}
