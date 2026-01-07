import { useEffect, useState } from 'react'
import type { Campaign, SavedGame } from '../../engine'
import { getAllSavedGames } from '../../engine'
import { CampaignCard } from '../components'

export type HomeScreenProps = {
  campaigns: Campaign[]
  onSelectCampaign: (campaign: Campaign) => void
}

export function HomeScreen({ campaigns, onSelectCampaign }: HomeScreenProps) {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([])

  useEffect(() => {
    getAllSavedGames().then(setSavedGames)
  }, [])

  const getSavedGame = (campaignId: string) =>
    savedGames.find((sg) => sg.campaignId === campaignId) ?? null

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-12 pb-4 bg-[--color-surface]">
        <h1 className="text-3xl font-bold">Stories</h1>
        <p className="text-sm text-[--color-text-secondary] mt-1">
          Choose your nightmare
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              savedGame={getSavedGame(campaign.id)}
              onSelect={onSelectCampaign}
            />
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="flex items-center justify-center h-48 text-[--color-text-secondary]">
            No stories available
          </div>
        )}
      </div>
    </div>
  )
}
