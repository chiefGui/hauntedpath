import { useState } from 'react'
import type { Campaign } from '../engine'
import { campaigns } from '../game/campaigns'
import { HomeScreen, GameScreen } from './screens'

type Screen = { type: 'home' } | { type: 'game'; campaign: Campaign }

export function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' })

  const handleSelectCampaign = (campaign: Campaign) => {
    setScreen({ type: 'game', campaign })
  }

  const handleBack = () => {
    setScreen({ type: 'home' })
  }

  return (
    <div className="h-full max-w-md mx-auto bg-[--color-surface]">
      {screen.type === 'home' && (
        <HomeScreen
          campaigns={campaigns}
          onSelectCampaign={handleSelectCampaign}
        />
      )}
      {screen.type === 'game' && (
        <GameScreen campaign={screen.campaign} onBack={handleBack} />
      )}
    </div>
  )
}
