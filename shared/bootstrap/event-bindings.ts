'use client'

import { CartInvalidatedEvent } from '@/infra/events/events/cart-invalidated.event'
import { EventManager } from '@/infra/events/event-manager'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { useCartStore } from '@/shared/stores/cart.store'

let appEventBindingsInitialized = false

export function bindAppEventListeners(): void {
  if (appEventBindingsInitialized) {
    return
  }

  appEventBindingsInitialized = true

  const manager = resolveClient<EventManager>(IOC_TOKENS.EVENT_MANAGER);

  manager.subscribe(CartInvalidatedEvent, { handle: () => { void useCartStore.getState().refresh() } })
}
