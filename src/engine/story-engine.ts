import type {
  Campaign,
  Beat,
  Choice,
  GameState,
  DisplayedMessage,
  Message,
} from './types'

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
  state: GameState
): Beat | null {
  return campaign.beats[state.currentBeatId] ?? null
}

export function getAvailableChoices(
  campaign: Campaign,
  state: GameState
): Choice[] {
  const beat = getCurrentBeat(campaign, state)
  if (!beat) return []

  // Only show choices after all messages are displayed
  const beatMessages = beat.messages
  const displayedCount = state.displayedMessages.filter((dm) =>
    beatMessages.some((m) => m.id === dm.messageId)
  ).length

  if (displayedCount < beatMessages.length) return []
  if (state.isTyping) return []

  return beat.choices
}

export function selectChoice(
  _campaign: Campaign,
  state: GameState,
  choice: Choice
): GameState {
  const playerMessage: DisplayedMessage = {
    id: crypto.randomUUID(),
    messageId: `player-${choice.id}`,
    sender: 'player',
    type: 'text',
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
  message: Message
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
  state: GameState
): Message[] {
  const beat = getCurrentBeat(campaign, state)
  if (!beat) return []

  const displayedMessageIds = new Set(
    state.displayedMessages.map((dm) => dm.messageId)
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
