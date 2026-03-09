'use client'

import { useEffect } from 'react'
import { ensureClientBindings } from '@/shared/ioc/client-container'

export function IoCBootstrapClient() {
  useEffect(() => {
    ensureClientBindings()
  }, [])

  return null
}
