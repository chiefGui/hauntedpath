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

        <Bubble.Message>{message.content}</Bubble.Message>

        <Bubble.Status status={message.status} />
      </Bubble.Content>
    </Bubble.Root>
  )
}
