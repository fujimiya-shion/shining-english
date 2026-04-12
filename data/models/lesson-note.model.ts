import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { BaseModel } from './base.model'
import { Serializable } from './serializable.model'

type SerializedLessonNoteLessonCourse = {
  id?: number | string
  name?: string
  slug?: string
}

type SerializedLessonNoteLesson = {
  id?: number | string
  name?: string
  course?: SerializedLessonNoteLessonCourse
}

export type SerializedLessonNote = {
  id?: number | string
  lessonId?: number
  userId?: number
  content?: string
  createdAt?: string
  lesson?: SerializedLessonNoteLesson
}

class LessonNoteCourseRelation {
  id?: number | string
  name?: string
  slug?: string
}

class LessonNoteLessonRelation {
  id?: number | string
  name?: string

  @Type(() => LessonNoteCourseRelation)
  course?: LessonNoteCourseRelation
}

export class LessonNote extends BaseModel implements Serializable<SerializedLessonNote> {
  @Expose({ name: 'lesson_id' })
  lessonId?: number

  @Expose({ name: 'user_id' })
  userId?: number

  content?: string

  @Type(() => LessonNoteLessonRelation)
  lesson?: LessonNoteLessonRelation

  serialize(): SerializedLessonNote {
    const rawCreatedAt = (this as LessonNote & { created_at?: string | Date }).created_at
    const createdAt = this.createdAt instanceof Date
      ? this.createdAt.toISOString()
      : rawCreatedAt
        ? new Date(rawCreatedAt).toISOString()
        : undefined

    return {
      id: this.id,
      lessonId: this.lessonId,
      userId: this.userId,
      content: this.content,
      createdAt,
      lesson: this.lesson
        ? {
            id: this.lesson.id,
            name: this.lesson.name,
            course: this.lesson.course
              ? {
                  id: this.lesson.course.id,
                  name: this.lesson.course.name,
                  slug: this.lesson.course.slug,
                }
              : undefined,
          }
        : undefined,
    }
  }
}
