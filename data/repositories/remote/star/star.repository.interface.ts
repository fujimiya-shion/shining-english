import { ObjectResponse } from '@/data/dtos/common/object-response'
import { ApiResult } from '@/data/types/api-result'
import { ApiException } from '@/data/types/api-exception'

export type StarBalanceData = {
  balance: number
}

export type CheckInData = {
  reward: number
  balance: number
}

export type StarPayData = {
  enrolled: boolean
  star_balance: number
}

export interface IStarRepository {
  getBalance(): Promise<ApiResult<ObjectResponse<StarBalanceData>, ApiException>>
  checkIn(): Promise<ApiResult<ObjectResponse<CheckInData>, ApiException>>
  payForCourse(courseId: number): Promise<ApiResult<ObjectResponse<StarPayData>, ApiException>>
}
