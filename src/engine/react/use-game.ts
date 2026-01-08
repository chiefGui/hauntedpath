import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteGame, loadGame, saveGame } from '../persistence'
import type { Campaign, Choice, ConversationState, GameState } from '../services'
import {
  CampaignService,
  GameStateService,
  isMessage,
  SAVE_VERSION,
} from '../services'

const DEFAULT_TYPING_DELAY = 800
const DEFAULT_MESSAGE_DELAY = 400

export type UseGameOptions = {
  autoSave?: boolean
}

export type IncomingMessageEvent = {
  id: string
  conversationId: string
  content: string
  sender: string
}

const NOTIFICATION_DURATION = 4000 // 4 seconds per notification

export function useGame(campaign: Campaign, options: UseGameOptions = {}) {
  const { autoSave = true } = options
  const [state, setState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [notifications, setNotifications] = useState<IncomingMessageEvent[]>([])
  const timeoutsRef = useRef<number[]>([])
  const notificationTimeoutsRef = useRef<Map<string, number>>(new Map())
  const notificationIdRef = useRef(0)

  const isMultiChat = CampaignService.isMultiChat(campaign)

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
    const beat = GameStateService.getCurrentBeat(campaign, state)
    const beatAt = beat?.at

    // Determine which conversation this item belongs to
    const conversationId = GameStateService.getItemConversationId(
      state,
      nextItem,
    )

    // Messages from characters show typing indicator
    if (isMessage(nextItem)) {
      setState((s) =>
        s ? GameStateService.setTyping(s, true, conversationId) : s,
      )

      const typingDelay = nextItem.delay ?? DEFAULT_TYPING_DELAY
      const typingTimeout = window.setTimeout(() => {
        setState((s) => {
          if (!s) return s
          const withItem = GameStateService.addItem(
            s,
            nextItem,
            beatAt,
            conversationId,
          )
          return GameStateService.setTyping(withItem, false, conversationId)
        })

        // If message went to a different conversation, trigger notification
        if (
          isMultiChat &&
          conversationId &&
          state.currentConversationId &&
          conversationId !== state.currentConversationId
        ) {
          const notificationId = `notification-${++notificationIdRef.current}`
          const newNotification: IncomingMessageEvent = {
            id: notificationId,
            conversationId,
            content: nextItem.content,
            sender: nextItem.sender,
          }

          setNotifications((prev) => [...prev, newNotification])

          // Auto-dismiss this specific notification after duration
          const timeout = window.setTimeout(() => {
            setNotifications((prev) =>
              prev.filter((n) => n.id !== notificationId),
            )
            notificationTimeoutsRef.current.delete(notificationId)
          }, NOTIFICATION_DURATION)
          notificationTimeoutsRef.current.set(notificationId, timeout)
        }

        const nextTimeout = window.setTimeout(() => {
          setIsProcessing(false)
        }, DEFAULT_MESSAGE_DELAY)
        timeoutsRef.current.push(nextTimeout)
      }, typingDelay)
      timeoutsRef.current.push(typingTimeout)
    } else {
      // Events appear immediately (no typing indicator)
      setState((s) =>
        s ? GameStateService.addItem(s, nextItem, beatAt, conversationId) : s,
      )
      const nextTimeout = window.setTimeout(() => {
        setIsProcessing(false)
      }, nextItem.delay ?? 300)
      timeoutsRef.current.push(nextTimeout)
    }
  }, [campaign, state, isProcessing, isMultiChat])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      notificationTimeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (!state) return
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []

      const conversationId = state.currentConversationId

      let newState = GameStateService.selectChoice(state, choice, conversationId)

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

  const dismissNotification = useCallback((notificationId: string) => {
    // Clear the timeout for this notification
    const timeout = notificationTimeoutsRef.current.get(notificationId)
    if (timeout) {
      clearTimeout(timeout)
      notificationTimeoutsRef.current.delete(notificationId)
    }
    // Remove from queue
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }, [])

  const switchConversation = useCallback(
    (conversationId: string, notificationId?: string) => {
      if (!state) return
      setState(GameStateService.switchConversation(state, conversationId))
      // Clear the specific notification that was tapped, if provided
      if (notificationId) {
        dismissNotification(notificationId)
      }
    },
    [state, dismissNotification],
  )

  const restart = useCallback(async () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    // Clear all notification timeouts
    notificationTimeoutsRef.current.forEach((t) => clearTimeout(t))
    notificationTimeoutsRef.current.clear()
    setIsProcessing(false)
    setNotifications([])
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

  // Get current conversation state (for multi-chat) or the main state
  const currentConversationState: ConversationState | null = state
    ? GameStateService.getCurrentConversationState(state)
    : null

  // Create choice prompt when choices become available
  useEffect(() => {
    if (!state || choices.length === 0) return

    const conversationId = state.currentConversationId
    const convState = currentConversationState

    if (!convState) return

    const existingPrompt = convState.choicePrompts.some(
      (p) => p.beatId === state.currentBeatId,
    )
    if (existingPrompt) return

    setState((s) =>
      s
        ? GameStateService.addChoicePrompt(
            s,
            state.currentBeatId,
            choices,
            conversationId,
          )
        : s,
    )
  }, [state, choices, currentConversationState])

  const getPresence = useCallback(
    (characterId: string) => {
      if (!state) return null
      return GameStateService.getPresence(state, characterId)
    },
    [state],
  )

  const getUnreadCount = useCallback(
    (conversationId: string) => {
      if (!state) return 0
      return GameStateService.getUnreadCount(state, conversationId)
    },
    [state],
  )

  const getTotalUnreadCount = useCallback(() => {
    if (!state) return 0
    return GameStateService.getTotalUnreadCount(state)
  }, [state])

  const getConversationState = useCallback(
    (conversationId: string) => {
      if (!state) return null
      return GameStateService.getConversationState(state, conversationId)
    },
    [state],
  )

  return {
    state,
    isLoading,
    isProcessing,
    isMultiChat,
    choices,
    currentBeat,
    isEnding: ending,
    currentConversationState,
    currentConversationId: state?.currentConversationId,
    notifications,
    handleChoice,
    switchConversation,
    dismissNotification,
    restart,
    getPresence,
    getUnreadCount,
    getTotalUnreadCount,
    getConversationState,
  }
}
