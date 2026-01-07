import type { Character } from '../../engine'
import { Avatar, Button } from '../primitives'

export type TopBarProps = {
  characters: Character[]
  isGroup?: boolean
  groupName?: string
  onBack: () => void
}

export function TopBar({
  characters,
  isGroup = false,
  groupName,
  onBack,
}: TopBarProps) {
  const displayName = isGroup
    ? groupName ?? characters.map((c) => c.name).join(', ')
    : characters[0]?.name ?? 'Unknown'

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[--color-surface-elevated] border-b border-[--color-surface-tertiary]">
      <Button onClick={onBack} variant="ghost" size="icon">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2L2 10L10 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      <div className="relative">
        {isGroup ? (
          <div className="flex -space-x-2">
            {characters.slice(0, 3).map((char, i) => (
              <Avatar
                key={char.id}
                src={char.avatar}
                alt={char.name}
                size="md"
                className="border-2 border-[--color-surface-elevated]"
                style={{ zIndex: 3 - i }}
              />
            ))}
          </div>
        ) : (
          <Avatar
            src={characters[0]?.avatar}
            alt={displayName}
            fallback={displayName}
            size="md"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-[17px] font-semibold truncate">{displayName}</h1>
        {isGroup && (
          <p className="text-xs text-[--color-text-secondary] truncate">
            {characters.length} people
          </p>
        )}
      </div>
    </div>
  )
}
