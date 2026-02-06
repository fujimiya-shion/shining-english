import * as React from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'

type ButtonVariant = VariantProps<typeof buttonVariants>['variant']

type AppButtonVariant = ButtonVariant | 'primary' | 'main'

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
  ({ variant = 'primary', ...props }, ref) => {
    return <Button ref={ref} variant={mapVariant(variant)} {...props} />
  }
)

AppButton.displayName = 'AppButton'

export { AppButton }
