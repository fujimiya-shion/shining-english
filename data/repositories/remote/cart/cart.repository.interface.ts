import { ObjectResponse } from '@/data/dtos/common/object-response'
import { CourseAccess } from '@/data/models/course-access.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export interface ICartRepository {
  addCourse(courseId: number, quantity?: number): Promise<ApiResult<ObjectResponse<CourseAccess>, ApiException>>
}
