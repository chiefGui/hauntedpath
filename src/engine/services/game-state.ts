import type { Beat } from './beat'
import { BeatService } from './beat'
import type { Campaign } from './campaign'
import type { Choice, ChoicePrompt } from './choice'
import { ChoiceService } from './choice'
import type { BeatItem, DisplayedItem } from './message'
import { MessageService } from './message'
import type { CharacterPresence } from './presence'
import { ContactStatus, PresenceService } from './presence'

// Bump this when GameState shape changes - old saves will be deleted
export const SAVE_VERSION = 2

export type GameState = {
  version: number
  campaignId: string
  currentBeatId: string
  displayedItems: DisplayedItem[]
  choicePrompts: ChoicePrompt[]
  isTyping: boolean
  visitedBeatIds: string[]
  startedAt: number
  lastPlayedAt: number
  presence: Record<string, CharacterPresence>
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

    return {
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
    }
  }

  static getCurrentBeat(campaign: Campaign, state: GameState): Beat | null {
    return BeatService.get(campaign.beats, state.currentBeatId)
  }

  static getAvailableChoices(campaign: Campaign, state: GameState): Choice[] {
    const beat = this.getCurrentBeat(campaign, state)
    if (!beat) return []

    const displayedCount = state.displayedItems.filter((di) =>
      beat.items.some((item) => item.id === di.itemId),
    ).length

    if (displayedCount < beat.items.length) return []
    if (state.isTyping) return []

    return beat.choices
  }

  static getPendingItems(campaign: Campaign, state: GameState): BeatItem[] {
    const beat = this.getCurrentBeat(campaign, state)
    if (!beat) return []

    const displayedIds = new Set(state.displayedItems.map((di) => di.itemId))
    return beat.items.filter((item) => !displayedIds.has(item.id))
  }

  static isEnding(campaign: Campaign, state: GameState): boolean {
    const beat = this.getCurrentBeat(campaign, state)
    return BeatService.isEnding(beat)
  }

  static setTyping(state: GameState, isTyping: boolean): GameState {
    return { ...state, isTyping }
  }

  static addItem(state: GameState, item: BeatItem): GameState {
    return {
      ...state,
      displayedItems: [
        ...state.displayedItems,
        MessageService.createDisplayed(item),
      ],
      lastPlayedAt: Date.now(),
    }
  }

  static addChoicePrompt(
    state: GameState,
    beatId: string,
    choices: Choice[],
  ): GameState {
    if (state.choicePrompts.some((p) => p.beatId === beatId)) {
      return state
    }

    return {
      ...state,
      choicePrompts: [
        ...state.choicePrompts,
        ChoiceService.createPrompt(beatId, choices),
      ],
    }
  }

  static selectChoice(state: GameState, choice: Choice): GameState {
    const isAction = ChoiceService.isAction(choice)
    const now = Date.now()

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
