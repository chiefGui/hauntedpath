export const MessageType = {
  Text: 'text',
  Image: 'image',
  System: 'system',
} as const

export type MessageType = (typeof MessageType)[keyof typeof MessageType]

export type Message = {
  id: string
  sender: string
  type: MessageType
  content: string
  delay?: number
}

export const ChoiceType = {
  Text: 'text',
  Action: 'action',
} as const

export type ChoiceType = (typeof ChoiceType)[keyof typeof ChoiceType]

export type Choice = {
  id: string
  text: string
  nextBeatId: string
  type?: ChoiceType
}

export type Beat = {
  id: string
  messages: Message[]
  choices: Choice[]
  isEnding?: boolean
}

export const ContactStatus = {
  Online: 'online',
  Offline: 'offline',
  Away: 'away',
} as const

export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus]

export type Character = {
  id: string
  name: string
  avatar: string
  status?: ContactStatus
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
}

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

export type DisplayedMessage = {
  id: string
  messageId: string
  sender: string
  type: MessageType
  content: string
  timestamp: number
  status: MessageStatus
}

export type GameState = {
  campaignId: string
  currentBeatId: string
  displayedMessages: DisplayedMessage[]
  isTyping: boolean
  visitedBeatIds: string[]
  startedAt: number
  lastPlayedAt: number
}

export function createInitialState(campaign: Campaign): GameState {
  const now = Date.now()
  return {
    campaignId: campaign.id,
    currentBeatId: campaign.startBeatId,
    displayedMessages: [],
    isTyping: false,
    visitedBeatIds: [campaign.startBeatId],
    startedAt: now,
    lastPlayedAt: now,
  }
}

export function getCurrentBeat(
  campaign: Campaign,
  state: GameState,
): Beat | null {
  return campaign.beats[state.currentBeatId] ?? null
}

export function getAvailableChoices(
  campaign: Campaign,
  state: GameState,
): Choice[] {
  const beat = getCurrentBeat(campaign, state)
  if (!beat) return []

  const beatMessages = beat.messages
  const displayedCount = state.displayedMessages.filter((dm) =>
    beatMessages.some((m) => m.id === dm.messageId),
  ).length

  if (displayedCount < beatMessages.length) return []
  if (state.isTyping) return []

  return beat.choices
}

export function selectChoice(
  _campaign: Campaign,
  state: GameState,
  choice: Choice,
): GameState {
  const isAction = choice.type === ChoiceType.Action

  const playerMessage: DisplayedMessage = {
    id: crypto.randomUUID(),
    messageId: `player-${choice.id}`,
    sender: isAction ? 'system' : 'player',
    type: isAction ? MessageType.System : MessageType.Text,
    content: choice.text,
    timestamp: Date.now(),
    status: 'sent',
  }

  return {
    ...state,
    currentBeatId: choice.nextBeatId,
    displayedMessages: [...state.displayedMessages, playerMessage],
    visitedBeatIds: [...state.visitedBeatIds, choice.nextBeatId],
    lastPlayedAt: Date.now(),
  }
}

export function addDisplayedMessage(
  state: GameState,
  message: Message,
): GameState {
  const displayedMessage: DisplayedMessage = {
    id: crypto.randomUUID(),
    messageId: message.id,
    sender: message.sender,
    type: message.type,
    content: message.content,
    timestamp: Date.now(),
    status: 'delivered',
  }

  return {
    ...state,
    displayedMessages: [...state.displayedMessages, displayedMessage],
    lastPlayedAt: Date.now(),
  }
}

export function setTyping(state: GameState, isTyping: boolean): GameState {
  return { ...state, isTyping }
}

export function getPendingMessages(
  campaign: Campaign,
  state: GameState,
): Message[] {
  const beat = getCurrentBeat(campaign, state)
  if (!beat) return []

  const displayedMessageIds = new Set(
    state.displayedMessages.map((dm) => dm.messageId),
  )

  return beat.messages.filter((m) => !displayedMessageIds.has(m.id))
}

export function isEnding(campaign: Campaign, state: GameState): boolean {
  const beat = getCurrentBeat(campaign, state)
  return beat?.isEnding ?? false
}

export function getCharacter(campaign: Campaign, senderId: string) {
  if (senderId === 'player') return campaign.protagonist
  if (senderId === 'system') return null
  return campaign.characters.find((c) => c.id === senderId) ?? null
}
