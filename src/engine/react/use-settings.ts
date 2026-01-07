import { useCallback, useEffect, useState } from 'react'
import {
  type AccentColor,
  applyAccentColor,
  defaultAccentColor,
  getSettings,
  saveSettings,
} from '../settings'

export function useSettings() {
  const [accentColor, setAccentColorState] = useState<AccentColor>(defaultAccentColor)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const settings = await getSettings()
        setAccentColorState(settings.accentColor)
        applyAccentColor(settings.accentColor)
      } catch {
        // Fall back to default on error
        applyAccentColor(defaultAccentColor)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const setAccentColor = useCallback(async (color: AccentColor) => {
    setAccentColorState(color)
    applyAccentColor(color)
    await saveSettings({ accentColor: color })
  }, [])

  return {
    accentColor,
    setAccentColor,
    isLoading,
  }
}
