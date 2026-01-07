import type { ContactStatus } from './presence'

export type Character = {
  id: string
  name: string
  avatar: string
  status?: ContactStatus
  age?: number
  bio?: string
}

export class CharacterService {
  static find(characters: Character[], id: string): Character | null {
    return characters.find((c) => c.id === id) ?? null
  }
}
