import { Expose } from 'class-transformer'
import { BaseModel } from './base.model'
import { Serializable } from './serializable.model'

export type SerializedLessonComment = {
  id?: number | string
  name?: string
  content?: string
  createdAt?: string
}

export class LessonComment extends BaseModel implements Serializable<SerializedLessonComment> {
  @Expose({ name: 'lesson_id' })
  lessonId?: number

  name?: string
  content?: string

  serialize(): SerializedLessonComment {
    const rawCreatedAt = (this as LessonComment & { created_at?: string | Date }).created_at
    const createdAt = this.createdAt instanceof Date
      ? this.createdAt.toISOString()
      : rawCreatedAt
        ? new Date(rawCreatedAt).toISOString()
        : undefined

    return {
      id: this.id,
      name: this.name,
      content: this.content,
      createdAt,
    }
  }
}
