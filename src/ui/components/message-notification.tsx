import { motion, AnimatePresence } from 'framer-motion'
import type { Campaign, IncomingMessageEvent } from '../../engine'
import { CampaignService } from '../../engine'
import { Avatar } from '../primitives'

export type MessageNotificationProps = {
  campaign: Campaign
  message: IncomingMessageEvent | null
  onTap: (conversationId: string) => void
}

export function MessageNotification({
  campaign,
  message,
  onTap,
}: MessageNotificationProps) {
  if (!message) return null

  const character = CampaignService.getCharacter(campaign, message.sender)
  const conversationName = CampaignService.getConversationDisplayName(
    campaign,
    message.conversationId,
  )

  return (
    <AnimatePresence>
      {message && (
        <motion.button
          type="button"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={() => onTap(message.conversationId)}
          className="fixed top-4 left-4 right-4 z-50 flex items-center gap-3 p-3 bg-card border border-border rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          <Avatar
            src={character?.avatar}
            alt={character?.name ?? 'Unknown'}
            fallback={character?.name ?? '?'}
            size="md"
          />
          <div className="flex-1 min-w-0 text-left">
            <p className="font-semibold text-sm truncate">{conversationName}</p>
            <p className="text-sm text-muted-foreground truncate">
              {message.content}
            </p>
          </div>
          <div className="shrink-0 text-xs text-muted-foreground">now</div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
