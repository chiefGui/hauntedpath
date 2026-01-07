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
        <AnimatePresence mode="popLayout" initial={false}>
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
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="flex flex-col h-full"
    >
      <Drawer.Header>
        <Drawer.Title>Menu</Drawer.Title>
        <Drawer.Close onClick={onClose} />
      </Drawer.Header>

      <Drawer.Body className="space-y-6">
        {/* Character Preview */}
        <section className="space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Playing as
          </h3>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50">
            <Avatar
              src={protagonist.avatar}
              alt={protagonist.name}
              fallback={protagonist.name}
              size="xl"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {protagonist.name}
              </p>
              {protagonist.age && (
                <p className="text-sm text-muted-foreground">
                  {protagonist.age} years old
                </p>
              )}
              {protagonist.bio && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {protagonist.bio}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-2">
          <MenuItem
            icon={
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
            }
            label="Settings"
            onClick={onSettingsClick}
            hasChevron
          />
        </section>
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
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="flex flex-col h-full"
    >
      <Drawer.Header>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors -ml-1"
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

      <Drawer.Body className="space-y-6">
        {/* Accent Color */}
        <section className="space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Accent Color
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {accentColors.map((color) => (
              <ColorOption
                key={color.id}
                color={color}
                isSelected={accentColor === color.id}
                onSelect={() => onAccentColorChange(color.id)}
              />
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4 pt-4 border-t border-border">
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

type MenuItemProps = {
  icon: React.ReactNode
  label: string
  onClick: () => void
  hasChevron?: boolean
}

function MenuItem({ icon, label, onClick, hasChevron }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-xl',
        'bg-secondary/50 hover:bg-secondary/70',
        'transition-colors duration-150',
        'text-left',
      )}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1 font-medium">{label}</span>
      {hasChevron && (
        <svg
          width="8"
          height="14"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-muted-foreground"
        >
          <path
            d="M1 1L9 9L1 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

type ColorOptionProps = {
  color: AccentColorConfig
  isSelected: boolean
  onSelect: () => void
}

function ColorOption({ color, isSelected, onSelect }: ColorOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-xl',
        'transition-all duration-150',
        isSelected
          ? 'bg-secondary ring-2 ring-primary'
          : 'bg-secondary/30 hover:bg-secondary/50',
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-full',
          'ring-2 ring-offset-2 ring-offset-card',
          'transition-all duration-150',
          isSelected ? 'ring-white scale-110' : 'ring-transparent',
        )}
        style={{ backgroundColor: color.primary }}
      />
      <span
        className={cn(
          'text-xs font-medium',
          isSelected ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {color.name}
      </span>
    </button>
  )
}
