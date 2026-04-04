import { ObjectResponse } from '@/data/dtos/common/object-response'
import { Order } from '@/data/models/order.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export type OrderPaymentMethod = 'cod' | 'payos'

export interface IOrderRepository {
  createFromCart(paymentMethod?: OrderPaymentMethod): Promise<ApiResult<ObjectResponse<Order>, ApiException>>
  createBuyNow(
    courseId: number,
    quantity?: number,
    paymentMethod?: OrderPaymentMethod,
  ): Promise<ApiResult<ObjectResponse<Order>, ApiException>>
}
