import { BlogDetailResponseModel, BlogListResponseModel } from '@/data/models/blog.model'
import { ObjectResponse } from '@/data/dtos/common/object-response'
import { ApiResult } from '@/data/types/api-result'
import { ApiException } from '@/data/types/api-exception'

export interface IBlogRepository {
  getAll(): Promise<ApiResult<ObjectResponse<BlogListResponseModel>, ApiException>>
  getBySlug(slug: string): Promise<ApiResult<ObjectResponse<BlogDetailResponseModel>, ApiException>>
  unlock(blogId: number): Promise<ApiResult<ObjectResponse<BlogDetailResponseModel>, ApiException>>
}
