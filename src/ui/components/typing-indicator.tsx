import type { Character } from '../../engine'

interface TypingIndicatorProps {
  character: Character | null
  showAvatar?: boolean
}

export function TypingIndicator({
  character,
  showAvatar = true,
}: TypingIndicatorProps) {
  return (
    <div className="flex items-end gap-2">
      {/* Avatar */}
      {showAvatar && (
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
      {!showAvatar && <div className="w-7 shrink-0" />}

      {/* Typing bubble */}
      <div className="bg-[--color-bubble-npc] px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-[--color-text-tertiary] rounded-full animate-bounce"
            style={{ animationDelay: '0ms', animationDuration: '600ms' }}
          />
          <span
            className="w-2 h-2 bg-[--color-text-tertiary] rounded-full animate-bounce"
            style={{ animationDelay: '150ms', animationDuration: '600ms' }}
          />
          <span
            className="w-2 h-2 bg-[--color-text-tertiary] rounded-full animate-bounce"
            style={{ animationDelay: '300ms', animationDuration: '600ms' }}
          />
        </div>
      </div>
    </div>
  )
}
