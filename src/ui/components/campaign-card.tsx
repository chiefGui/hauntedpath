import type { Campaign, SavedGame } from '../../engine'
import { Badge } from '../primitives'

export type CampaignCardProps = {
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
    <button
      type="button"
      onClick={() => onSelect(campaign)}
      className="w-full text-left bg-card rounded-2xl overflow-hidden transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {hasProgress && (
          <Badge className="absolute top-3 right-3">In Progress</Badge>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white">{campaign.title}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {campaign.description}
        </p>
      </div>
    </button>
  )
}
