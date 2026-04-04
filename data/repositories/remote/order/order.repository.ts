import { ObjectResponse } from '@/data/dtos/common/object-response'
import { Order } from '@/data/models/order.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'
import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { IOrderRepository, OrderPaymentMethod } from './order.repository.interface'

export class OrderRepository extends BaseRepository implements IOrderRepository {
  createFromCart(paymentMethod: OrderPaymentMethod = 'payos'): Promise<ApiResult<ObjectResponse<Order>, ApiException>> {
    return this.post({
      url: AppEndpoints.order.index,
      body: {
        type: 'cart',
        payment_method: paymentMethod,
      },
      map: (raw) => ObjectResponse.fromApiJson<Order>(raw, Order),
    })
  }

  createBuyNow(
    courseId: number,
    quantity = 1,
    paymentMethod: OrderPaymentMethod = 'payos',
  ): Promise<ApiResult<ObjectResponse<Order>, ApiException>> {
    return this.post({
      url: AppEndpoints.order.index,
      body: {
        type: 'buy_now',
        payment_method: paymentMethod,
        course_id: courseId,
        quantity,
      },
      map: (raw) => ObjectResponse.fromApiJson<Order>(raw, Order),
    })
  }
}
