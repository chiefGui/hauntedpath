import {
  Dialog as AriaDialog,
  DialogDescription as AriaDialogDescription,
  DialogDismiss as AriaDialogDismiss,
  DialogHeading as AriaDialogHeading,
  type DialogStore,
  useDialogStore,
} from '@ariakit/react'
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
} from 'react'
import { cn } from '../lib'

const DialogContext = createContext<DialogStore | null>(null)

function useDialogContext() {
  const store = useContext(DialogContext)
  if (!store) {
    throw new Error('Dialog components must be used within a Dialog.Root')
  }
  return store
}

export type DialogRootProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

function DialogRoot({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}: DialogRootProps) {
  const store = useDialogStore({
    open,
    setOpen: onOpenChange,
    defaultOpen,
  })

  return (
    <DialogContext.Provider value={store}>{children}</DialogContext.Provider>
  )
}

export type DialogTriggerProps = ComponentPropsWithoutRef<'button'>

function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  const store = useDialogContext()

  return (
    <button type="button" onClick={() => store.show()} {...props}>
      {children}
    </button>
  )
}

export type DialogContentProps = ComponentPropsWithoutRef<typeof AriaDialog>

function DialogContent({ children, className, ...props }: DialogContentProps) {
  const store = useDialogContext()

  return (
    <AriaDialog
      store={store}
      backdrop={
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />
      }
      className={cn(
        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-[calc(100%-2rem)] max-w-sm',
        'bg-[--color-surface-elevated] rounded-2xl p-6',
        'shadow-xl',
        'animate-in fade-in zoom-in-95 duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </AriaDialog>
  )
}

export type DialogHeaderProps = ComponentPropsWithoutRef<'div'>

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div className={cn('mb-4', className)} {...props} />
}

export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof AriaDialogHeading
>

function DialogTitle({ className, ...props }: DialogTitleProps) {
  const store = useDialogContext()

  return (
    <AriaDialogHeading
      store={store}
      className={cn(
        'text-lg font-semibold text-[--color-text-primary]',
        className,
      )}
      {...props}
    />
  )
}

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof AriaDialogDescription
>

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  const store = useDialogContext()

  return (
    <AriaDialogDescription
      store={store}
      className={cn('text-sm text-[--color-text-secondary] mt-1', className)}
      {...props}
    />
  )
}

export type DialogFooterProps = ComponentPropsWithoutRef<'div'>

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div className={cn('mt-6 flex gap-3 justify-end', className)} {...props} />
  )
}

export type DialogCloseProps = ComponentPropsWithoutRef<
  typeof AriaDialogDismiss
>

function DialogClose({ children, className, ...props }: DialogCloseProps) {
  const store = useDialogContext()

  return (
    <AriaDialogDismiss store={store} className={className} {...props}>
      {children}
    </AriaDialogDismiss>
  )
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
}

export { useDialogStore, useDialogContext }
