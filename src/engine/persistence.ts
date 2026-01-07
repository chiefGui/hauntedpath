import { getDB } from './database'
import type { GameState } from './services'

export type SavedGame = {
  id: string
  campaignId: string
  state: GameState
  createdAt: number
  updatedAt: number
}

const STORE_NAME = 'saved-games'

export async function saveGame(
  campaignId: string,
  state: GameState,
): Promise<SavedGame> {
  const db = await getDB()
  const now = Date.now()

  const existing = await db.getFromIndex(STORE_NAME, 'by-campaign', campaignId)

  const savedGame: SavedGame = existing
    ? { ...(existing as SavedGame), state, updatedAt: now }
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
  return (savedGame as SavedGame) ?? null
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
  return db.getAll(STORE_NAME) as Promise<SavedGame[]>
}
