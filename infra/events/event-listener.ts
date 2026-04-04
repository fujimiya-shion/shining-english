import { Event } from './event'

export interface EventListener<TEvent extends Event> {
  handle(event: TEvent): void | Promise<void>
}
