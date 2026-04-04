import { ObjectResponse } from '@/data/dtos/common/object-response'
import { CourseAccess } from '@/data/models/course-access.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'
import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { ICartRepository } from './cart.repository.interface'

export class CartRepository extends BaseRepository implements ICartRepository {
  addCourse(courseId: number, quantity = 1): Promise<ApiResult<ObjectResponse<CourseAccess>, ApiException>> {
    return this.post({
      url: AppEndpoints.cart.items,
      body: {
        course_id: courseId,
        quantity,
      },
      map: (raw) => ObjectResponse.fromApiJson<CourseAccess>(raw, CourseAccess),
    })
  }
}
