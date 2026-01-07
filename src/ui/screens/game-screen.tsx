import { Button } from '@ariakit/react'
import type { Campaign } from '../../engine'
import { useGame } from '../../engine'
import { TopBar, ChatView, ChoicePicker } from '../components'

interface GameScreenProps {
  campaign: Campaign
  onBack: () => void
}

export function GameScreen({ campaign, onBack }: GameScreenProps) {
  const { state, isLoading, choices, isEnding, handleChoice, restart } =
    useGame(campaign)

  if (isLoading || !state) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[--color-text-secondary]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar
        characters={campaign.characters}
        isGroup={campaign.isGroup}
        onBack={onBack}
      />

      <ChatView campaign={campaign} state={state} />

      {isEnding ? (
        <div className="flex flex-col gap-3 p-4 bg-[--color-surface-elevated] border-t border-[--color-surface-tertiary]">
          <p className="text-center text-sm text-[--color-text-secondary]">
            End of story
          </p>
          <div className="flex gap-2">
            <Button
              onClick={restart}
              className="flex-1 px-4 py-3 text-[15px] text-[--color-text-primary] bg-[--color-surface-secondary] rounded-2xl transition-colors hover:bg-[--color-surface-tertiary]"
            >
              Play Again
            </Button>
            <Button
              onClick={onBack}
              className="flex-1 px-4 py-3 text-[15px] text-[--color-accent] bg-[--color-surface-secondary] rounded-2xl transition-colors hover:bg-[--color-surface-tertiary]"
            >
              Back to Stories
            </Button>
          </div>
        </div>
      ) : (
        <ChoicePicker choices={choices} onSelect={handleChoice} />
      )}
    </div>
  )
}
