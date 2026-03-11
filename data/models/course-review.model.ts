import { BaseModel } from './base.model'
import { Expose } from 'class-transformer'
import { Serializable } from './serializable.model'

export type SerializedCourseReview = {
  id?: number | string
  name?: string
  rating?: number
  content?: string
  createdAt?: string
}

export class CourseReview extends BaseModel implements Serializable<SerializedCourseReview> {
  @Expose({ name: 'course_id' })
  courseId?: number
  name?: string
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
      name: this.name,
      rating: this.rating,
      content: this.content,
      createdAt,
    }
  }
}
