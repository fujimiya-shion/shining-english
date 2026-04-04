import 'reflect-metadata'
import { Expose } from 'class-transformer'

export class CourseAccess {
  @Expose({ name: 'course_id' })
  courseId?: number

  enrolled = false

  @Expose({ name: 'in_cart' })
  inCart = false
}
