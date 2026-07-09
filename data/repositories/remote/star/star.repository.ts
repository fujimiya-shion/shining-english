import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { IStarRepository, StarBalanceData, CheckInData, StarPayData } from './star.repository.interface'
import { ObjectResponse } from '@/data/dtos/common/object-response'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export class StarRepository extends BaseRepository implements IStarRepository {
  async getBalance(): Promise<ApiResult<ObjectResponse<StarBalanceData>, ApiException>> {
    return this.get({
      url: AppEndpoints.star.balance,
      map: (raw) => ObjectResponse.fromApiJson(raw),
    })
  }

  async checkIn(): Promise<ApiResult<ObjectResponse<CheckInData>, ApiException>> {
    return this.post({
      url: AppEndpoints.star.checkIn,
      map: (raw) => ObjectResponse.fromApiJson(raw),
    })
  }

  async payForCourse(courseId: number): Promise<ApiResult<ObjectResponse<StarPayData>, ApiException>> {
    return this.post({
      url: AppEndpoints.star.payForCourse(courseId),
      map: (raw) => ObjectResponse.fromApiJson(raw),
    })
  }
}
