import { Fragment, useEffect, useRef } from 'react'
import type {
  Campaign,
  Choice,
  ChoicePrompt,
  DisplayedItem,
  DisplayedMessage,
  GameState,
} from '../../engine'
import {
  CampaignService,
  ChoiceType,
  isDisplayedEvent,
  StoryTimeService,
} from '../../engine'
import { Bubble } from '../primitives'
import { ChoicePicker } from './choice-picker'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'

type TimelineItem =
  | { type: 'item'; data: DisplayedItem; timestamp: number; storyTime?: number }
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
      storyTime: item.storyTime,
    })),
    ...state.choicePrompts.map((prompt) => ({
      type: 'choice' as const,
      data: prompt,
      timestamp: prompt.timestamp,
    })),
  ].sort((a, b) => a.timestamp - b.timestamp)

  // Track previous message for spacing logic
  let prevMessage: DisplayedMessage | null = null
  let prevStoryTime: number | undefined

  const typingCharacter = campaign.characters[0] ?? null

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      {timeline.map((timelineItem) => {
        // Check if we need to show a time header
        const storyTime = timelineItem.type === 'item' ? timelineItem.storyTime : undefined
        const showTimeHeader = storyTime !== undefined && storyTime !== prevStoryTime
        const timeHeader = showTimeHeader
          ? StoryTimeService.format(
              new Date(storyTime),
              prevStoryTime ? new Date(prevStoryTime) : undefined,
            )
          : null

        if (storyTime !== undefined) {
          prevStoryTime = storyTime
        }

        if (timelineItem.type === 'item') {
          const displayedItem = timelineItem.data

          // Handle events (narrative happenings) - rendered as centered text
          if (isDisplayedEvent(displayedItem)) {
            return (
              <Fragment key={displayedItem.id}>
                {timeHeader && (
                  <div className="text-center text-xs text-gray-500 py-2 animate-message-appear">
                    {timeHeader}
                  </div>
                )}
                <Bubble.System className="animate-message-appear">
                  {displayedItem.content}
                </Bubble.System>
              </Fragment>
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
            <Fragment key={message.id}>
              {timeHeader && (
                <div className="text-center text-xs text-gray-500 py-2 animate-message-appear">
                  {timeHeader}
                </div>
              )}
              <div className={needsExtraSpace ? 'mt-3' : undefined}>
                <MessageBubble
                  message={message}
                  character={character}
                  isPlayer={isPlayer}
                  showAvatar={isFirstFromSender}
                  isGroup={campaign.isGroup}
                />
              </div>
            </Fragment>
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
