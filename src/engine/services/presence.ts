export const ContactStatus = {
  Online: 'online',
  Offline: 'offline',
  Away: 'away',
} as const

export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus]

export type CharacterPresence = {
  status: ContactStatus
  lastSeenAt?: number
}

export class PresenceService {
  static create(status: ContactStatus = ContactStatus.Offline): CharacterPresence {
    const now = Date.now()
    return {
      status,
      lastSeenAt: status === ContactStatus.Offline ? now : undefined,
    }
  }

  static apply(
    current: CharacterPresence,
    changes: Partial<CharacterPresence>,
  ): CharacterPresence {
    const now = Date.now()
    return {
      ...current,
      ...changes,
      lastSeenAt:
        changes.lastSeenAt ??
        (changes.status === ContactStatus.Offline ? now : current.lastSeenAt),
    }
  }

  static setOnline(_current: CharacterPresence): CharacterPresence {
    return { status: ContactStatus.Online, lastSeenAt: undefined }
  }

  static setOffline(_current: CharacterPresence): CharacterPresence {
    return { status: ContactStatus.Offline, lastSeenAt: Date.now() }
  }
}
