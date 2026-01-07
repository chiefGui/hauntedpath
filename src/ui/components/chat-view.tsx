import { useEffect, useRef } from 'react'
import type {
  Campaign,
  Choice,
  ChoicePrompt,
  DisplayedMessage,
  GameState,
} from '../../engine'
import { CampaignService, ChoiceType } from '../../engine'
import { ChoicePicker } from './choice-picker'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'

type TimelineItem =
  | { type: 'message'; data: DisplayedMessage; timestamp: number }
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
  }, [state.displayedMessages.length, state.choicePrompts.length, state.isTyping])

  // Build unified timeline of messages and choice prompts
  const timeline: TimelineItem[] = [
    ...state.displayedMessages.map((msg) => ({
      type: 'message' as const,
      data: msg,
      timestamp: msg.timestamp,
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
      {timeline.map((item) => {
        if (item.type === 'message') {
          const message = item.data
          const character = CampaignService.getCharacter(campaign, message.sender)
          const isPlayer = message.sender === 'player'
          const isSystem = message.sender === 'system'

          const isFirstFromSender =
            !prevMessage || prevMessage.sender !== message.sender

          // Add extra space when switching between player and NPC messages
          const prevIsPlayer = prevMessage?.sender === 'player'
          const prevIsSystem = prevMessage?.sender === 'system'
          const needsExtraSpace =
            prevMessage &&
            !isSystem &&
            !prevIsSystem &&
            ((isPlayer && !prevIsPlayer) || (!isPlayer && prevIsPlayer))

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
        const prompt = item.data
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
