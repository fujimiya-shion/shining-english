import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { BaseModel } from './base.model'
import { Course } from './course.model'

export class CartItem extends BaseModel {
  @Expose({ name: 'user_id' })
  userId?: number

  @Expose({ name: 'course_id' })
  courseId?: number

  quantity = 1

  @Type(() => Course)
  course?: Course
}
