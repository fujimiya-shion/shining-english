import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { IBlogRepository } from './blog.repository.interface'
import { ObjectResponse } from '@/data/dtos/common/object-response'
import { BlogDetailResponseModel, BlogListResponseModel } from '@/data/models/blog.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export class BlogRepository extends BaseRepository implements IBlogRepository {
  async getAll(): Promise<ApiResult<ObjectResponse<BlogListResponseModel>, ApiException>> {
    return this.get({
      url: AppEndpoints.blog.index,
      map: (raw) => ObjectResponse.fromApiJson(raw, BlogListResponseModel),
    })
  }

  async getBySlug(
    slug: string,
  ): Promise<ApiResult<ObjectResponse<BlogDetailResponseModel>, ApiException>> {
    return this.get({
      url: AppEndpoints.blog.detail(slug),
      map: (raw) => ObjectResponse.fromApiJson(raw, BlogDetailResponseModel),
    })
  }

  async unlock(
    blogId: number,
  ): Promise<ApiResult<ObjectResponse<BlogDetailResponseModel>, ApiException>> {
    return this.post({
      url: AppEndpoints.blog.unlock(blogId),
      map: (raw) => ObjectResponse.fromApiJson(raw, BlogDetailResponseModel),
    })
  }
}
