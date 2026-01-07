import { useState, useEffect, useCallback, useRef } from 'react'
import type { Campaign, GameState, Choice } from '../story-engine'
import {
  createInitialState,
  getCurrentBeat,
  getAvailableChoices,
  selectChoice,
  addDisplayedMessage,
  setTyping,
  getPendingMessages,
  isEnding,
} from '../story-engine'
import { saveGame, loadGame, deleteGame } from '../persistence'

const DEFAULT_TYPING_DELAY = 1500
const DEFAULT_MESSAGE_DELAY = 800

export type UseGameOptions = {
  autoSave?: boolean
}

export function useGame(campaign: Campaign, options: UseGameOptions = {}) {
  const { autoSave = true } = options
  const [state, setState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const processingRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    async function init() {
      const saved = await loadGame(campaign.id)
      if (saved) {
        setState(saved.state)
      } else {
        setState(createInitialState(campaign))
      }
      setIsLoading(false)
    }
    init()
  }, [campaign.id])

  useEffect(() => {
    if (!autoSave || !state || isLoading) return
    saveGame(campaign.id, state)
  }, [campaign.id, state, autoSave, isLoading])

  useEffect(() => {
    if (!state || processingRef.current) return

    const pending = getPendingMessages(campaign, state)
    if (pending.length === 0) return

    processingRef.current = true
    const nextMessage = pending[0]

    if (nextMessage.sender !== 'system') {
      setState((s) => (s ? setTyping(s, true) : s))

      const typingDelay = nextMessage.delay ?? DEFAULT_TYPING_DELAY
      const typingTimeout = window.setTimeout(() => {
        setState((s) => {
          if (!s) return s
          const withMessage = addDisplayedMessage(s, nextMessage)
          return setTyping(withMessage, false)
        })

        const nextTimeout = window.setTimeout(() => {
          processingRef.current = false
        }, DEFAULT_MESSAGE_DELAY)
        timeoutsRef.current.push(nextTimeout)
      }, typingDelay)
      timeoutsRef.current.push(typingTimeout)
    } else {
      setState((s) => (s ? addDisplayedMessage(s, nextMessage) : s))
      const nextTimeout = window.setTimeout(() => {
        processingRef.current = false
      }, nextMessage.delay ?? 500)
      timeoutsRef.current.push(nextTimeout)
    }
  }, [campaign, state])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (!state) return
      setState(selectChoice(campaign, state, choice))
      processingRef.current = false
    },
    [campaign, state]
  )

  const restart = useCallback(async () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    processingRef.current = false
    await deleteGame(campaign.id)
    setState(createInitialState(campaign))
  }, [campaign])

  const choices = state ? getAvailableChoices(campaign, state) : []
  const currentBeat = state ? getCurrentBeat(campaign, state) : null
  const ending = state ? isEnding(campaign, state) : false

  return {
    state,
    isLoading,
    choices,
    currentBeat,
    isEnding: ending,
    handleChoice,
    restart,
  }
}
