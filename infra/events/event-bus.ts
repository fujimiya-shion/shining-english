import { Event } from './event'
import { EventManager } from './event-manager'

export class EventBus {
  constructor(private readonly eventManager: EventManager) {}

  emit<TEvent extends Event>(event: TEvent): Promise<void> {
    return this.eventManager.dispatch(event)
  }
}
