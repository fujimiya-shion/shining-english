import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'

class CourseLearningProgressNextLesson {
  id?: number

  @Expose({ name: 'has_quiz' })
  hasQuiz = false
}

export class CourseLearningProgress {
  @Expose({ name: 'course_id' })
  courseId?: number

  @Expose({ name: 'current_lesson_id' })
  currentLessonId?: number

  @Expose({ name: 'completed_lesson_ids' })
  completedLessonIds: number[] = []

  @Expose({ name: 'total_lessons' })
  totalLessons = 0

  @Expose({ name: 'progress_percentage' })
  progressPercentage = 0

  @Expose({ name: 'next_lesson' })
  @Type(() => CourseLearningProgressNextLesson)
  nextLesson?: CourseLearningProgressNextLesson
}
