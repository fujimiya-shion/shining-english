'use client'

import { CourseLearningPlayerModule } from '@/app/courses/components/course-learning-player-sections/course-learning-player-types'
import { CourseListItem } from '@/shared/components/ui/course/course-list-item'

export function CourseLearningPlayerSidebar({
  canWatchCourse,
  currentLesson,
  modules,
  onSelectLesson,
  progressPercentage,
}: {
  canWatchCourse: boolean
  currentLesson: number
  modules: CourseLearningPlayerModule[]
  onSelectLesson: (lessonId: number) => void
  progressPercentage: number
}) {
  const allLessons = modules.flatMap((module) => module.lessons)

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80">
      <div className="space-y-6 p-6">
        <div>
          <h2 className="mb-2 text-lg font-bold">
            {canWatchCourse ? 'Tiến độ khóa học' : 'Danh sách bài học'}
          </h2>
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${canWatchCourse ? progressPercentage : 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {canWatchCourse
                ? `${Math.round(progressPercentage)}% hoàn thành`
                : `${allLessons.filter((lesson) => lesson.locked).length} bài học đang bị khóa`}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id}>
              <h3 className="mb-3 text-sm font-semibold">{module.title}</h3>
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <CourseListItem
                    key={lesson.id}
                    lesson={lesson}
                    isActive={canWatchCourse && currentLesson === lesson.id}
                    onSelect={onSelectLesson}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
