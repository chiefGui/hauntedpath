import type { Beat } from './beat'
import { BeatService } from './beat'
import type { Campaign } from './campaign'
import { CampaignService } from './campaign'
import type { Choice, ChoicePrompt } from './choice'
import { ChoiceService } from './choice'
import type { BeatItem, DisplayedItem } from './message'
import { MessageService } from './message'
import type { CharacterPresence } from './presence'
import { ContactStatus, PresenceService } from './presence'
import { StoryTimeService } from './story-time'

// Bump this when GameState shape changes - old saves will be deleted
export const SAVE_VERSION = 4

// Per-conversation state for multi-chat mode
export type ConversationState = {
  displayedItems: DisplayedItem[]
  choicePrompts: ChoicePrompt[]
  isTyping: boolean
  unreadCount: number
  lastMessageAt?: number
}

export type GameState = {
  version: number
  campaignId: string
  currentBeatId: string
  visitedBeatIds: string[]
  startedAt: number
  lastPlayedAt: number
  presence: Record<string, CharacterPresence>
  storyTime?: number // current story time as timestamp

  // Single-chat mode (backward compatible)
  displayedItems: DisplayedItem[]
  choicePrompts: ChoicePrompt[]
  isTyping: boolean

  // Multi-chat mode
  currentConversationId?: string
  conversationStates?: Record<string, ConversationState>
}

export class GameStateService {
  static create(campaign: Campaign): GameState {
    const now = Date.now()

    const presence: Record<string, CharacterPresence> = {}
    for (const character of campaign.characters) {
      presence[character.id] = PresenceService.create(
        character.status ?? ContactStatus.Offline,
      )
    }

    // Initialize story time from campaign
    let storyTime: number | undefined
    if (campaign.story?.start) {
      const parsed = StoryTimeService.parseStart(campaign.story.start)
      if (parsed) {
        storyTime = parsed.getTime()
      }
    }

    const baseState: GameState = {
      version: SAVE_VERSION,
      campaignId: campaign.id,
      currentBeatId: campaign.startBeatId,
      displayedItems: [],
      choicePrompts: [],
      isTyping: false,
      visitedBeatIds: [campaign.startBeatId],
      startedAt: now,
      lastPlayedAt: now,
      presence,
      storyTime,
    }

    // Initialize multi-chat mode if campaign has conversations
    if (CampaignService.isMultiChat(campaign)) {
      const conversationStates: Record<string, ConversationState> = {}
      for (const conv of campaign.conversations!) {
        conversationStates[conv.id] = {
          displayedItems: [],
          choicePrompts: [],
          isTyping: false,
          unreadCount: 0,
        }
      }
      baseState.currentConversationId =
        CampaignService.getDefaultConversationId(campaign)
      baseState.conversationStates = conversationStates
    }

    return baseState
  }

  // Check if state is in multi-chat mode
  static isMultiChat(state: GameState): boolean {
    return (
      state.conversationStates !== undefined &&
      state.currentConversationId !== undefined
    )
  }

  // Get current conversation state (multi-chat) or create a virtual one (single-chat)
  static getCurrentConversationState(state: GameState): ConversationState {
    if (this.isMultiChat(state) && state.currentConversationId) {
      return (
        state.conversationStates![state.currentConversationId] ?? {
          displayedItems: [],
          choicePrompts: [],
          isTyping: false,
          unreadCount: 0,
        }
      )
    }
    // Single-chat mode: return top-level state as conversation state
    return {
      displayedItems: state.displayedItems,
      choicePrompts: state.choicePrompts,
      isTyping: state.isTyping,
      unreadCount: 0,
    }
  }

  // Get conversation state for a specific conversation
  static getConversationState(
    state: GameState,
    conversationId: string,
  ): ConversationState | null {
    if (!this.isMultiChat(state)) return null
    return state.conversationStates![conversationId] ?? null
  }

  // Get all displayed items across all conversations (for checking pending items)
  static getAllDisplayedItems(state: GameState): DisplayedItem[] {
    if (this.isMultiChat(state)) {
      return Object.values(state.conversationStates!).flatMap(
        (cs) => cs.displayedItems,
      )
    }
    return state.displayedItems
  }

  static getCurrentBeat(campaign: Campaign, state: GameState): Beat | null {
    return BeatService.get(campaign.beats, state.currentBeatId)
  }

  static getAvailableChoices(campaign: Campaign, state: GameState): Choice[] {
    const beat = this.getCurrentBeat(campaign, state)
    if (!beat) return []

    // Check if all items from current beat have been displayed
    const allDisplayed = this.getAllDisplayedItems(state)
    const displayedCount = allDisplayed.filter((di) =>
      beat.items.some((item) => item.id === di.itemId),
    ).length

    if (displayedCount < beat.items.length) return []

    // Check if any conversation is currently typing
    if (this.isMultiChat(state)) {
      const anyTyping = Object.values(state.conversationStates!).some(
        (cs) => cs.isTyping,
      )
      if (anyTyping) return []
    } else if (state.isTyping) {
      return []
    }

    return beat.choices
  }

  static getPendingItems(campaign: Campaign, state: GameState): BeatItem[] {
    const beat = this.getCurrentBeat(campaign, state)
    if (!beat) return []

    const allDisplayed = this.getAllDisplayedItems(state)
    const displayedIds = new Set(allDisplayed.map((di) => di.itemId))
    return beat.items.filter((item) => !displayedIds.has(item.id))
  }

  static isEnding(campaign: Campaign, state: GameState): boolean {
    const beat = this.getCurrentBeat(campaign, state)
    return BeatService.isEnding(beat)
  }

  static setTyping(
    state: GameState,
    isTyping: boolean,
    conversationId?: string,
  ): GameState {
    if (this.isMultiChat(state) && conversationId) {
      const convState = state.conversationStates![conversationId]
      if (!convState) return state
      return {
        ...state,
        conversationStates: {
          ...state.conversationStates!,
          [conversationId]: {
            ...convState,
            isTyping,
          },
        },
      }
    }
    return { ...state, isTyping }
  }

  // Determine which conversation an item belongs to
  static getItemConversationId(
    campaign: Campaign,
    state: GameState,
    item: BeatItem,
  ): string | undefined {
    if (!this.isMultiChat(state)) return undefined

    // If item explicitly specifies a conversation, use that
    if (item.conversationId) return item.conversationId

    // Otherwise, use current conversation
    return state.currentConversationId
  }

  static addItem(
    state: GameState,
    item: BeatItem,
    beatAt?: string,
    conversationId?: string,
  ): GameState {
    let storyTime = state.storyTime
    let itemStoryTime: number | undefined

    // Parse story time if item or beat has an 'at' field
    const atString = item.at ?? beatAt
    if (atString && storyTime !== undefined) {
      const context = {
        current: new Date(storyTime),
        baseYear: new Date(storyTime).getFullYear(),
      }
      const parsed = StoryTimeService.parse(atString, context)
      itemStoryTime = parsed.getTime()
      storyTime = itemStoryTime
    }

    const displayedItem = MessageService.createDisplayed(
      item,
      itemStoryTime,
      conversationId,
    )

    // Multi-chat mode: add to specific conversation
    if (this.isMultiChat(state) && conversationId) {
      const convState = state.conversationStates![conversationId]
      if (!convState) return state

      const isCurrentConversation =
        conversationId === state.currentConversationId
      const newUnreadCount = isCurrentConversation
        ? convState.unreadCount
        : convState.unreadCount + 1

      return {
        ...state,
        conversationStates: {
          ...state.conversationStates!,
          [conversationId]: {
            ...convState,
            displayedItems: [...convState.displayedItems, displayedItem],
            unreadCount: newUnreadCount,
            lastMessageAt: Date.now(),
          },
        },
        lastPlayedAt: Date.now(),
        storyTime,
      }
    }

    // Single-chat mode
    return {
      ...state,
      displayedItems: [...state.displayedItems, displayedItem],
      lastPlayedAt: Date.now(),
      storyTime,
    }
  }

  static addChoicePrompt(
    state: GameState,
    beatId: string,
    choices: Choice[],
    conversationId?: string,
  ): GameState {
    const prompt = ChoiceService.createPrompt(beatId, choices)

    // Multi-chat mode
    if (this.isMultiChat(state) && conversationId) {
      const convState = state.conversationStates![conversationId]
      if (!convState) return state

      if (convState.choicePrompts.some((p) => p.beatId === beatId)) {
        return state
      }

      return {
        ...state,
        conversationStates: {
          ...state.conversationStates!,
          [conversationId]: {
            ...convState,
            choicePrompts: [...convState.choicePrompts, prompt],
          },
        },
      }
    }

    // Single-chat mode
    if (state.choicePrompts.some((p) => p.beatId === beatId)) {
      return state
    }

    return {
      ...state,
      choicePrompts: [...state.choicePrompts, prompt],
    }
  }

  static selectChoice(
    state: GameState,
    choice: Choice,
    conversationId?: string,
  ): GameState {
    const isAction = ChoiceService.isAction(choice)
    const now = Date.now()

    // Multi-chat mode
    if (this.isMultiChat(state) && conversationId) {
      const convState = state.conversationStates![conversationId]
      if (!convState) return state

      const updatedPrompts = convState.choicePrompts.map((prompt) =>
        prompt.beatId === state.currentBeatId &&
        prompt.selectedChoiceId === null
          ? ChoiceService.markSelected(prompt, choice.id)
          : prompt,
      )

      const newItems = isAction
        ? convState.displayedItems
        : [
            ...convState.displayedItems,
            MessageService.createPlayerMessage(
              choice.text,
              choice.id,
              conversationId,
            ),
          ]

      return {
        ...state,
        currentBeatId: choice.nextBeatId,
        conversationStates: {
          ...state.conversationStates!,
          [conversationId]: {
            ...convState,
            displayedItems: newItems,
            choicePrompts: updatedPrompts,
          },
        },
        visitedBeatIds: [...state.visitedBeatIds, choice.nextBeatId],
        lastPlayedAt: now,
      }
    }

    // Single-chat mode
    const updatedPrompts = state.choicePrompts.map((prompt) =>
      prompt.beatId === state.currentBeatId && prompt.selectedChoiceId === null
        ? ChoiceService.markSelected(prompt, choice.id)
        : prompt,
    )

    const newItems = isAction
      ? state.displayedItems
      : [
          ...state.displayedItems,
          MessageService.createPlayerMessage(choice.text, choice.id),
        ]

    return {
      ...state,
      currentBeatId: choice.nextBeatId,
      displayedItems: newItems,
      choicePrompts: updatedPrompts,
      visitedBeatIds: [...state.visitedBeatIds, choice.nextBeatId],
      lastPlayedAt: now,
    }
  }

  // Switch to a different conversation (multi-chat only)
  static switchConversation(
    state: GameState,
    conversationId: string,
  ): GameState {
    if (!this.isMultiChat(state)) return state
    if (!state.conversationStates![conversationId]) return state

    // Clear unread count for the conversation we're switching to
    const convState = state.conversationStates![conversationId]
    return {
      ...state,
      currentConversationId: conversationId,
      conversationStates: {
        ...state.conversationStates!,
        [conversationId]: {
          ...convState,
          unreadCount: 0,
        },
      },
    }
  }

  // Get total unread count across all conversations (excluding current)
  static getTotalUnreadCount(state: GameState): number {
    if (!this.isMultiChat(state)) return 0
    return Object.entries(state.conversationStates!)
      .filter(([id]) => id !== state.currentConversationId)
      .reduce((sum, [, cs]) => sum + cs.unreadCount, 0)
  }

  // Get unread count for a specific conversation
  static getUnreadCount(state: GameState, conversationId: string): number {
    if (!this.isMultiChat(state)) return 0
    return state.conversationStates![conversationId]?.unreadCount ?? 0
  }

  static getPresence(
    state: GameState,
    characterId: string,
  ): CharacterPresence | null {
    return state.presence[characterId] ?? null
  }

  static applyPresenceChanges(
    state: GameState,
    changes: Record<string, Partial<CharacterPresence>>,
  ): GameState {
    const updatedPresence = { ...state.presence }

    for (const [characterId, change] of Object.entries(changes)) {
      const current = updatedPresence[characterId] ?? PresenceService.create()
      updatedPresence[characterId] = PresenceService.apply(current, change)
    }

    return { ...state, presence: updatedPresence }
  }
}
