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

// A conversation is a chat thread with one or more characters
export type Conversation = {
  id: string
  characterIds: string[] // characters in this conversation (excluding player)
  name?: string // optional override for display name
  isGroup?: boolean // true if this is a group chat
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
  // Multi-chat support
  conversations?: Conversation[] // if undefined, single-chat mode (backward compatible)
  startConversationId?: string // which conversation to open first
}

export class CampaignService {
  static getCharacter(campaign: Campaign, senderId: string): Character | null {
    if (senderId === 'player') return campaign.protagonist
    if (senderId === 'system') return null
    return campaign.characters.find((c) => c.id === senderId) ?? null
  }

  static getConversation(
    campaign: Campaign,
    conversationId: string,
  ): Conversation | null {
    return campaign.conversations?.find((c) => c.id === conversationId) ?? null
  }

  static getConversationCharacters(
    campaign: Campaign,
    conversationId: string,
  ): Character[] {
    const conversation = this.getConversation(campaign, conversationId)
    if (!conversation) return []
    return conversation.characterIds
      .map((id) => campaign.characters.find((c) => c.id === id))
      .filter((c): c is Character => c !== null)
  }

  static getConversationDisplayName(
    campaign: Campaign,
    conversationId: string,
  ): string {
    const conversation = this.getConversation(campaign, conversationId)
    if (!conversation) return 'Unknown'
    if (conversation.name) return conversation.name
    const characters = this.getConversationCharacters(campaign, conversationId)
    return characters.map((c) => c.name).join(', ') || 'Unknown'
  }

  // Check if campaign uses multi-chat mode
  static isMultiChat(campaign: Campaign): boolean {
    return (
      campaign.conversations !== undefined && campaign.conversations.length > 0
    )
  }

  // Get default conversation for backward compatibility
  static getDefaultConversationId(campaign: Campaign): string {
    if (campaign.startConversationId) return campaign.startConversationId
    if (campaign.conversations?.[0]) return campaign.conversations[0].id
    // Fallback for single-chat campaigns: use first character as conversation id
    return campaign.characters[0]?.id ?? 'default'
  }
}
