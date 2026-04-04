'use client'

import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'

export function AppConfirmModal({
  open,
  message,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancal,
}: {
  open: boolean
  message?: string
  title: string
  description: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancal?: () => void
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-white p-6 shadow-[0_32px_100px_-55px_rgba(15,23,42,0.8)]">
        {message ? (
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary/80">{message}</p>
        ) : null}
        <h3 className="mt-3 text-2xl font-semibold text-[color:var(--brand-900)]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onCancal}>
            {cancelText}
          </Button>
          <AppButton className="flex-1" onClick={onConfirm}>
            {confirmText}
          </AppButton>
        </div>
      </div>
    </div>
  )
}
