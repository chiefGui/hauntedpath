import { Button as AriaButton } from '@ariakit/react'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../lib'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
      ghost: 'bg-transparent text-primary hover:bg-secondary',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
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
