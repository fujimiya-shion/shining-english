import { Event } from '../event'

export class CartInvalidatedEvent extends Event {
  constructor(
    public readonly source: 'course_purchase' | 'cart_page' | 'checkout',
    public readonly courseId?: number,
  ) {
    super()
  }
}
