import { type IDBPDatabase, openDB } from 'idb'

export type AccentColor =
  | 'violet'
  | 'rose'
  | 'amber'
  | 'emerald'
  | 'sky'
  | 'slate'

export type AccentColorConfig = {
  id: AccentColor
  name: string
  primary: string
  primaryForeground: string
  ring: string
  bubblePlayer: string
  accentHover: string
}

export const accentColors: AccentColorConfig[] = [
  {
    id: 'violet',
    name: 'Violet',
    primary: 'oklch(62% 0.24 290)',
    primaryForeground: 'oklch(100% 0 0)',
    ring: 'oklch(62% 0.24 290)',
    bubblePlayer: 'oklch(62% 0.24 290)',
    accentHover: 'oklch(58% 0.22 290)',
  },
  {
    id: 'rose',
    name: 'Rose',
    primary: 'oklch(65% 0.22 12)',
    primaryForeground: 'oklch(100% 0 0)',
    ring: 'oklch(65% 0.22 12)',
    bubblePlayer: 'oklch(65% 0.22 12)',
    accentHover: 'oklch(60% 0.20 12)',
  },
  {
    id: 'amber',
    name: 'Amber',
    primary: 'oklch(75% 0.18 70)',
    primaryForeground: 'oklch(20% 0.02 70)',
    ring: 'oklch(75% 0.18 70)',
    bubblePlayer: 'oklch(75% 0.18 70)',
    accentHover: 'oklch(70% 0.16 70)',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    primary: 'oklch(70% 0.18 160)',
    primaryForeground: 'oklch(100% 0 0)',
    ring: 'oklch(70% 0.18 160)',
    bubblePlayer: 'oklch(70% 0.18 160)',
    accentHover: 'oklch(65% 0.16 160)',
  },
  {
    id: 'sky',
    name: 'Sky',
    primary: 'oklch(62% 0.22 250)',
    primaryForeground: 'oklch(100% 0 0)',
    ring: 'oklch(62% 0.22 250)',
    bubblePlayer: 'oklch(62% 0.22 250)',
    accentHover: 'oklch(58% 0.20 250)',
  },
  {
    id: 'slate',
    name: 'Slate',
    primary: 'oklch(55% 0.03 265)',
    primaryForeground: 'oklch(100% 0 0)',
    ring: 'oklch(55% 0.03 265)',
    bubblePlayer: 'oklch(55% 0.03 265)',
    accentHover: 'oklch(50% 0.03 265)',
  },
]

export const defaultAccentColor: AccentColor = 'violet'

export type AppSettings = {
  id: 'app-settings'
  accentColor: AccentColor
}

const DB_NAME = 'hauntedpath'
const DB_VERSION = 2
const SETTINGS_STORE = 'settings'

type SettingsDB = IDBPDatabase<{
  settings: {
    key: string
    value: AppSettings
  }
  'saved-games': {
    key: string
    value: unknown
    indexes: { 'by-campaign': string }
  }
}>

let dbPromise: Promise<SettingsDB> | null = null

function getDB(): Promise<SettingsDB> {
  if (!dbPromise) {
    dbPromise = openDB<{
      settings: {
        key: string
        value: AppSettings
      }
      'saved-games': {
        key: string
        value: unknown
        indexes: { 'by-campaign': string }
      }
    }>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        // Migrate from v1 to v2
        if (oldVersion < 1) {
          const store = db.createObjectStore('saved-games', { keyPath: 'id' })
          store.createIndex('by-campaign', 'campaignId')
        }
        if (oldVersion < 2) {
          db.createObjectStore(SETTINGS_STORE, { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function getSettings(): Promise<AppSettings> {
  const db = await getDB()
  const settings = await db.get(SETTINGS_STORE, 'app-settings')
  return settings ?? { id: 'app-settings', accentColor: defaultAccentColor }
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const db = await getDB()
  const current = await getSettings()
  const updated: AppSettings = { ...current, ...settings, id: 'app-settings' }
  await db.put(SETTINGS_STORE, updated)
  return updated
}

export function applyAccentColor(colorId: AccentColor): void {
  const config = accentColors.find((c) => c.id === colorId)
  if (!config) return

  const root = document.documentElement
  root.style.setProperty('--color-primary', config.primary)
  root.style.setProperty('--color-primary-foreground', config.primaryForeground)
  root.style.setProperty('--color-ring', config.ring)
  root.style.setProperty('--color-bubble-player', config.bubblePlayer)
  root.style.setProperty('--color-accent-hover', config.accentHover)
}
