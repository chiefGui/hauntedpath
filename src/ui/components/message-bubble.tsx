import type { DisplayedMessage, Character } from '../../engine'

interface MessageBubbleProps {
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
      <div className="flex justify-center py-2">
        <span className="text-xs text-[--color-text-tertiary] italic">
          — {message.content} —
        </span>
      </div>
    )
  }

  return (
    <div
      className={`flex items-end gap-2 ${isPlayer ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isPlayer && showAvatar && (
        <div className="w-7 h-7 shrink-0">
          {character && (
            <img
              src={character.avatar}
              alt={character.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          )}
        </div>
      )}
      {!isPlayer && !showAvatar && <div className="w-7 shrink-0" />}

      {/* Bubble */}
      <div
        className={`max-w-[75%] flex flex-col ${isPlayer ? 'items-end' : 'items-start'}`}
      >
        {/* Sender name for group chats */}
        {isGroup && !isPlayer && showAvatar && character && (
          <span className="text-xs text-[--color-text-secondary] mb-1 ml-3">
            {character.name}
          </span>
        )}

        {message.type === 'image' ? (
          <img
            src={message.content}
            alt="Shared image"
            className={`max-w-full rounded-2xl ${
              isPlayer
                ? 'rounded-br-md'
                : 'rounded-bl-md'
            }`}
          />
        ) : (
          <div
            className={`px-3 py-2 rounded-2xl text-[15px] leading-tight ${
              isPlayer
                ? 'bg-[--color-bubble-player] text-white rounded-br-md'
                : 'bg-[--color-bubble-npc] text-[--color-text-primary] rounded-bl-md'
            }`}
          >
            {message.content}
          </div>
        )}

        {/* Status indicator for player messages */}
        {isPlayer && (
          <span className="text-[10px] text-[--color-text-tertiary] mt-0.5 mr-1">
            {message.status === 'read'
              ? 'Read'
              : message.status === 'delivered'
                ? 'Delivered'
                : 'Sent'}
          </span>
        )}
      </div>
    </div>
  )
}
