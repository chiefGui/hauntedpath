import { motion, AnimatePresence } from 'framer-motion'
import type { Campaign, IncomingMessageEvent } from '../../engine'
import { CampaignService } from '../../engine'
import { Avatar } from '../primitives'

export type MessageNotificationProps = {
  campaign: Campaign
  notifications: IncomingMessageEvent[]
  onTap: (conversationId: string, notificationId: string) => void
}

export function MessageNotification({
  campaign,
  notifications,
  onTap,
}: MessageNotificationProps) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            campaign={campaign}
            notification={notification}
            index={index}
            onTap={onTap}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

type NotificationItemProps = {
  campaign: Campaign
  notification: IncomingMessageEvent
  index: number
  onTap: (conversationId: string, notificationId: string) => void
}

function NotificationItem({
  campaign,
  notification,
  index,
  onTap,
}: NotificationItemProps) {
  const character = CampaignService.getCharacter(campaign, notification.sender)
  const conversationName = CampaignService.getConversationDisplayName(
    campaign,
    notification.conversationId,
  )

  return (
    <motion.div
      layout
      initial={{ y: -100, opacity: 0, scale: 0.9 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      exit={{
        y: -100,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2, ease: 'easeIn' },
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 350,
        mass: 0.8,
      }}
      style={{
        zIndex: 100 - index, // Oldest notifications on top
      }}
      className="pointer-events-auto"
    >
      <button
        type="button"
        onClick={() => onTap(notification.conversationId, notification.id)}
        className="w-full flex items-center gap-3 p-3 bg-card border border-border rounded-xl shadow-lg active:scale-[0.98] transition-transform"
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
            {notification.content}
          </p>
        </div>
        <div className="shrink-0 text-xs text-muted-foreground">now</div>
      </button>
    </motion.div>
  )
}
