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

  // Separate text choices from action choices
  const textChoices = choices.filter((c) => c.type !== ChoiceType.Action)
  const actionChoices = choices.filter((c) => c.type === ChoiceType.Action)

  return (
    <div className="flex flex-col gap-2 p-4 bg-card/80 backdrop-blur-sm border-t border-border">
      {/* Text choices - player messages style */}
      {textChoices.map((choice, index) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => onSelect(choice)}
          disabled={disabled}
          className={cn(
            'w-full px-4 py-3 rounded-2xl text-[15px] font-medium text-left transition-all duration-150',
            'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed',
            'animate-choice-appear',
            'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {choice.text}
        </button>
      ))}

      {/* Action choices - centered like WhatsApp bot buttons */}
      {actionChoices.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {actionChoices.map((choice, index) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelect(choice)}
              disabled={disabled}
              className={cn(
                'px-4 py-2 rounded-full text-[13px] font-medium text-center transition-all duration-150',
                'active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed',
                'animate-choice-appear',
                'bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
              style={{ animationDelay: `${(textChoices.length + index) * 50}ms` }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
