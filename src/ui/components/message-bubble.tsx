import type { Character, DisplayedMessage } from '../../engine'
import { Bubble } from '../primitives'

export type MessageBubbleProps = {
  message: DisplayedMessage
  character: Character | null
  isPlayer: boolean
  showAvatar?: boolean
  isGroup?: boolean
}

export function MessageBubble({
  message,
  character,
  isPlayer,
  showAvatar = true,
  isGroup = false,
}: MessageBubbleProps) {
  const isSystem = message.sender === 'system'

  if (isSystem) {
    return (
      <Bubble.System className="animate-message-appear">
        {message.content}
      </Bubble.System>
    )
  }

  const variant = isPlayer ? 'player' : 'npc'

  return (
    <Bubble.Root
      variant={variant}
      className={
        isPlayer ? 'animate-message-appear-player' : 'animate-message-appear'
      }
    >
      <Bubble.Avatar
        src={character?.avatar}
        alt={character?.name}
        fallback={character?.name}
        show={showAvatar}
      />

      <Bubble.Content>
        {isGroup && showAvatar && character && (
          <Bubble.Sender>{character.name}</Bubble.Sender>
        )}

        {message.type === 'image' ? (
          <Bubble.Image src={message.content} />
        ) : (
          <Bubble.Message>{message.content}</Bubble.Message>
        )}

        <Bubble.Status status={message.status} />
      </Bubble.Content>
    </Bubble.Root>
  )
}
