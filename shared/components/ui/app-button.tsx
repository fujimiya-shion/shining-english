import * as React from 'react'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
type ButtonVariant = VariantProps<typeof buttonVariants>['variant']

type AppButtonVariant = ButtonVariant | 'primary' | 'main' | 'outlineGradient' | 'fillGradient'

type AppButtonProps = Omit<React.ComponentProps<typeof Button>, 'variant'> & {
  variant?: AppButtonVariant | null
}

const mapVariant = (variant?: AppButtonVariant | null): ButtonVariant => {
  if (!variant || variant === 'primary' || variant === 'main') {
    return 'default'
  }
  return variant
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    const shouldShine = variant === 'outlineGradient' || variant === 'fillGradient'
    return (
      <Button
        ref={ref}
        variant={mapVariant(variant)}
        className={cn(shouldShine && 'app-button-glossy', className)}
        {...props}
      />
    )
  }
)

AppButton.displayName = 'AppButton'

export { AppButton }
