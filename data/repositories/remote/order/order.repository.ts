import { ObjectResponse } from '@/data/dtos/common/object-response'
import { PaginationResponse } from '@/data/dtos/common/pagination-response'
import { CheckoutOrderResponse } from '@/data/models/order-checkout-response.model'
import { Order } from '@/data/models/order.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'
import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { IOrderRepository, OrderCheckoutCustomerPayload, OrderPaymentMethod } from './order.repository.interface'

export class OrderRepository extends BaseRepository implements IOrderRepository {
  list(
    page = 1,
    perPage = 15,
  ): Promise<ApiResult<PaginationResponse<Order>, ApiException>> {
    return this.get({
      url: AppEndpoints.order.index,
      query: { page, perPage },
      map: (raw) => PaginationResponse.fromJson<Order>(raw, Order),
    })
  }

  createFromCart(
    paymentMethod: OrderPaymentMethod = 'payos',
    customer?: OrderCheckoutCustomerPayload,
  ): Promise<ApiResult<ObjectResponse<CheckoutOrderResponse>, ApiException>> {
    return this.post({
      url: AppEndpoints.order.index,
      body: {
        type: 'cart',
        payment_method: paymentMethod,
        buyer_name: customer?.buyerName,
        buyer_email: customer?.buyerEmail,
        buyer_phone: customer?.buyerPhone,
      },
      map: (raw) => ObjectResponse.fromApiJson<CheckoutOrderResponse>(raw, CheckoutOrderResponse),
    })
  }

  createBuyNow(
    courseId: number,
    quantity = 1,
    paymentMethod: OrderPaymentMethod = 'payos',
    customer?: OrderCheckoutCustomerPayload,
  ): Promise<ApiResult<ObjectResponse<CheckoutOrderResponse>, ApiException>> {
    return this.post({
      url: AppEndpoints.order.index,
      body: {
        type: 'buy_now',
        payment_method: paymentMethod,
        course_id: courseId,
        quantity,
        buyer_name: customer?.buyerName,
        buyer_email: customer?.buyerEmail,
        buyer_phone: customer?.buyerPhone,
      },
      map: (raw) => ObjectResponse.fromApiJson<CheckoutOrderResponse>(raw, CheckoutOrderResponse),
    })
  }

  getById(orderId: number): Promise<ApiResult<ObjectResponse<Order>, ApiException>> {
    return this.get({
      url: AppEndpoints.order.detail(orderId),
      map: (raw) => ObjectResponse.fromApiJson<Order>(raw, Order),
    })
  }

  cancel(orderId: number): Promise<ApiResult<ObjectResponse<string>, ApiException>> {
    return this.post({
      url: AppEndpoints.order.cancel(orderId),
    })
  }

  repay(orderId: number): Promise<ApiResult<ObjectResponse<CheckoutOrderResponse>, ApiException>> {
    return this.post({
      url: AppEndpoints.order.repay(orderId),
      map: (raw) => ObjectResponse.fromApiJson<CheckoutOrderResponse>(raw, CheckoutOrderResponse),
    })
  }
}
