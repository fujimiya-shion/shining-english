import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { Order } from './order.model'

export class CheckoutPaymentAction {
  type?: string
  url?: string
  metadata?: Record<string, unknown>
}

export class CheckoutOrderResponse {
  @Type(() => Order)
  order?: Order

  @Expose({ name: 'payment_action' })
  @Type(() => CheckoutPaymentAction)
  paymentAction?: CheckoutPaymentAction
}
