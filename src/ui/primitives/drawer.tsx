import {
  Dialog as AriaDialog,
  type DialogStore,
  useDialogStore,
} from '@ariakit/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
} from 'react'
import { cn } from '../lib'

const DrawerContext = createContext<DialogStore | null>(null)

function useDrawerContext() {
  const store = useContext(DrawerContext)
  if (!store) {
    throw new Error('Drawer components must be used within a Drawer.Root')
  }
  return store
}

export type DrawerRootProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

function DrawerRoot({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}: DrawerRootProps) {
  const store = useDialogStore({
    open,
    setOpen: onOpenChange,
    defaultOpen,
  })

  return (
    <DrawerContext.Provider value={store}>{children}</DrawerContext.Provider>
  )
}

export type DrawerTriggerProps = ComponentPropsWithoutRef<'button'>

function DrawerTrigger({ children, ...props }: DrawerTriggerProps) {
  const store = useDrawerContext()

  return (
    <button type="button" onClick={() => store.show()} {...props}>
      {children}
    </button>
  )
}

export type DrawerContentProps = ComponentPropsWithoutRef<typeof AriaDialog> & {
  side?: 'left' | 'right'
}

function DrawerContent({
  children,
  className,
  side = 'right',
  ...props
}: DrawerContentProps) {
  const store = useDrawerContext()
  const isOpen = store.useState('open')

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not children
    if (e.target === e.currentTarget) {
      store.hide()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <AriaDialog
          store={store}
          backdrop={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
          }
          className="fixed inset-0 z-50 outline-none"
          onClick={handleBackdropClick}
          {...props}
        >
          <motion.div
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'absolute top-0 bottom-0 w-[85%] max-w-sm',
              'bg-card border-l border-border',
              'flex flex-col overflow-hidden',
              side === 'right' ? 'right-0' : 'left-0 border-l-0 border-r',
              className,
            )}
          >
            {children}
          </motion.div>
        </AriaDialog>
      )}
    </AnimatePresence>
  )
}

export type DrawerHeaderProps = ComponentPropsWithoutRef<'div'>

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b border-border',
        className,
      )}
      {...props}
    />
  )
}

export type DrawerTitleProps = ComponentPropsWithoutRef<'h2'>

function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <h2
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

export type DrawerCloseProps = ComponentPropsWithoutRef<'button'>

function DrawerClose({ children, className, ...props }: DrawerCloseProps) {
  const store = useDrawerContext()

  return (
    <button
      type="button"
      onClick={() => store.hide()}
      className={cn(
        'p-2 -mr-2 rounded-full text-muted-foreground hover:text-foreground',
        'transition-colors',
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export type DrawerBodyProps = ComponentPropsWithoutRef<'div'>

function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-4', className)} {...props} />
  )
}

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Close: DrawerClose,
  Body: DrawerBody,
}

export { useDialogStore as useDrawerStore, useDrawerContext }
