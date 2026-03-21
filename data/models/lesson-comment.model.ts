import "reflect-metadata"
import { Expose, Type } from 'class-transformer'
import { BaseModel } from './base.model'
import { Serializable } from './serializable.model'

type SerializedCommentUser = {
  id?: number | string
  name?: string
  avatar?: string
}

export type SerializedLessonComment = {
  id?: number | string
  userId?: number
  user?: SerializedCommentUser
  content?: string
  createdAt?: string
}

class CommentUser {
  id?: number | string
  name?: string
  avatar?: string
}

export class LessonComment extends BaseModel implements Serializable<SerializedLessonComment> {
  @Expose({ name: 'lesson_id' })
  lessonId?: number

  @Expose({ name: 'user_id' })
  userId?: number

  @Type(() => CommentUser)
  user?: CommentUser

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
      userId: this.userId,
      user: this.user
        ? {
            id: this.user.id,
            name: this.user.name,
            avatar: this.user.avatar,
          }
        : undefined,
      content: this.content,
      createdAt,
    }
  }
}
