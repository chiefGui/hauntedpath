import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../lib'

const badgeVariants = tv({
  base: 'inline-flex items-center justify-center font-medium',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      success: 'bg-success text-success-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border border-border text-muted-foreground',
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
