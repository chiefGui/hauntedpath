import type { CharacterPresence } from './presence'
import type { Choice } from './choice'
import type { Message } from './message'

export type Beat = {
  id: string
  messages: Message[]
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
