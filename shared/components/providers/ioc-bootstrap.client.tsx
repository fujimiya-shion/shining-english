'use client'

import { useEffect } from 'react'
import { bindAppEventListeners } from '@/shared/bootstrap/event-bindings'
import { ensureClientBindings } from '@/shared/ioc/client-container'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useCityStore } from '@/shared/stores/city.store'
import { AppStatus } from '@/shared/enums/app-status'

export function IoCBootstrapClient() {
  useEffect(() => {
    ensureClientBindings()
    bindAppEventListeners()

    const authStore = useAuthStore.getState()
    const cityStore = useCityStore.getState()

    if (cityStore.status === AppStatus.initial) {
      void cityStore.initial()
    }

    if (authStore.status === AppStatus.initial) {
      void authStore.fetchMe()
    }
  }, [])

  return null
}
