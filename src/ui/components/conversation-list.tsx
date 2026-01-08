import type {
  Campaign,
  CharacterPresence,
  ConversationState,
} from '../../engine'
import { CampaignService, isDisplayedMessage } from '../../engine'
import { Avatar, Badge } from '../primitives'

export type ConversationListProps = {
  campaign: Campaign
  conversationStates: Record<string, ConversationState>
  currentConversationId?: string
  getPresence: (characterId: string) => CharacterPresence | null
  getUnreadCount: (conversationId: string) => number
  onSelectConversation: (conversationId: string) => void
}

export function ConversationList({
  campaign,
  conversationStates,
  currentConversationId,
  getPresence,
  getUnreadCount,
  onSelectConversation,
}: ConversationListProps) {
  const conversations = campaign.conversations ?? []

  // Sort conversations by last message time (most recent first)
  const sortedConversations = [...conversations].sort((a, b) => {
    const aState = conversationStates[a.id]
    const bState = conversationStates[b.id]
    const aTime = aState?.lastMessageAt ?? 0
    const bTime = bState?.lastMessageAt ?? 0
    return bTime - aTime
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.map((conversation) => {
          const characters = CampaignService.getConversationCharacters(
            campaign,
            conversation.id,
          )
          const primaryCharacter = characters[0]
          const displayName = CampaignService.getConversationDisplayName(
            campaign,
            conversation.id,
          )
          const convState = conversationStates[conversation.id]
          const unreadCount = getUnreadCount(conversation.id)

          // Get last message for preview
          const lastMessage = convState?.displayedItems
            .filter(isDisplayedMessage)
            .slice(-1)[0]
          const lastMessagePreview = lastMessage?.content ?? 'No messages yet'
          const lastMessageSender =
            lastMessage?.sender === 'player'
              ? 'You'
              : (CampaignService.getCharacter(campaign, lastMessage?.sender ?? '')
                  ?.name ?? '')

          // Get presence for primary character
          const presence = primaryCharacter
            ? getPresence(primaryCharacter.id)
            : null
          const isOnline = presence?.status === 'online'

          const isActive = conversation.id === currentConversationId

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50 active:bg-secondary ${
                isActive ? 'bg-secondary/30' : ''
              }`}
            >
              {/* Avatar with online indicator */}
              <div className="relative shrink-0">
                {conversation.isGroup ? (
                  <div className="flex -space-x-2">
                    {characters.slice(0, 2).map((char, i) => (
                      <Avatar
                        key={char.id}
                        src={char.avatar}
                        alt={char.name}
                        size="md"
                        className="border-2 border-background"
                        style={{ zIndex: 2 - i }}
                      />
                    ))}
                  </div>
                ) : (
                  <Avatar
                    src={primaryCharacter?.avatar}
                    alt={displayName}
                    fallback={displayName}
                    size="lg"
                  />
                )}
                {isOnline && !conversation.isGroup && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              {/* Name and preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-semibold truncate ${unreadCount > 0 ? 'text-foreground' : 'text-foreground'}`}
                  >
                    {displayName}
                  </span>
                  {convState?.lastMessageAt && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatTime(convState.lastMessageAt)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p
                    className={`text-sm truncate ${unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                  >
                    {lastMessageSender && lastMessageSender !== displayName
                      ? `${lastMessageSender}: `
                      : ''}
                    {lastMessagePreview}
                  </p>
                  {unreadCount > 0 && (
                    <Badge variant="default" className="shrink-0">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'now'
  if (diffMins < 60) return `${diffMins}m`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d`

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
