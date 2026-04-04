'use client'

import { ReactNode } from 'react'

export function CourseLearningPlayerScaffold({
  main,
  sidebar,
}: {
  main: ReactNode
  sidebar: ReactNode
}) {
  return (
    <div className="grid min-h-screen gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">{main}</div>
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">{sidebar}</div>
    </div>
  )
}
