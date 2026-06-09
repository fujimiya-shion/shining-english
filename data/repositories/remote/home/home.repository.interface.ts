import { ObjectResponse } from '@/data/dtos/common/object-response'
import { HomePageModel } from '@/data/models/home.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export interface IHomeRepository {
  getPageData(): Promise<ApiResult<ObjectResponse<HomePageModel>, ApiException>>
}
