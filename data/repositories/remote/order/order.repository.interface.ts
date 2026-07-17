import { ObjectResponse } from '@/data/dtos/common/object-response'
import { PaginationResponse } from '@/data/dtos/common/pagination-response'
import { CheckoutOrderResponse } from '@/data/models/order-checkout-response.model'
import { Order } from '@/data/models/order.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export type OrderPaymentMethod = 'cod' | 'payos'
export type OrderCheckoutCustomerPayload = {
  buyerName: string
  buyerEmail: string
  buyerPhone: string
}

export interface IOrderRepository {
  list(
    page?: number,
    perPage?: number,
  ): Promise<ApiResult<PaginationResponse<Order>, ApiException>>
  createFromCart(
    paymentMethod?: OrderPaymentMethod,
    customer?: OrderCheckoutCustomerPayload,
  ): Promise<ApiResult<ObjectResponse<CheckoutOrderResponse>, ApiException>>
  createBuyNow(
    courseId: number,
    quantity?: number,
    paymentMethod?: OrderPaymentMethod,
    customer?: OrderCheckoutCustomerPayload,
  ): Promise<ApiResult<ObjectResponse<CheckoutOrderResponse>, ApiException>>
  getById(orderId: number): Promise<ApiResult<ObjectResponse<Order>, ApiException>>
  cancel(orderId: number): Promise<ApiResult<ObjectResponse<string>, ApiException>>
  repay(orderId: number): Promise<ApiResult<ObjectResponse<CheckoutOrderResponse>, ApiException>>
}
