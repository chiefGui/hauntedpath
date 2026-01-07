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

export type ChoicePrompt = {
  id: string
  beatId: string
  choices: Choice[]
  selectedChoiceId: string | null
  timestamp: number
}

export type GameState = {
  campaignId: string
  currentBeatId: string
  displayedMessages: DisplayedMessage[]
  choicePrompts: ChoicePrompt[]
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
    choicePrompts: [],
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
  const now = Date.now()

  // Mark the current choice prompt as selected
  const updatedPrompts = state.choicePrompts.map((prompt) =>
    prompt.beatId === state.currentBeatId && prompt.selectedChoiceId === null
      ? { ...prompt, selectedChoiceId: choice.id }
      : prompt,
  )

  // For text choices, add a player message
  // For action choices, the selection is shown inline (no message added)
  const newMessages = isAction
    ? state.displayedMessages
    : [
        ...state.displayedMessages,
        {
          id: crypto.randomUUID(),
          messageId: `player-${choice.id}`,
          sender: 'player',
          type: MessageType.Text,
          content: choice.text,
          timestamp: now,
          status: 'sent' as const,
        },
      ]

  return {
    ...state,
    currentBeatId: choice.nextBeatId,
    displayedMessages: newMessages,
    choicePrompts: updatedPrompts,
    visitedBeatIds: [...state.visitedBeatIds, choice.nextBeatId],
    lastPlayedAt: now,
  }
}

export function addChoicePrompt(
  state: GameState,
  beatId: string,
  choices: Choice[],
): GameState {
  // Don't add if prompt already exists for this beat
  if (state.choicePrompts.some((p) => p.beatId === beatId)) {
    return state
  }

  const prompt: ChoicePrompt = {
    id: crypto.randomUUID(),
    beatId,
    choices,
    selectedChoiceId: null,
    timestamp: Date.now(),
  }

  return {
    ...state,
    choicePrompts: [...state.choicePrompts, prompt],
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
