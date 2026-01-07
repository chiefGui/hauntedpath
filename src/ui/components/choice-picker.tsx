import { ChoiceType, type Choice } from '../../engine'
import { cn } from '../lib'

export type ChoicePickerProps = {
  choices: Choice[]
  onSelect: (choice: Choice) => void
  disabled?: boolean
}

export function ChoicePicker({
  choices,
  onSelect,
  disabled = false,
}: ChoicePickerProps) {
  if (choices.length === 0) return null

  return (
    <div className="flex justify-end p-4 bg-card/80 backdrop-blur-sm border-t border-border">
      <div className="bg-primary rounded-2xl rounded-br-md overflow-hidden animate-choice-appear max-w-[85%]">
        {choices.map((choice, index) => {
          const isAction = choice.type === ChoiceType.Action
          const isLast = index === choices.length - 1

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelect(choice)}
              disabled={disabled}
              className={cn(
                'w-full px-4 py-3 text-[15px] text-left transition-colors duration-150',
                'text-primary-foreground',
                'hover:bg-white/10 active:bg-white/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                !isLast && 'border-b border-white/20',
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
            </button>
          )
        })}
      </div>
    </div>
  )
}
