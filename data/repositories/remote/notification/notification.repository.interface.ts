import { ObjectResponse } from '@/data/dtos/common/object-response'
import { PaginationResponse } from '@/data/dtos/common/pagination-response'
import { NotificationModel } from '@/data/models/notification.model'
import { ApiResult } from '@/data/types/api-result'
import { ApiException } from '@/data/types/api-exception'

export type UnreadCountData = {
  unread_count: number
}

export interface INotificationRepository {
  getList(params?: {
    page?: number
    perPage?: number
  }): Promise<ApiResult<PaginationResponse<NotificationModel>, ApiException>>
  getUnreadCount(): Promise<ApiResult<ObjectResponse<UnreadCountData>, ApiException>>
  markAsRead(id: string): Promise<ApiResult<ObjectResponse<null>, ApiException>>
  markAllAsRead(): Promise<ApiResult<ObjectResponse<null>, ApiException>>
}
