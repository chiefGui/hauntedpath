import type { CSSProperties } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../lib'

const avatarVariants = tv({
  base: 'relative inline-flex shrink-0 overflow-hidden rounded-full',
  variants: {
    size: {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-7 h-7 text-xs',
      md: 'w-9 h-9 text-sm',
      lg: 'w-11 h-11 text-base',
      xl: 'w-14 h-14 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type AvatarProps = {
  src?: string | null
  alt?: string
  fallback?: string
  className?: string
  style?: CSSProperties
} & VariantProps<typeof avatarVariants>

export function Avatar({
  src,
  alt,
  fallback,
  size,
  className,
  style,
}: AvatarProps) {
  const initials = fallback ?? alt?.charAt(0).toUpperCase() ?? '?'

  return (
    <div className={cn(avatarVariants({ size }), className)} style={style}>
      {src ? (
        <img src={src} alt={alt ?? ''} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground font-medium">
          {initials}
        </div>
      )}
    </div>
  )
}

export { avatarVariants }
