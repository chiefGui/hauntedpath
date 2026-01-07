import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { AccentColor, AccentColorConfig, Character } from '../../engine'
import { accentColors, clearAllData } from '../../engine'
import { Avatar, Button, Drawer } from '../primitives'
import { cn } from '../lib'

type CampaignMenuProps = {
  protagonist: Character
  open: boolean
  onOpenChange: (open: boolean) => void
  accentColor: AccentColor
  onAccentColorChange: (color: AccentColor) => void
}

type Panel = 'main' | 'settings'

export function CampaignMenu({
  protagonist,
  open,
  onOpenChange,
  accentColor,
  onAccentColorChange,
}: CampaignMenuProps) {
  const [currentPanel, setCurrentPanel] = useState<Panel>('main')

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen)
    if (!isOpen) {
      // Reset to main panel when closing
      setTimeout(() => setCurrentPanel('main'), 200)
    }
  }

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange}>
      <Drawer.Content side="right">
        <div className="relative h-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {currentPanel === 'main' && (
              <MainPanel
                key="main"
                protagonist={protagonist}
                onSettingsClick={() => setCurrentPanel('settings')}
                onClose={() => handleOpenChange(false)}
              />
            )}
            {currentPanel === 'settings' && (
              <SettingsPanel
                key="settings"
                accentColor={accentColor}
                onAccentColorChange={onAccentColorChange}
                onBack={() => setCurrentPanel('main')}
              />
            )}
          </AnimatePresence>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}

type MainPanelProps = {
  protagonist: Character
  onSettingsClick: () => void
  onClose: () => void
}

function MainPanel({ protagonist, onSettingsClick, onClose }: MainPanelProps) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="flex flex-col h-full absolute inset-0"
    >
      <Drawer.Header>
        <Drawer.Title>Menu</Drawer.Title>
        <Drawer.Close onClick={onClose} />
      </Drawer.Header>

      <Drawer.Body className="flex flex-col">
        {/* Character Card - Clean and minimal */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-secondary/60 to-secondary/30 border border-border/50">
          <Avatar
            src={protagonist.avatar}
            alt={protagonist.name}
            fallback={protagonist.name}
            size="xl"
            className="ring-2 ring-primary/30"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate text-lg">
              {protagonist.name}
            </p>
            {protagonist.age && (
              <p className="text-sm text-muted-foreground">
                {protagonist.age} years old
              </p>
            )}
            {protagonist.bio && (
              <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
                {protagonist.bio}
              </p>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Settings at the bottom */}
        <div className="pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={onSettingsClick}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl',
              'bg-secondary/40 hover:bg-secondary/60',
              'transition-all duration-150 active:scale-[0.98]',
              'text-left group',
            )}
          >
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="flex-1 font-medium">Settings</span>
            <svg
              width="8"
              height="14"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
            >
              <path
                d="M1 1L9 9L1 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </Drawer.Body>
    </motion.div>
  )
}

type SettingsPanelProps = {
  accentColor: AccentColor
  onAccentColorChange: (color: AccentColor) => void
  onBack: () => void
}

function SettingsPanel({
  accentColor,
  onAccentColorChange,
  onBack,
}: SettingsPanelProps) {
  const [isClearing, setIsClearing] = useState(false)

  const handleClearData = async () => {
    setIsClearing(true)
    try {
      await clearAllData()
      window.location.reload()
    } catch {
      setIsClearing(false)
    }
  }

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="flex flex-col h-full absolute inset-0"
    >
      <Drawer.Header>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors -ml-1 active:scale-95"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L1 9L9 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm">Back</span>
        </button>
        <Drawer.Title>Settings</Drawer.Title>
        <div className="w-10" /> {/* Spacer for alignment */}
      </Drawer.Header>

      <Drawer.Body className="space-y-8">
        {/* Accent Color */}
        <section className="space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Theme Color
          </h3>
          <div className="flex flex-wrap gap-4 justify-start">
            {accentColors.map((color) => (
              <ColorOrb
                key={color.id}
                color={color}
                isSelected={accentColor === color.id}
                onSelect={() => onAccentColorChange(color.id)}
              />
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4 pt-4 border-t border-border/50">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Data
          </h3>
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={handleClearData}
            disabled={isClearing}
          >
            {isClearing ? 'Clearing...' : 'Clear All Data'}
          </Button>
          <p className="text-xs text-muted-foreground/60">
            Removes all saved progress and settings.
          </p>
        </section>
      </Drawer.Body>
    </motion.div>
  )
}

type ColorOrbProps = {
  color: AccentColorConfig
  isSelected: boolean
  onSelect: () => void
}

function ColorOrb({ color, isSelected, onSelect }: ColorOrbProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full',
          'transition-all duration-200',
          'shadow-lg',
          isSelected
            ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-card'
            : 'hover:scale-105 active:scale-95',
        )}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color.primary}, ${color.accentHover})`,
          boxShadow: isSelected
            ? `0 0 20px ${color.primary}`
            : `0 4px 12px rgba(0,0,0,0.3)`,
        }}
      />
      <span
        className={cn(
          'text-xs font-medium transition-colors',
          isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
        )}
      >
        {color.name}
      </span>
    </button>
  )
}
