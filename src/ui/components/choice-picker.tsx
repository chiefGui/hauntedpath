import type { Choice } from '../../engine'
import { Button } from '../primitives'

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
    <div className="flex flex-col gap-2 p-4 bg-[--color-surface-elevated] border-t border-[--color-surface-tertiary]">
      {choices.map((choice) => (
        <Button
          key={choice.id}
          onClick={() => onSelect(choice)}
          disabled={disabled}
          variant="ghost"
          className="w-full justify-start text-left"
        >
          {choice.text}
        </Button>
      ))}
    </div>
  )
}
