import { useEffect, useState } from 'react'
import type { Campaign, SavedGame } from '../../engine'
import { Button, Badge } from '../primitives'
import { cn } from '../lib'

export type CampaignDetailSheetProps = {
  campaign: Campaign | null
  savedGame?: SavedGame | null
  onPlay: (campaign: Campaign) => void
  onClose: () => void
}

export function CampaignDetailSheet({
  campaign,
  savedGame,
  onPlay,
  onClose,
}: CampaignDetailSheetProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (campaign) {
      // Small delay to trigger enter animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
    }
  }, [campaign])

  const handleClose = () => {
    setIsClosing(true)
    setIsVisible(false)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  const handlePlay = () => {
    if (campaign) {
      onPlay(campaign)
    }
  }

  if (!campaign && !isClosing) return null

  const hasProgress = !!savedGame
  const meta = campaign?.meta

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[92vh] overflow-hidden',
          'bg-gradient-to-b from-card/95 to-background/98 backdrop-blur-2xl',
          'rounded-t-3xl',
          'transition-transform duration-300 ease-out',
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Cover Image with Gradient */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={campaign?.coverImage}
            alt={campaign?.title}
            className="w-full h-full object-cover scale-105"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-card/40 via-transparent to-card/40" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L13 13M1 13L13 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {campaign?.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-10 -mt-2">
          {/* Meta badges */}
          {meta && (
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {meta.year && (
                <span className="text-sm text-muted-foreground font-medium">
                  {meta.year}
                </span>
              )}
              {meta.rating && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {meta.rating}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {meta.duration}
              </span>
              {hasProgress && (
                <Badge className="bg-primary/20 text-primary border-0">
                  In Progress
                </Badge>
              )}
            </div>
          )}

          {/* Genre tags */}
          {meta?.genre && (
            <div className="flex gap-2 mb-5 flex-wrap">
              {meta.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs text-muted-foreground/80 font-medium uppercase tracking-wider"
                >
                  {g}
                  {meta.genre.indexOf(g) < meta.genre.length - 1 && (
                    <span className="ml-2 text-muted-foreground/40">|</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-[15px] text-foreground/90 leading-relaxed mb-6">
            {meta?.longDescription || campaign?.description}
          </p>

          {/* Play button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full h-14 text-base font-semibold rounded-2xl bg-white text-black hover:bg-white/90 transition-all active:scale-[0.98]"
            onClick={handlePlay}
          >
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            {hasProgress ? 'Continue' : 'Play'}
          </Button>

          {/* Secondary actions */}
          {hasProgress && (
            <Button
              variant="ghost"
              size="md"
              className="w-full mt-3 text-muted-foreground"
              onClick={handlePlay}
            >
              Start Over
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
