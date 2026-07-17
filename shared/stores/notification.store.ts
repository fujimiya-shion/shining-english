'use client'

import { NotificationModel } from '@/data/models/notification.model'
import { INotificationRepository } from '@/data/repositories/remote/notification/notification.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { resolveApiErrorMessage } from '@/shared/utils/api-error-message'
import { create } from 'zustand'

export interface NotificationStoreProps {
  status: AppStatus
  list: NotificationModel[]
  unreadCount: number
  currentPage: number
  lastPage: number
  total: number
  errorMessage: string | null
}

export interface NotificationStoreState extends NotificationStoreProps {
  fetchList: (page?: number) => Promise<boolean>
  fetchUnreadCount: () => Promise<boolean>
  markAsRead: (id: string) => Promise<boolean>
  markAllAsRead: () => Promise<boolean>
  reset: () => void
}

const initState: NotificationStoreProps = {
  status: AppStatus.initial,
  list: [],
  unreadCount: 0,
  currentPage: 1,
  lastPage: 1,
  total: 0,
  errorMessage: null,
}

function resolveNotificationRepository(): INotificationRepository {
  return resolveClient<INotificationRepository>(IOC_TOKENS.NOTIFICATION_REPOSITORY)
}

export const useNotificationStore = create<NotificationStoreState>((set, get) => ({
  ...initState,

  fetchList: async (page?: number) => {
    set({
      status: AppStatus.loading,
      errorMessage: null,
    })

    const result = await resolveNotificationRepository().getList({
      page: page ?? get().currentPage,
    })

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      })
      return false
    }

    const { data, page: respPage, pageCount: lastPage, total } = result.response

    set({
      status: AppStatus.done,
      list: data,
      currentPage: respPage,
      lastPage,
      total,
      errorMessage: null,
    })
    return true
  },

  fetchUnreadCount: async () => {
    const result = await resolveNotificationRepository().getUnreadCount()

    if (!result.response) {
      return false
    }

    set({
      unreadCount: result.response.data.unread_count,
    })
    return true
  },

  markAsRead: async (id) => {
    const result = await resolveNotificationRepository().markAsRead(id)

    if (!result.response) {
      return false
    }

    const nextList = get().list.map((item) => {
      if (item.id !== id) return item
      const copy = Object.create(NotificationModel.prototype)
      return Object.assign(copy, item, { readAt: new Date() })
    })

    set({
      list: nextList,
      unreadCount: Math.max(0, get().unreadCount - 1),
    })
    return true
  },

  markAllAsRead: async () => {
    const result = await resolveNotificationRepository().markAllAsRead()

    if (!result.response) {
      return false
    }

    const nextList = get().list.map((item) => {
      const copy = Object.create(NotificationModel.prototype)
      return Object.assign(copy, item, { readAt: new Date() })
    })

    set({
      list: nextList,
      unreadCount: 0,
    })
    return true
  },

  reset: () => set({ ...initState }),
}))
