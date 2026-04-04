import { Event } from './event'
import { EventListener } from './event-listener'

type EventClass<TEvent extends Event> = new (...args: never[]) => TEvent

export class EventManager {
  private readonly listeners = new Map<string, Set<EventListener<Event>>>()

  subscribe<TEvent extends Event>(
    eventClass: EventClass<TEvent>,
    listener: EventListener<TEvent>,
  ): () => void {
    const eventName = eventClass.name
    const currentListeners = this.listeners.get(eventName) ?? new Set<EventListener<Event>>()

    currentListeners.add(listener as EventListener<Event>)
    this.listeners.set(eventName, currentListeners)

    return () => {
      const targetListeners = this.listeners.get(eventName)
      if (!targetListeners) {
        return
      }

      targetListeners.delete(listener as EventListener<Event>)

      if (targetListeners.size === 0) {
        this.listeners.delete(eventName)
      }
    }
  }

  async dispatch<TEvent extends Event>(event: TEvent): Promise<void> {
    const eventName = event.constructor.name
    const targetListeners = this.listeners.get(eventName)

    if (!targetListeners || targetListeners.size === 0) {
      return
    }

    for (const listener of targetListeners) {
      await listener.handle(event)
    }
  }
}
