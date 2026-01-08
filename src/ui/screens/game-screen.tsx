import { useState } from 'react'
import type { Campaign } from '../../engine'
import { CampaignService, useGame, useSettings } from '../../engine'
import {
  CampaignMenu,
  ChatView,
  ConversationList,
  MessageNotification,
  TopBar,
} from '../components'
import { Button } from '../primitives'

export type GameScreenProps = {
  campaign: Campaign
  onBack: () => void
}

type ViewState = 'chat' | 'conversations'

export function GameScreen({ campaign, onBack }: GameScreenProps) {
  const {
    state,
    isLoading,
    isProcessing,
    isMultiChat,
    isEnding,
    currentConversationState,
    currentConversationId,
    notifications,
    handleChoice,
    switchConversation,
    restart,
    getPresence,
    getUnreadCount,
  } = useGame(campaign)
  const { accentColor, setAccentColor } = useSettings()
  const [menuOpen, setMenuOpen] = useState(false)
  const [viewState, setViewState] = useState<ViewState>('chat')

  if (isLoading || !state) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  // Determine which characters to show based on mode
  const currentConversation = isMultiChat && currentConversationId
    ? CampaignService.getConversation(campaign, currentConversationId)
    : null

  const conversationCharacters = isMultiChat && currentConversationId
    ? CampaignService.getConversationCharacters(campaign, currentConversationId)
    : campaign.characters

  const primaryCharacter = conversationCharacters[0]
  const presence = primaryCharacter ? getPresence(primaryCharacter.id) : null

  // Handle back button
  const handleBackPress = () => {
    if (isMultiChat && viewState === 'chat') {
      // In multi-chat mode, go to conversation list first
      setViewState('conversations')
    } else {
      // Exit to home
      onBack()
    }
  }

  // Handle conversation selection from list
  const handleSelectConversation = (conversationId: string) => {
    switchConversation(conversationId)
    setViewState('chat')
  }

  // Handle notification tap
  const handleNotificationTap = (conversationId: string, notificationId: string) => {
    switchConversation(conversationId, notificationId)
    setViewState('chat')
  }

  // Multi-chat: Show conversation list view
  if (isMultiChat && viewState === 'conversations' && state.conversationStates) {
    return (
      <div className="flex flex-col h-full">
        {/* Back button header */}
        <div className="flex items-center h-14 px-2 bg-card border-b border-border">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="shrink-0 -ml-1"
          >
            <svg
              width="10"
              height="18"
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
          </Button>
          <span className="ml-2 text-primary font-medium">Back</span>
        </div>

        <ConversationList
          campaign={campaign}
          conversationStates={state.conversationStates}
          currentConversationId={currentConversationId}
          getPresence={getPresence}
          getUnreadCount={getUnreadCount}
          onSelectConversation={handleSelectConversation}
        />

        <MessageNotification
          campaign={campaign}
          notifications={notifications}
          onTap={handleNotificationTap}
        />
      </div>
    )
  }

  // Chat view (single-chat mode or selected conversation)
  return (
    <div className="flex flex-col h-full">
      <TopBar
        characters={conversationCharacters}
        isGroup={currentConversation?.isGroup ?? campaign.isGroup}
        isTyping={currentConversationState?.isTyping ?? state.isTyping}
        presence={presence}
        onBack={handleBackPress}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <ChatView
        campaign={campaign}
        state={state}
        onChoiceSelect={handleChoice}
        conversationState={currentConversationState}
        conversationCharacters={conversationCharacters}
      />

      {isEnding && !isProcessing && !(currentConversationState?.isTyping ?? state.isTyping) && (
        <div className="flex flex-col gap-3 p-4 bg-card border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            End of story
          </p>
          <div className="flex gap-2">
            <Button onClick={restart} variant="secondary" className="flex-1">
              Play Again
            </Button>
            <Button onClick={onBack} variant="ghost" className="flex-1">
              Back to Stories
            </Button>
          </div>
        </div>
      )}

      <CampaignMenu
        protagonist={campaign.protagonist}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        accentColor={accentColor}
        onAccentColorChange={setAccentColor}
      />

      <MessageNotification
        campaign={campaign}
        notifications={notifications}
        onTap={handleNotificationTap}
      />
    </div>
  )
}
