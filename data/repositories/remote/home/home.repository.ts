import { ObjectResponse } from '@/data/dtos/common/object-response'
import { HomePageModel } from '@/data/models/home.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'
import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { IHomeRepository } from './home.repository.interface'

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : false
}

function asInt(value: unknown, fallback = 0): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? Math.trunc(value) : fallback
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isNaN(parsed) ? fallback : parsed
  }

  return fallback
}

export class HomeRepository extends BaseRepository implements IHomeRepository {
  async getPageData(): Promise<ApiResult<ObjectResponse<HomePageModel>, ApiException>> {
    return this.get({
      url: AppEndpoints.home.index,
      map: (raw) =>
        new ObjectResponse<HomePageModel>(
          asBoolean(raw.status),
          asInt(raw.status_code ?? raw.statusCode, 0),
          HomePageModel.fromApiData(raw.data),
        ),
    })
  }
}
