import * as React from 'react'

import { Button, buttonVariants } from '@/components/ui/button'

type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>['variant']

type AppButtonVariant = ButtonVariant | 'primary' | 'main'

type AppButtonProps = React.ComponentProps<typeof Button> & {
  variant?: AppButtonVariant
}

const mapVariant = (variant?: AppButtonVariant): ButtonVariant => {
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
