'use client'

import { Order } from '@/data/models/order.model'
import { IOrderRepository } from '@/data/repositories/remote/order/order.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

type PaymentReturnOutcome = 'success' | 'fail'

interface PaymentReturnStoreProps {
  status: AppStatus
  outcome: PaymentReturnOutcome
  order: Order | null
  errorMessage: string | null
}

interface PaymentReturnStoreState extends PaymentReturnStoreProps {
  initialize: (outcome: PaymentReturnOutcome) => void
  fetchOrder: (orderId: number) => Promise<boolean>
  reset: () => void
}

const initState: PaymentReturnStoreProps = {
  status: AppStatus.initial,
  outcome: 'success',
  order: null,
  errorMessage: null,
}

function resolveOrderRepository(): IOrderRepository {
  return resolveClient<IOrderRepository>(IOC_TOKENS.ORDER_REPOSITORY)
}

export const usePaymentReturnStore = create<PaymentReturnStoreState>((set) => ({
  ...initState,

  initialize: (outcome) =>
    set({
      ...initState,
      outcome,
      status: AppStatus.loading,
    }),

  fetchOrder: async (orderId) => {
    set({
      status: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveOrderRepository().getById(orderId)

    if (!result.response) {
      set({
        status: AppStatus.error,
        order: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    set({
      status: AppStatus.done,
      order: result.response.data,
      errorMessage: null,
    })
    return true
  },

  reset: () => set({ ...initState }),
}))
