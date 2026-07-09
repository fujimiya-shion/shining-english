import 'reflect-metadata'
import { Expose } from 'class-transformer'

export class CourseAccess {
  @Expose({ name: 'course_id' })
  courseId?: number

  enrolled = false

  @Expose({ name: 'pending_access' })
  pendingAccess = false

  @Expose({ name: 'in_cart' })
  inCart = false

  @Expose({ name: 'is_free_course' })
  isFreeCourse = false

  @Expose({ name: 'can_enroll_free' })
  canEnrollFree = false

  @Expose({ name: 'allow_star_payment' })
  allowStarPayment = false

  @Expose({ name: 'star_price' })
  starPrice = 0

  @Expose({ name: 'star_balance' })
  starBalance = 0
}
