'use client'

import { useEffect } from 'react'
import { ensureClientBindings } from '@/shared/ioc/client-container'
import { useAuthStore } from '@/shared/stores/auth.store'
import { AppStatus } from '@/shared/enums/app-status'

export function IoCBootstrapClient() {
  useEffect(() => {
    ensureClientBindings()

    const authStore = useAuthStore.getState()
    if (authStore.status === AppStatus.initial) {
      void authStore.fetchMe()
    }
  }, [])

  return null
}
