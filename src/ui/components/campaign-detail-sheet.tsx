import { useEffect, useState } from 'react'
import type { Campaign, SavedGame } from '../../engine'
import { Avatar, Badge, Button } from '../primitives'
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
  const protagonist = campaign?.protagonist

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[92vh]',
          'bg-gradient-to-b from-card/95 to-background/98 backdrop-blur-2xl',
          'rounded-t-3xl',
          'transition-transform duration-300 ease-out',
          'flex flex-col overflow-hidden',
          isVisible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* Cover Image with Gradient - Fixed */}
        <div className="relative h-56 shrink-0 overflow-hidden">
          <img
            src={campaign?.coverImage}
            alt={campaign?.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-card/30 via-transparent to-card/30" />

          {/* Close button */}
          <button
            type="button"
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
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {campaign?.title}
            </h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 pb-8 pt-3">
            {/* Meta row - compact */}
            {meta && (
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {meta.year && (
                  <span className="text-sm text-muted-foreground">
                    {meta.year}
                  </span>
                )}
                {meta.rating && (
                  <Badge variant="outline" className="text-[11px] px-1.5 py-0">
                    {meta.rating}
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  {meta.duration}
                </span>
                {hasProgress && (
                  <Badge className="bg-primary/20 text-primary border-0 text-[11px]">
                    In Progress
                  </Badge>
                )}
              </div>
            )}

            {/* Genre tags - compact */}
            {meta?.genre && (
              <div className="flex gap-2 mb-4">
                {meta.genre.map((g, i) => (
                  <span
                    key={g}
                    className="text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider"
                  >
                    {g}
                    {i < meta.genre.length - 1 && (
                      <span className="ml-2 text-muted-foreground/30">·</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-[15px] text-foreground/90 leading-relaxed mb-5">
              {meta?.longDescription || campaign?.description}
            </p>

            {/* Protagonist - subtle inline */}
            {protagonist && (
              <div className="flex items-center gap-2.5 mb-6 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50">Play as</span>
                <Avatar
                  src={protagonist.avatar}
                  alt={protagonist.name}
                  fallback={protagonist.name}
                  size="xs"
                />
                <span className="text-foreground font-medium">
                  {protagonist.name}
                </span>
                {protagonist.age && (
                  <span className="text-muted-foreground/60">
                    {protagonist.age}
                  </span>
                )}
              </div>
            )}

            {/* Play button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full h-13 text-base font-semibold rounded-2xl bg-white text-black hover:bg-white/90 transition-all active:scale-[0.98]"
              onClick={handlePlay}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
              {hasProgress ? 'Continue' : 'Play'}
            </Button>

            {hasProgress && (
              <Button
                variant="ghost"
                size="md"
                className="w-full mt-2 text-muted-foreground"
                onClick={handlePlay}
              >
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
