import { createContext, useContext, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../lib'
import { Avatar, type AvatarProps } from './avatar'

const bubbleVariants = tv({
  base: 'px-3 py-2 rounded-2xl text-[15px] leading-snug',
  variants: {
    variant: {
      player: 'bg-primary text-primary-foreground rounded-br-md',
      npc: 'bg-secondary text-foreground rounded-bl-md',
    },
  },
  defaultVariants: {
    variant: 'npc',
  },
})

type BubbleContextValue = {
  variant: 'player' | 'npc'
}

const BubbleContext = createContext<BubbleContextValue | null>(null)

function useBubbleContext() {
  const context = useContext(BubbleContext)
  if (!context) {
    throw new Error('Bubble components must be used within Bubble.Root')
  }
  return context
}

// Root component
export type BubbleRootProps = {
  children: ReactNode
  variant?: 'player' | 'npc'
  className?: string
}

function BubbleRoot({ children, variant = 'npc', className }: BubbleRootProps) {
  return (
    <BubbleContext.Provider value={{ variant }}>
      <div
        className={cn(
          'flex items-end gap-2',
          variant === 'player' ? 'flex-row-reverse' : 'flex-row',
          className,
        )}
      >
        {children}
      </div>
    </BubbleContext.Provider>
  )
}

// Avatar slot
export type BubbleAvatarProps = Omit<AvatarProps, 'size'> & {
  show?: boolean
}

function BubbleAvatar({ show = true, ...props }: BubbleAvatarProps) {
  const { variant } = useBubbleContext()

  if (variant === 'player') return null

  if (!show) {
    return <div className="w-7 shrink-0" />
  }

  return <Avatar size="sm" {...props} />
}

// Content wrapper for vertical stacking (name + bubble + status)
export type BubbleContentProps = {
  children: ReactNode
  className?: string
}

function BubbleContent({ children, className }: BubbleContentProps) {
  const { variant } = useBubbleContext()

  return (
    <div
      className={cn(
        'flex flex-col max-w-[80%]',
        variant === 'player' ? 'items-end' : 'items-start',
        className,
      )}
    >
      {children}
    </div>
  )
}

// Sender name (for group chats)
export type BubbleSenderProps = {
  children: ReactNode
  className?: string
}

function BubbleSender({ children, className }: BubbleSenderProps) {
  const { variant } = useBubbleContext()

  if (variant === 'player') return null

  return (
    <span className={cn('text-xs text-muted-foreground mb-1 ml-3', className)}>
      {children}
    </span>
  )
}

// The actual message bubble
export type BubbleMessageProps = {
  children: ReactNode
  className?: string
} & VariantProps<typeof bubbleVariants>

function BubbleMessage({ children, className }: BubbleMessageProps) {
  const { variant } = useBubbleContext()

  return (
    <div className={cn(bubbleVariants({ variant }), className)}>{children}</div>
  )
}

// Image message
export type BubbleImageProps = {
  src: string
  alt?: string
  className?: string
}

function BubbleImage({
  src,
  alt = 'Shared image',
  className,
}: BubbleImageProps) {
  const { variant } = useBubbleContext()

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'max-w-full rounded-2xl',
        variant === 'player' ? 'rounded-br-md' : 'rounded-bl-md',
        className,
      )}
    />
  )
}

// Status indicator (Sent, Delivered, Read)
export type BubbleStatusProps = {
  status: 'sending' | 'sent' | 'delivered' | 'read'
  className?: string
}

function BubbleStatus({ status, className }: BubbleStatusProps) {
  const { variant } = useBubbleContext()

  if (variant !== 'player') return null

  const label =
    status === 'read'
      ? 'Read'
      : status === 'delivered'
        ? 'Delivered'
        : status === 'sending'
          ? 'Sending...'
          : 'Sent'

  return (
    <span
      className={cn('text-[10px] text-muted-foreground mt-0.5 mr-1', className)}
    >
      {label}
    </span>
  )
}

// System message (different styling, not really a bubble)
export type BubbleSystemProps = {
  children: ReactNode
  className?: string
}

function BubbleSystem({ children, className }: BubbleSystemProps) {
  return (
    <div className={cn('flex justify-center py-2', className)}>
      <span className="text-xs text-muted-foreground italic">
        — {children} —
      </span>
    </div>
  )
}

// Typing indicator dots
export type BubbleTypingProps = {
  className?: string
}

function BubbleTyping({ className }: BubbleTypingProps) {
  return (
    <div
      className={cn(
        'bg-secondary px-4 py-3 rounded-2xl rounded-bl-md',
        className,
      )}
    >
      <div className="flex gap-1">
        <span
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '600ms' }}
        />
        <span
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: '150ms', animationDuration: '600ms' }}
        />
        <span
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: '300ms', animationDuration: '600ms' }}
        />
      </div>
    </div>
  )
}

// Export compound component
export const Bubble = {
  Root: BubbleRoot,
  Avatar: BubbleAvatar,
  Content: BubbleContent,
  Sender: BubbleSender,
  Message: BubbleMessage,
  Image: BubbleImage,
  Status: BubbleStatus,
  System: BubbleSystem,
  Typing: BubbleTyping,
}

export { bubbleVariants }
