import { BaseRepository } from '../base.repository'
import {
  INotificationRepository,
  UnreadCountData,
} from './notification.repository.interface'
import { ObjectResponse } from '@/data/dtos/common/object-response'
import { PaginationResponse } from '@/data/dtos/common/pagination-response'
import { NotificationModel } from '@/data/models/notification.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'
import { AppEndpoints } from '@/shared/constants/app-endpoints'

export class NotificationRepository extends BaseRepository implements INotificationRepository {
  async getList(params?: {
    page?: number
    perPage?: number
  }): Promise<ApiResult<PaginationResponse<NotificationModel>, ApiException>> {
    return this.get({
      url: AppEndpoints.notification.index,
      query: {
        page: params?.page ?? 1,
        per_page: params?.perPage ?? 15,
      },
      map: (raw) => PaginationResponse.fromJson(raw, NotificationModel),
    })
  }

  async getUnreadCount(): Promise<
    ApiResult<ObjectResponse<UnreadCountData>, ApiException>
  > {
    return this.get({
      url: AppEndpoints.notification.unreadCount,
      map: (raw) => ObjectResponse.fromApiJson<UnreadCountData>(raw),
    })
  }

  async markAsRead(
    id: string,
  ): Promise<ApiResult<ObjectResponse<null>, ApiException>> {
    return this.patch({
      url: AppEndpoints.notification.markAsRead(id),
      map: () => ObjectResponse.fromApiJson<null>({ status: true, status_code: 200, data: null }),
    })
  }

  async markAllAsRead(): Promise<
    ApiResult<ObjectResponse<null>, ApiException>
  > {
    return this.patch({
      url: AppEndpoints.notification.markAllAsRead,
      map: () => ObjectResponse.fromApiJson<null>({ status: true, status_code: 200, data: null }),
    })
  }
}
