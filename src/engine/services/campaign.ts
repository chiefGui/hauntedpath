import type { Beat } from './beat'
import type { Character } from './character'

export type CampaignMeta = {
  genre: string[]
  duration: string
  rating?: string
  year?: number
  longDescription: string
}

export type Story = {
  start: string // e.g., "Jan 7, 2026, 2:45 AM"
}

export type Campaign = {
  id: string
  title: string
  description: string
  coverImage: string
  protagonist: Character
  characters: Character[]
  beats: Record<string, Beat>
  startBeatId: string
  isGroup?: boolean
  meta?: CampaignMeta
  story?: Story
}

export class CampaignService {
  static getCharacter(campaign: Campaign, senderId: string): Character | null {
    if (senderId === 'player') return campaign.protagonist
    if (senderId === 'system') return null
    return campaign.characters.find((c) => c.id === senderId) ?? null
  }
}
