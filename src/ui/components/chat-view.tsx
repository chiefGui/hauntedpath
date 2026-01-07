import { useEffect, useRef } from 'react'
import type {
  Campaign,
  Choice,
  ChoicePrompt,
  DisplayedItem,
  DisplayedMessage,
  GameState,
} from '../../engine'
import { CampaignService, ChoiceType, isDisplayedEvent } from '../../engine'
import { Bubble } from '../primitives'
import { ChoicePicker } from './choice-picker'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'

type TimelineItem =
  | { type: 'item'; data: DisplayedItem; timestamp: number }
  | { type: 'choice'; data: ChoicePrompt; timestamp: number }

export type ChatViewProps = {
  campaign: Campaign
  state: GameState
  onChoiceSelect?: (choice: Choice) => void
}

export function ChatView({ campaign, state, onChoiceSelect }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.displayedItems.length, state.choicePrompts.length, state.isTyping])

  // Build unified timeline of items and choice prompts
  const timeline: TimelineItem[] = [
    ...state.displayedItems.map((item) => ({
      type: 'item' as const,
      data: item,
      timestamp: item.timestamp,
    })),
    ...state.choicePrompts.map((prompt) => ({
      type: 'choice' as const,
      data: prompt,
      timestamp: prompt.timestamp,
    })),
  ].sort((a, b) => a.timestamp - b.timestamp)

  // Track previous message for spacing logic
  let prevMessage: DisplayedMessage | null = null

  const typingCharacter = campaign.characters[0] ?? null

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      {timeline.map((timelineItem) => {
        if (timelineItem.type === 'item') {
          const displayedItem = timelineItem.data

          // Handle events (narrative happenings) - rendered as centered text
          if (isDisplayedEvent(displayedItem)) {
            return (
              <Bubble.System key={displayedItem.id} className="animate-message-appear">
                {displayedItem.content}
              </Bubble.System>
            )
          }

          // Handle messages (character speech)
          const message = displayedItem
          const character = CampaignService.getCharacter(campaign, message.sender)
          const isPlayer = message.sender === 'player'

          const isFirstFromSender =
            !prevMessage || prevMessage.sender !== message.sender

          // Add extra space when switching between player and NPC messages
          const prevIsPlayer = prevMessage?.sender === 'player'
          const needsExtraSpace =
            prevMessage && ((isPlayer && !prevIsPlayer) || (!isPlayer && prevIsPlayer))

          prevMessage = message

          return (
            <div
              key={message.id}
              className={needsExtraSpace ? 'mt-3' : undefined}
            >
              <MessageBubble
                message={message}
                character={character}
                isPlayer={isPlayer}
                showAvatar={isFirstFromSender}
                isGroup={campaign.isGroup}
              />
            </div>
          )
        }

        // Choice prompt
        const prompt = timelineItem.data
        const isActive = prompt.selectedChoiceId === null
        const hasOnlyActions = prompt.choices.every(
          (c) => c.type === ChoiceType.Action,
        )

        // Only show choice picker if it has a selection (action) or is active
        // Text-only choices that were selected become player messages, so hide those
        if (!isActive && !hasOnlyActions) {
          // Check if the selected choice was an action
          const selectedChoice = prompt.choices.find(
            (c) => c.id === prompt.selectedChoiceId,
          )
          if (selectedChoice?.type !== ChoiceType.Action) {
            return null
          }
        }

        return (
          <ChoicePicker
            key={prompt.id}
            choices={prompt.choices}
            selectedChoiceId={prompt.selectedChoiceId}
            onSelect={isActive ? onChoiceSelect : undefined}
          />
        )
      })}

      {state.isTyping && (
        <TypingIndicator character={typingCharacter} showAvatar />
      )}

      <div ref={bottomRef} />
    </div>
  )
}
