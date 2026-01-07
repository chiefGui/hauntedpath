import type { CharacterPresence } from './presence'
import type { Choice } from './choice'
import type { BeatItem } from './message'

export type Beat = {
  id: string
  at?: string // e.g., "2:47 AM", "Tuesday, 3:15 AM", "+30m"
  items: BeatItem[]
  choices: Choice[]
  isEnding?: boolean
  presenceChanges?: Record<string, Partial<CharacterPresence>>
}

export class BeatService {
  static get(beats: Record<string, Beat>, beatId: string): Beat | null {
    return beats[beatId] ?? null
  }

  static isEnding(beat: Beat | null): boolean {
    return beat?.isEnding ?? false
  }
}
