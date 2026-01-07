import { useEffect, useState } from 'react'
import type { Campaign, SavedGame } from '../../engine'
import { deleteGame, getAllSavedGames } from '../../engine'
import { CampaignDetailSheet } from '../components'
import { Badge } from '../primitives'
import { cn } from '../lib'

export type HomeScreenProps = {
  campaigns: Campaign[]
  onSelectCampaign: (campaign: Campaign) => void
}

export function HomeScreen({ campaigns, onSelectCampaign }: HomeScreenProps) {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  )

  useEffect(() => {
    getAllSavedGames().then(setSavedGames)
  }, [])

  const getSavedGame = (campaignId: string) =>
    savedGames.find((sg) => sg.campaignId === campaignId) ?? null

  const featuredCampaign = campaigns[0]
  const otherCampaigns = campaigns.slice(1)

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
  }

  const handlePlay = (campaign: Campaign) => {
    setSelectedCampaign(null)
    onSelectCampaign(campaign)
  }

  const handleStartOver = async (campaign: Campaign) => {
    await deleteGame(campaign.id)
    setSavedGames((prev) => prev.filter((sg) => sg.campaignId !== campaign.id))
    setSelectedCampaign(null)
    onSelectCampaign(campaign)
  }

  const handleCloseSheet = () => {
    setSelectedCampaign(null)
  }

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Hero Section */}
      {featuredCampaign && (
        <button
          type="button"
          onClick={() => handleCampaignClick(featuredCampaign)}
          className="relative w-full aspect-[3/4] max-h-[70vh] overflow-hidden group"
        >
          {/* Background Image */}
          <img
            src={featuredCampaign.coverImage}
            alt={featuredCampaign.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-100"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent h-32" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 text-left">
            {/* Badge */}
            {getSavedGame(featuredCampaign.id) && (
              <Badge className="mb-3 bg-white/10 backdrop-blur-md text-white border-0">
                In Progress
              </Badge>
            )}

            {/* Meta info */}
            {featuredCampaign.meta && (
              <div className="flex items-center gap-2 mb-2">
                {featuredCampaign.meta.genre.slice(0, 2).map((g, i) => (
                  <span
                    key={g}
                    className="text-xs font-medium text-white/60 uppercase tracking-wider"
                  >
                    {g}
                    {i < Math.min(featuredCampaign.meta!.genre.length, 2) - 1 && (
                      <span className="ml-2 text-white/30">|</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-lg">
              {featuredCampaign.title}
            </h1>

            {/* Description */}
            <p className="text-sm text-white/70 line-clamp-2 max-w-[85%] leading-relaxed">
              {featuredCampaign.description}
            </p>

            {/* Play hint */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/20 transition-transform group-active:scale-95">
                <svg
                  className="w-5 h-5 text-black ml-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white/90">
                Tap to view
              </span>
            </div>
          </div>
        </button>
      )}

      {/* More Stories Section */}
      {otherCampaigns.length > 0 && (
        <div className="px-5 py-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            More Stories
          </h2>
          <div className="space-y-4">
            {otherCampaigns.map((campaign) => (
              <CampaignRow
                key={campaign.id}
                campaign={campaign}
                savedGame={getSavedGame(campaign.id)}
                onClick={() => handleCampaignClick(campaign)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {campaigns.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">No stories available</p>
        </div>
      )}

      {/* Detail Sheet */}
      <CampaignDetailSheet
        campaign={selectedCampaign}
        savedGame={selectedCampaign ? getSavedGame(selectedCampaign.id) : null}
        onPlay={handlePlay}
        onStartOver={handleStartOver}
        onClose={handleCloseSheet}
      />
    </div>
  )
}

type CampaignRowProps = {
  campaign: Campaign
  savedGame: SavedGame | null
  onClick: () => void
}

function CampaignRow({ campaign, savedGame, onClick }: CampaignRowProps) {
  const hasProgress = !!savedGame

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex gap-4 p-3 -mx-3 rounded-2xl',
        'transition-all duration-200',
        'hover:bg-card/50 active:bg-card active:scale-[0.98]',
        'text-left group'
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-28 aspect-[16/10] rounded-xl overflow-hidden shrink-0">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-black ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-start gap-2">
          <h3 className="font-semibold text-foreground truncate flex-1">
            {campaign.title}
          </h3>
          {hasProgress && (
            <Badge
              variant="secondary"
              size="sm"
              className="shrink-0 bg-primary/15 text-primary"
            >
              In Progress
            </Badge>
          )}
        </div>

        {campaign.meta && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {campaign.meta.duration}
            </span>
            {campaign.meta.rating && (
              <>
                <span className="text-muted-foreground/30">|</span>
                <span className="text-xs text-muted-foreground">
                  {campaign.meta.rating}
                </span>
              </>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-snug">
          {campaign.description}
        </p>
      </div>
    </button>
  )
}
