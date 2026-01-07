import type { Beat } from './beat'
import { BeatService } from './beat'
import type { Campaign } from './campaign'
import type { Choice, ChoicePrompt } from './choice'
import { ChoiceService } from './choice'
import type { DisplayedMessage, Message } from './message'
import { MessageService } from './message'
import type { CharacterPresence } from './presence'
import { ContactStatus, PresenceService } from './presence'

export type GameState = {
  campaignId: string
  currentBeatId: string
  displayedMessages: DisplayedMessage[]
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
      campaignId: campaign.id,
      currentBeatId: campaign.startBeatId,
      displayedMessages: [],
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

    const displayedCount = state.displayedMessages.filter((dm) =>
      beat.messages.some((m) => m.id === dm.messageId),
    ).length

    if (displayedCount < beat.messages.length) return []
    if (state.isTyping) return []

    return beat.choices
  }

  static getPendingMessages(campaign: Campaign, state: GameState): Message[] {
    const beat = this.getCurrentBeat(campaign, state)
    if (!beat) return []

    const displayedIds = new Set(state.displayedMessages.map((dm) => dm.messageId))
    return beat.messages.filter((m) => !displayedIds.has(m.id))
  }

  static isEnding(campaign: Campaign, state: GameState): boolean {
    const beat = this.getCurrentBeat(campaign, state)
    return BeatService.isEnding(beat)
  }

  static setTyping(state: GameState, isTyping: boolean): GameState {
    return { ...state, isTyping }
  }

  static addMessage(state: GameState, message: Message): GameState {
    return {
      ...state,
      displayedMessages: [
        ...state.displayedMessages,
        MessageService.createDisplayed(message),
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

    const newMessages = isAction
      ? state.displayedMessages
      : [
          ...state.displayedMessages,
          MessageService.createPlayerMessage(choice.text, choice.id),
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
