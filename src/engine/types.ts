export type MessageType = 'text' | 'image' | 'system'

export interface Message {
  id: string
  sender: string // character id, 'player', or 'system'
  type: MessageType
  content: string // text content or image URL
  delay?: number // ms before this message appears (for pacing)
}

export interface Choice {
  id: string
  text: string
  nextBeatId: string
}

export interface Beat {
  id: string
  messages: Message[]
  choices: Choice[]
  isEnding?: boolean
}

export interface Character {
  id: string
  name: string
  avatar: string // URL or data URI
}

export interface Campaign {
  id: string
  title: string
  description: string
  coverImage: string
  protagonist: Character
  characters: Character[]
  beats: Record<string, Beat>
  startBeatId: string
  isGroup?: boolean
}

// Runtime game state
export interface GameState {
  campaignId: string
  currentBeatId: string
  displayedMessages: DisplayedMessage[]
  isTyping: boolean
  visitedBeatIds: string[]
  startedAt: number
  lastPlayedAt: number
}

export interface DisplayedMessage {
  id: string
  messageId: string
  sender: string
  type: MessageType
  content: string
  timestamp: number
  status: 'sending' | 'sent' | 'delivered' | 'read'
}

export interface SavedGame {
  id: string
  campaignId: string
  state: GameState
  createdAt: number
  updatedAt: number
}
