import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { BaseModel } from './base.model'
import { OrderItem } from './order-item.model'

export class Order extends BaseModel {
  @Expose({ name: 'user_id' })
  userId?: number

  @Expose({ name: 'total_amount' })
  totalAmount = 0

  status?: string

  @Expose({ name: 'payment_method' })
  paymentMethod?: string

  @Expose({ name: 'placed_at' })
  placedAt?: Date | string

  @Type(() => OrderItem)
  items?: OrderItem[]
}
