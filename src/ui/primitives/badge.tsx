import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../lib'

const badgeVariants = tv({
  base: 'inline-flex items-center justify-center font-medium',
  variants: {
    variant: {
      default: 'bg-[--color-accent] text-white',
      secondary: 'bg-[--color-surface-secondary] text-[--color-text-primary]',
      success: 'bg-[--color-success] text-white',
      destructive: 'bg-[--color-destructive] text-white',
      outline: 'border border-[--color-surface-tertiary] text-[--color-text-secondary]',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-[10px] rounded',
      md: 'px-2 py-1 text-xs rounded-full',
      lg: 'px-2.5 py-1 text-sm rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type BadgeProps = {
  children: React.ReactNode
  className?: string
} & VariantProps<typeof badgeVariants>

export function Badge({ children, variant, size, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  )
}

export { badgeVariants }
