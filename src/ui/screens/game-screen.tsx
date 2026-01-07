import type { Campaign } from '../../engine'
import { useGame } from '../../engine'
import { ChatView, ChoicePicker, TopBar } from '../components'
import { Button } from '../primitives'

export type GameScreenProps = {
  campaign: Campaign
  onBack: () => void
}

export function GameScreen({ campaign, onBack }: GameScreenProps) {
  const { state, isLoading, choices, isEnding, handleChoice, restart } =
    useGame(campaign)

  if (isLoading || !state) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar
        characters={campaign.characters}
        isGroup={campaign.isGroup}
        isTyping={state.isTyping}
        onBack={onBack}
      />

      <ChatView campaign={campaign} state={state} />

      {isEnding ? (
        <div className="flex flex-col gap-3 p-4 bg-card border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            End of story
          </p>
          <div className="flex gap-2">
            <Button onClick={restart} variant="secondary" className="flex-1">
              Play Again
            </Button>
            <Button onClick={onBack} variant="ghost" className="flex-1">
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
