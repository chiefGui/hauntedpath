import type { Character } from '../../engine'
import { Bubble } from '../primitives'

export type TypingIndicatorProps = {
  character: Character | null
  showAvatar?: boolean
}

export function TypingIndicator({
  character,
  showAvatar = true,
}: TypingIndicatorProps) {
  return (
    <Bubble.Root variant="npc" className="animate-typing-appear">
      <Bubble.Avatar
        src={character?.avatar}
        alt={character?.name}
        fallback={character?.name}
        show={showAvatar}
      />
      <Bubble.Typing />
    </Bubble.Root>
  )
}
