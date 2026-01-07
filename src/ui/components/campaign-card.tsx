import { Button } from '@ariakit/react'
import type { Campaign, SavedGame } from '../../engine'

interface CampaignCardProps {
  campaign: Campaign
  savedGame?: SavedGame | null
  onSelect: (campaign: Campaign) => void
}

export function CampaignCard({
  campaign,
  savedGame,
  onSelect,
}: CampaignCardProps) {
  const hasProgress = !!savedGame

  return (
    <Button
      onClick={() => onSelect(campaign)}
      className="w-full text-left bg-[--color-surface-elevated] rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Progress indicator */}
        {hasProgress && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-[--color-accent] text-white rounded-full">
            In Progress
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white">{campaign.title}</h3>
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-sm text-[--color-text-secondary] line-clamp-2">
          {campaign.description}
        </p>
      </div>
    </Button>
  )
}
