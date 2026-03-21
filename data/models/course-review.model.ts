import "reflect-metadata"
import { BaseModel } from './base.model'
import { Expose, Type } from 'class-transformer'
import { Serializable } from './serializable.model'

type SerializedReviewUser = {
  id?: number | string
  name?: string
  avatar?: string
}

export type SerializedCourseReview = {
  id?: number | string
  userId?: number
  user?: SerializedReviewUser
  rating?: number
  content?: string
  createdAt?: string
}

class ReviewUser {
  id?: number | string
  name?: string
  avatar?: string
}

export class CourseReview extends BaseModel implements Serializable<SerializedCourseReview> {
  @Expose({ name: 'course_id' })
  courseId?: number

  @Expose({ name: 'user_id' })
  userId?: number

  @Type(() => ReviewUser)
  user?: ReviewUser

  rating?: number
  content?: string

  serialize(): SerializedCourseReview {
    const rawCreatedAt = (this as CourseReview & { created_at?: string | Date }).created_at
    const createdAt = this.createdAt instanceof Date
      ? this.createdAt.toISOString()
      : rawCreatedAt
        ? new Date(rawCreatedAt).toISOString()
        : undefined

    return {
      id: this.id,
      userId: this.userId,
      user: this.user
        ? {
            id: this.user.id,
            name: this.user.name,
            avatar: this.user.avatar,
          }
        : undefined,
      rating: this.rating,
      content: this.content,
      createdAt,
    }
  }
}
