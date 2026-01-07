import { useEffect, useState, type ReactNode } from 'react'
import { applyAccentColor, getSettings } from '../../engine'

type SettingsInitializerProps = {
  children: ReactNode
}

export function SettingsInitializer({ children }: SettingsInitializerProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function init() {
      try {
        const settings = await getSettings()
        applyAccentColor(settings.accentColor)
      } catch {
        // Ignore errors, use CSS defaults
      } finally {
        setReady(true)
      }
    }
    init()
  }, [])

  // Render immediately - the color will be applied as soon as settings load
  // This avoids a flash of content
  if (!ready) {
    return null
  }

  return <>{children}</>
}
