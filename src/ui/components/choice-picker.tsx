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
    <div className="flex flex-col gap-2 p-4 bg-card/80 backdrop-blur-sm border-t border-border">
      {choices.map((choice, index) => {
        const isAction = choice.type === ChoiceType.Action

        return (
          <button
            key={choice.id}
            type="button"
            onClick={() => onSelect(choice)}
            disabled={disabled}
            className={cn(
              'w-full px-4 py-3 rounded-2xl text-[15px] font-medium text-left transition-all duration-150',
              'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed',
              'animate-choice-appear',
              isAction
                ? 'border border-border bg-transparent text-muted-foreground italic hover:bg-secondary/50'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {isAction ? `→ ${choice.text}` : choice.text}
          </button>
        )
      })}
    </div>
  )
}
