import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteGame, loadGame, saveGame } from '../persistence'
import type { Campaign, Choice, GameState } from '../services'
import { GameStateService, isMessage, SAVE_VERSION } from '../services'

const DEFAULT_TYPING_DELAY = 800
const DEFAULT_MESSAGE_DELAY = 400

export type UseGameOptions = {
  autoSave?: boolean
}

export function useGame(campaign: Campaign, options: UseGameOptions = {}) {
  const { autoSave = true } = options
  const [state, setState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const timeoutsRef = useRef<number[]>([])

  // Initialize game state
  useEffect(() => {
    async function init() {
      const saved = await loadGame(campaign.id)

      // If save exists but is outdated, delete it and start fresh
      if (saved && saved.state.version !== SAVE_VERSION) {
        await deleteGame(campaign.id)
      }

      const validSave = saved?.state.version === SAVE_VERSION

      if (validSave) {
        setState(saved.state)
      } else {
        let initialState = GameStateService.create(campaign)
        const startBeat = campaign.beats[campaign.startBeatId]
        if (startBeat?.presenceChanges) {
          initialState = GameStateService.applyPresenceChanges(
            initialState,
            startBeat.presenceChanges,
          )
        }
        setState(initialState)
      }
      setIsLoading(false)
    }
    init()
  }, [campaign.id])

  // Auto-save
  useEffect(() => {
    if (!autoSave || !state || isLoading) return
    saveGame(campaign.id, state)
  }, [campaign.id, state, autoSave, isLoading])

  // Process pending items one at a time
  useEffect(() => {
    if (!state || isProcessing) return

    const pending = GameStateService.getPendingItems(campaign, state)
    if (pending.length === 0) return

    setIsProcessing(true)
    const nextItem = pending[0]

    // Messages from characters show typing indicator
    if (isMessage(nextItem)) {
      setState((s) => (s ? GameStateService.setTyping(s, true) : s))

      const typingDelay = nextItem.delay ?? DEFAULT_TYPING_DELAY
      const typingTimeout = window.setTimeout(() => {
        setState((s) => {
          if (!s) return s
          const withItem = GameStateService.addItem(s, nextItem)
          return GameStateService.setTyping(withItem, false)
        })

        const nextTimeout = window.setTimeout(() => {
          setIsProcessing(false)
        }, DEFAULT_MESSAGE_DELAY)
        timeoutsRef.current.push(nextTimeout)
      }, typingDelay)
      timeoutsRef.current.push(typingTimeout)
    } else {
      // Events appear immediately (no typing indicator)
      setState((s) => (s ? GameStateService.addItem(s, nextItem) : s))
      const nextTimeout = window.setTimeout(() => {
        setIsProcessing(false)
      }, nextItem.delay ?? 300)
      timeoutsRef.current.push(nextTimeout)
    }
  }, [campaign, state, isProcessing])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (!state) return
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []

      let newState = GameStateService.selectChoice(state, choice)

      const newBeat = GameStateService.getCurrentBeat(campaign, newState)
      if (newBeat?.presenceChanges) {
        newState = GameStateService.applyPresenceChanges(
          newState,
          newBeat.presenceChanges,
        )
      }

      setState(newState)
      setIsProcessing(false)
    },
    [campaign, state],
  )

  const restart = useCallback(async () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    setIsProcessing(false)
    await deleteGame(campaign.id)
    setState(GameStateService.create(campaign))
  }, [campaign])

  const choices = state
    ? GameStateService.getAvailableChoices(campaign, state)
    : []
  const currentBeat = state
    ? GameStateService.getCurrentBeat(campaign, state)
    : null
  const ending = state ? GameStateService.isEnding(campaign, state) : false

  // Create choice prompt when choices become available
  useEffect(() => {
    if (!state || choices.length === 0) return

    const existingPrompt = state.choicePrompts.some(
      (p) => p.beatId === state.currentBeatId,
    )
    if (existingPrompt) return

    setState((s) =>
      s ? GameStateService.addChoicePrompt(s, state.currentBeatId, choices) : s,
    )
  }, [state, choices])

  const getPresence = useCallback(
    (characterId: string) => {
      if (!state) return null
      return GameStateService.getPresence(state, characterId)
    },
    [state],
  )

  return {
    state,
    isLoading,
    isProcessing,
    choices,
    currentBeat,
    isEnding: ending,
    handleChoice,
    restart,
    getPresence,
  }
}
