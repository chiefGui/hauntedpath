import { useRef, useEffect } from 'react'
import type { Campaign, GameState } from '../../engine'
import { getCharacter } from '../../engine'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'

interface ChatViewProps {
  campaign: Campaign
  state: GameState
}

export function ChatView({ campaign, state }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.displayedMessages.length, state.isTyping])

  // Group consecutive messages by sender to show/hide avatars
  const messagesWithMeta = state.displayedMessages.map((msg, index) => {
    const prevMsg = state.displayedMessages[index - 1]
    const isFirstFromSender = !prevMsg || prevMsg.sender !== msg.sender
    return { message: msg, showAvatar: isFirstFromSender }
  })

  // Find the character who's typing (last NPC to send a message or first character)
  const typingCharacter = campaign.characters[0] ?? null

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
    >
      {messagesWithMeta.map(({ message, showAvatar }) => {
        const character = getCharacter(campaign, message.sender)
        const isPlayer = message.sender === 'player'

        return (
          <MessageBubble
            key={message.id}
            message={message}
            character={character}
            isPlayer={isPlayer}
            showAvatar={showAvatar}
            isGroup={campaign.isGroup}
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
