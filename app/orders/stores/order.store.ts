'use client'

import { CheckoutOrderResponse } from '@/data/models/order-checkout-response.model'
import { Order } from '@/data/models/order.model'
import { IOrderRepository } from '@/data/repositories/remote/order/order.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

interface OrderPagination {
  total: number
  pageCount: number
  page: number
  perPage: number
}

interface OrderStoreState {
  listStatus: AppStatus
  orders: Order[]
  pagination: OrderPagination | null
  listErrorMessage: string | null

  detailStatus: AppStatus
  selectedOrder: Order | null
  detailErrorMessage: string | null

  actionStatus: AppStatus
  repayResult: CheckoutOrderResponse | null
  actionErrorMessage: string | null

  fetchOrders: (page?: number) => Promise<boolean>
  fetchOrderDetail: (orderId: number) => Promise<boolean>
  cancelOrder: (orderId: number) => Promise<boolean>
  repayOrder: (orderId: number) => Promise<boolean>
  clearAction: () => void
  reset: () => void
}

const initState = {
  listStatus: AppStatus.initial,
  orders: [],
  pagination: null,
  listErrorMessage: null,

  detailStatus: AppStatus.initial,
  selectedOrder: null,
  detailErrorMessage: null,

  actionStatus: AppStatus.initial,
  repayResult: null,
  actionErrorMessage: null,
}

function resolveOrderRepository(): IOrderRepository {
  return resolveClient<IOrderRepository>(IOC_TOKENS.ORDER_REPOSITORY)
}

export const useOrderStore = create<OrderStoreState>((set) => ({
  ...initState,

  fetchOrders: async (page = 1) => {
    set({
      listStatus: AppStatus.loading,
      listErrorMessage: null,
    })

    const result = await resolveOrderRepository().list(page)

    if (!result.response) {
      set({
        listStatus: AppStatus.error,
        orders: [],
        pagination: null,
        listErrorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      listStatus: AppStatus.done,
      orders: result.response.data,
      pagination: {
        total: result.response.total,
        pageCount: result.response.pageCount,
        page: result.response.page,
        perPage: result.response.perPage,
      },
      listErrorMessage: null,
    })
    return true
  },

  fetchOrderDetail: async (orderId) => {
    set({
      detailStatus: AppStatus.loading,
      detailErrorMessage: null,
    })

    const result = await resolveOrderRepository().getById(orderId)

    if (!result.response) {
      set({
        detailStatus: AppStatus.error,
        selectedOrder: null,
        detailErrorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      detailStatus: AppStatus.done,
      selectedOrder: result.response.data,
      detailErrorMessage: null,
    })
    return true
  },

  cancelOrder: async (orderId) => {
    set({
      actionStatus: AppStatus.loading,
      actionErrorMessage: null,
    })

    const result = await resolveOrderRepository().cancel(orderId)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        actionErrorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      actionStatus: AppStatus.success,
      repayResult: null,
      actionErrorMessage: null,
    })
    return true
  },

  repayOrder: async (orderId) => {
    set({
      actionStatus: AppStatus.loading,
      repayResult: null,
      actionErrorMessage: null,
    })

    const result = await resolveOrderRepository().repay(orderId)

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        actionErrorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      actionStatus: AppStatus.success,
      repayResult: result.response.data,
      actionErrorMessage: null,
    })
    return true
  },

  clearAction: () =>
    set({
      actionStatus: AppStatus.initial,
      repayResult: null,
      actionErrorMessage: null,
    }),

  reset: () => set({ ...initState }),
}))
