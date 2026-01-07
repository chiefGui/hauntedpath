import { useState } from 'react'
import type { Campaign } from '../../engine'
import { useGame, useSettings } from '../../engine'
import { CampaignMenu, ChatView, TopBar } from '../components'
import { Button } from '../primitives'

export type GameScreenProps = {
  campaign: Campaign
  onBack: () => void
}

export function GameScreen({ campaign, onBack }: GameScreenProps) {
  const {
    state,
    isLoading,
    isProcessing,
    isEnding,
    handleChoice,
    restart,
    getPresence,
  } = useGame(campaign)
  const { accentColor, setAccentColor } = useSettings()
  const [menuOpen, setMenuOpen] = useState(false)

  if (isLoading || !state) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const primaryCharacter = campaign.characters[0]
  const presence = primaryCharacter ? getPresence(primaryCharacter.id) : null

  return (
    <div className="flex flex-col h-full">
      <TopBar
        characters={campaign.characters}
        isGroup={campaign.isGroup}
        isTyping={state.isTyping}
        presence={presence}
        onBack={onBack}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <ChatView
        campaign={campaign}
        state={state}
        onChoiceSelect={handleChoice}
      />

      {isEnding && !isProcessing && !state.isTyping && (
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
      )}

      <CampaignMenu
        protagonist={campaign.protagonist}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        accentColor={accentColor}
        onAccentColorChange={setAccentColor}
      />
    </div>
  )
}
