import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteGame, loadGame, saveGame } from '../persistence'
import type { Campaign, Choice, GameState } from '../story-engine'
import {
  addDisplayedMessage,
  applyPresenceChanges,
  createInitialState,
  getAvailableChoices,
  getCharacterPresence,
  getCurrentBeat,
  getPendingMessages,
  isEnding,
  selectChoice,
  setTyping,
} from '../story-engine'

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
      if (saved) {
        setState(saved.state)
      } else {
        // Create initial state and apply presence changes from starting beat
        let initialState = createInitialState(campaign)
        const startBeat = campaign.beats[campaign.startBeatId]
        if (startBeat?.presenceChanges) {
          initialState = applyPresenceChanges(initialState, startBeat.presenceChanges)
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

  // Process pending messages one at a time
  useEffect(() => {
    if (!state || isProcessing) return

    const pending = getPendingMessages(campaign, state)
    if (pending.length === 0) return

    setIsProcessing(true)
    const nextMessage = pending[0]

    if (nextMessage.sender !== 'system') {
      // Show typing indicator
      setState((s) => (s ? setTyping(s, true) : s))

      const typingDelay = nextMessage.delay ?? DEFAULT_TYPING_DELAY
      const typingTimeout = window.setTimeout(() => {
        // Add the message and hide typing
        setState((s) => {
          if (!s) return s
          const withMessage = addDisplayedMessage(s, nextMessage)
          return setTyping(withMessage, false)
        })

        // Wait before processing next message
        const nextTimeout = window.setTimeout(() => {
          setIsProcessing(false)
        }, DEFAULT_MESSAGE_DELAY)
        timeoutsRef.current.push(nextTimeout)
      }, typingDelay)
      timeoutsRef.current.push(typingTimeout)
    } else {
      // System messages appear immediately
      setState((s) => (s ? addDisplayedMessage(s, nextMessage) : s))
      const nextTimeout = window.setTimeout(() => {
        setIsProcessing(false)
      }, nextMessage.delay ?? 300)
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
      // Clear any pending timeouts
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []

      // Update state with player's choice
      let newState = selectChoice(campaign, state, choice)

      // Apply presence changes from the new beat (if any)
      const newBeat = getCurrentBeat(campaign, newState)
      if (newBeat?.presenceChanges) {
        newState = applyPresenceChanges(newState, newBeat.presenceChanges)
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
    setState(createInitialState(campaign))
  }, [campaign])

  const choices = state ? getAvailableChoices(campaign, state) : []
  const currentBeat = state ? getCurrentBeat(campaign, state) : null
  const ending = state ? isEnding(campaign, state) : false

  const getPresence = useCallback(
    (characterId: string) => {
      if (!state) return null
      return getCharacterPresence(state, characterId)
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
