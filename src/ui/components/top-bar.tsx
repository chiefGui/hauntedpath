import type { Character, CharacterPresence } from '../../engine'
import { Avatar, Button } from '../primitives'
import { formatLastSeen } from '../lib'

export type TopBarProps = {
  characters: Character[]
  isGroup?: boolean
  groupName?: string
  isTyping?: boolean
  presence?: CharacterPresence | null
  onBack: () => void
  onMenuOpen?: () => void
}

export function TopBar({
  characters,
  isGroup = false,
  groupName,
  isTyping = false,
  presence,
  onBack,
  onMenuOpen,
}: TopBarProps) {
  const primaryCharacter = characters[0]
  const displayName = isGroup
    ? (groupName ?? characters.map((c) => c.name).join(', '))
    : (primaryCharacter?.name ?? 'Unknown')

  const getStatusText = (): string | null => {
    // Typing always takes priority
    if (isTyping) return 'typing...'

    // Group chat shows participant count
    if (isGroup) return `${characters.length} people`

    // Use presence if available
    if (presence) {
      if (presence.status === 'online') return 'online'
      if (presence.status === 'away') return 'away'
      if (presence.lastSeenAt) return formatLastSeen(presence.lastSeenAt)
    }

    return null
  }

  const statusText = getStatusText()

  return (
    <div className="flex items-center h-14 px-2 bg-card border-b border-border">
      {/* Back button */}
      <Button
        onClick={onBack}
        variant="ghost"
        size="icon"
        className="shrink-0 -ml-1"
      >
        <svg
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L1 9L9 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      {/* Avatar */}
      <div className="shrink-0 ml-1">
        {isGroup ? (
          <div className="flex -space-x-2">
            {characters.slice(0, 3).map((char, i) => (
              <Avatar
                key={char.id}
                src={char.avatar}
                alt={char.name}
                size="sm"
                className="border-2 border-card"
                style={{ zIndex: 3 - i }}
              />
            ))}
          </div>
        ) : (
          <Avatar
            src={primaryCharacter?.avatar}
            alt={displayName}
            fallback={displayName}
            size="md"
          />
        )}
      </div>

      {/* Name and status */}
      <div className="flex-1 min-w-0 ml-3">
        <h1 className="text-[17px] font-semibold leading-tight truncate">
          {displayName}
        </h1>
        {statusText && (
          <p
            className={`text-xs leading-tight truncate ${
              isTyping ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {statusText}
          </p>
        )}
      </div>

      {/* Menu button */}
      {onMenuOpen && (
        <Button
          onClick={onMenuOpen}
          variant="ghost"
          size="icon"
          className="shrink-0 -mr-1"
        >
          <svg
            width="4"
            height="16"
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <circle cx="2" cy="8" r="1.5" fill="currentColor" />
            <circle cx="2" cy="14" r="1.5" fill="currentColor" />
          </svg>
        </Button>
      )}
    </div>
  )
}
