import { Button as AriaButton } from '@ariakit/react'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../lib'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        'bg-[--color-accent] text-white hover:bg-[--color-accent-hover] active:bg-[--color-accent-hover]',
      secondary:
        'bg-[--color-surface-secondary] text-[--color-text-primary] hover:bg-[--color-surface-tertiary] active:bg-[--color-surface-tertiary]',
      ghost:
        'bg-transparent text-[--color-accent] hover:bg-[--color-surface-secondary] active:bg-[--color-surface-secondary]',
      destructive:
        'bg-[--color-destructive] text-white hover:opacity-90 active:opacity-90',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-[15px]',
      lg: 'px-5 py-3 text-base',
      icon: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
})

export type ButtonProps = ComponentPropsWithoutRef<typeof AriaButton> &
  VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, size, className, ...props }, ref) {
    return (
      <AriaButton
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

export { buttonVariants }
