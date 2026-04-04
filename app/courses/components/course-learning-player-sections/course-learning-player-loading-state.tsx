'use client'

export function CourseLearningPlayerLoadingState({ message }: { message: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/70">
      <div className="flex aspect-video items-center justify-center bg-muted/50">
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
