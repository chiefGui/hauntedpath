import { Button } from '@ariakit/react'
import type { Choice } from '../../engine'

interface ChoicePickerProps {
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
          className="w-full px-4 py-3 text-left text-[15px] text-[--color-accent] bg-[--color-surface-secondary] rounded-2xl transition-colors hover:bg-[--color-surface-tertiary] active:bg-[--color-surface-tertiary] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {choice.text}
        </Button>
      ))}
    </div>
  )
}
