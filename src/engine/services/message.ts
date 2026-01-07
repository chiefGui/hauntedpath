// Beat item types - discriminated union for timeline items
export const BeatItemKind = {
  Message: 'message',
  Event: 'event',
} as const

export type BeatItemKind = (typeof BeatItemKind)[keyof typeof BeatItemKind]

// Message: something a character says (chat bubble)
export type MessageItem = {
  kind: typeof BeatItemKind.Message
  id: string
  sender: string
  content: string
  delay?: number
  at?: string // e.g., "2:47 AM", "+5m" - overrides beat's at
}

// Event: narrative happening (centered text, not a bubble)
export type EventItem = {
  kind: typeof BeatItemKind.Event
  id: string
  content: string
  delay?: number
  at?: string // e.g., "2:47 AM", "+5m" - overrides beat's at
}

// Union type for beat items
export type BeatItem = MessageItem | EventItem

// Runtime status for displayed messages
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

// Displayed item - what appears in the chat (runtime state)
export type DisplayedMessage = {
  id: string
  itemId: string
  kind: typeof BeatItemKind.Message
  sender: string
  content: string
  timestamp: number // runtime timestamp for ordering
  storyTime?: number // in-story time (parsed from at field)
  status: MessageStatus
}

export type DisplayedEvent = {
  id: string
  itemId: string
  kind: typeof BeatItemKind.Event
  content: string
  timestamp: number // runtime timestamp for ordering
  storyTime?: number // in-story time (parsed from at field)
}

export type DisplayedItem = DisplayedMessage | DisplayedEvent

// Type guards
export function isMessage(item: BeatItem): item is MessageItem {
  return item.kind === BeatItemKind.Message
}

export function isEvent(item: BeatItem): item is EventItem {
  return item.kind === BeatItemKind.Event
}

export function isDisplayedMessage(item: DisplayedItem): item is DisplayedMessage {
  return item.kind === BeatItemKind.Message
}

export function isDisplayedEvent(item: DisplayedItem): item is DisplayedEvent {
  return item.kind === BeatItemKind.Event
}

export class MessageService {
  static createDisplayedMessage(
    item: MessageItem,
    storyTime?: number,
  ): DisplayedMessage {
    return {
      id: crypto.randomUUID(),
      itemId: item.id,
      kind: BeatItemKind.Message,
      sender: item.sender,
      content: item.content,
      timestamp: Date.now(),
      storyTime,
      status: 'delivered',
    }
  }

  static createDisplayedEvent(
    item: EventItem,
    storyTime?: number,
  ): DisplayedEvent {
    return {
      id: crypto.randomUUID(),
      itemId: item.id,
      kind: BeatItemKind.Event,
      content: item.content,
      timestamp: Date.now(),
      storyTime,
    }
  }

  static createDisplayed(item: BeatItem, storyTime?: number): DisplayedItem {
    if (isMessage(item)) {
      return this.createDisplayedMessage(item, storyTime)
    }
    return this.createDisplayedEvent(item, storyTime)
  }

  static createPlayerMessage(content: string, choiceId: string): DisplayedMessage {
    return {
      id: crypto.randomUUID(),
      itemId: `player-${choiceId}`,
      kind: BeatItemKind.Message,
      sender: 'player',
      content,
      timestamp: Date.now(),
      status: 'sent',
    }
  }
}
