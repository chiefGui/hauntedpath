import { ChoiceType, type Choice } from '../../engine'
import { cn } from '../lib'

export type ChoicePickerProps = {
  choices: Choice[]
  onSelect?: (choice: Choice) => void
  selectedChoiceId?: string | null
  disabled?: boolean
}

export function ChoicePicker({
  choices,
  onSelect,
  selectedChoiceId = null,
  disabled = false,
}: ChoicePickerProps) {
  if (choices.length === 0) return null

  const hasSelection = selectedChoiceId !== null
  const isInteractive = !hasSelection && onSelect !== undefined

  return (
    <div className="flex justify-end mt-2">
      <div
        className={cn(
          'bg-primary rounded-2xl rounded-br-md overflow-hidden max-w-[85%]',
          !hasSelection && 'animate-choice-appear',
        )}
      >
        {choices.map((choice, index) => {
          const isAction = choice.type === ChoiceType.Action
          const isLast = index === choices.length - 1
          const isSelected = selectedChoiceId === choice.id
          const isFaded = hasSelection && !isSelected

          // Hide non-selected choices when a selection has been made
          if (isFaded) return null

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => isInteractive && onSelect?.(choice)}
              disabled={disabled || hasSelection}
              className={cn(
                'w-full px-4 py-3 text-[15px] text-left transition-colors duration-150',
                'text-primary-foreground',
                isInteractive && 'hover:bg-white/10 active:bg-white/20',
                'disabled:cursor-default',
                !isLast && !hasSelection && 'border-b border-white/20',
                isSelected && 'flex items-center justify-between gap-2',
              )}
            >
              {isAction ? (
                <span className="flex items-center gap-2">
                  <span className="text-primary-foreground/60 text-xs">●</span>
                  <span className="italic">{choice.text}</span>
                </span>
              ) : (
                choice.text
              )}
              {isSelected && (
                <span className="text-primary-foreground/60 text-xs">✓</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
