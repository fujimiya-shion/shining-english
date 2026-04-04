import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { BaseModel } from './base.model'
import { Course } from './course.model'

export class OrderItem extends BaseModel {
  @Expose({ name: 'order_id' })
  orderId?: number

  @Expose({ name: 'course_id' })
  courseId?: number

  quantity = 1
  price = 0

  @Type(() => Course)
  course?: Course
}
