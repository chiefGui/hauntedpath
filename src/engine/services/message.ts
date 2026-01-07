export const MessageType = {
  Text: 'text',
  Image: 'image',
  System: 'system',
} as const

export type MessageType = (typeof MessageType)[keyof typeof MessageType]

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

export type Message = {
  id: string
  sender: string
  type: MessageType
  content: string
  delay?: number
}

export type DisplayedMessage = {
  id: string
  messageId: string
  sender: string
  type: MessageType
  content: string
  timestamp: number
  status: MessageStatus
}

export class MessageService {
  static createDisplayed(message: Message): DisplayedMessage {
    return {
      id: crypto.randomUUID(),
      messageId: message.id,
      sender: message.sender,
      type: message.type,
      content: message.content,
      timestamp: Date.now(),
      status: 'delivered',
    }
  }

  static createPlayerMessage(content: string, choiceId: string): DisplayedMessage {
    return {
      id: crypto.randomUUID(),
      messageId: `player-${choiceId}`,
      sender: 'player',
      type: MessageType.Text,
      content,
      timestamp: Date.now(),
      status: 'sent',
    }
  }
}
