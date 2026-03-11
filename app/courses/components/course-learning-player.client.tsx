'use client'

import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { CourseListItem, type CourseListItemData } from '@/shared/components/ui/course/course-list-item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { SerializedCourse } from '@/data/models/course.model'

interface CourseModule {
  id: number
  title: string
  lessons: CourseListItemData[]
}

type CourseLearningPlayerClientProps = {
  course: SerializedCourse
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function CourseLearningPlayerClient({ course }: CourseLearningPlayerClientProps) {
  const lessonSources = useMemo(
    () =>
      (course.lessons ?? []).map((lesson, index) => ({
        id: Number(lesson.id ?? index + 1),
        title: lesson.name ?? `Bài học ${index + 1}`,
        group: lesson.groupName?.trim() || 'Danh sách bài học',
        description: lesson.description ? stripHtml(lesson.description) : '',
        duration: lesson.durationMinutes,
      })),
    [course.lessons]
  )

  const [currentLesson, setCurrentLesson] = useState(lessonSources[0]?.id ?? 0)
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([])
  const [notes, setNotes] = useState('')
  const normalizedDescription = course.description ? stripHtml(course.description) : ''

  const lessonMap = useMemo(() => {
    const map = new Map<number, (typeof lessonSources)[number]>()
    for (const lesson of lessonSources) {
      map.set(lesson.id, lesson)
    }

    return map
  }, [lessonSources])

  const modules = useMemo<CourseModule[]>(() => {
    const grouped = new Map<string, CourseListItemData[]>()

    for (const lesson of lessonSources) {
      if (!grouped.has(lesson.group)) {
        grouped.set(lesson.group, [])
      }

      grouped.get(lesson.group)?.push({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        completed: completedLessonIds.includes(lesson.id),
        locked: false,
      })
    }

    return Array.from(grouped.entries()).map(([title, lessons], index) => ({
      id: index + 1,
      title,
      lessons,
    }))
  }, [lessonSources, completedLessonIds])

  const allLessons = modules.flatMap((m) => m.lessons)
  const lessonIds = allLessons.map((l) => l.id)
  const currentLessonIndex = lessonIds.findIndex((id) => id === currentLesson)
  const currentLessonData = allLessons.find((l) => l.id === currentLesson)
  const currentLessonDetail = currentLesson ? lessonMap.get(currentLesson) : undefined

  const totalDurationMinutes = lessonSources.reduce((total, lesson) => {
    return total + (lesson.duration ?? 0)
  }, 0)

  const courseMeta = {
    title: course.name ?? 'Khóa học tiếng Anh',
    subtitle: normalizedDescription || 'Lộ trình ngắn gọn, dễ hiểu, phù hợp tự học',
    instructor: 'Shining English',
    level: course.level?.name ?? 'Tiếng Anh tổng quát',
    rating: course.rating ?? 0,
    reviewCount: 2453,
    students: course.learned ?? 0,
    totalLessons: lessonSources.length,
    totalHours: Number((totalDurationMinutes / 60).toFixed(1)),
  }

  const handleCompleteLesson = () => {
    if (currentLesson > 0 && !completedLessonIds.includes(currentLesson)) {
      setCompletedLessonIds((prev) => [...prev, currentLesson])
    }

    const nextLesson = allLessons
      .slice(currentLessonIndex + 1)
      .find((l) => !l.locked)

    if (nextLesson) {
      setCurrentLesson(nextLesson.id)
    }
  }

  const progressPercentage = allLessons.length
    ? (allLessons.filter((l) => l.completed).length / allLessons.length) * 100
    : 0

  const reviews = [
    {
      id: 1,
      name: 'Hà Linh',
      rating: 5,
      time: '2 tuần trước',
      content: 'Bài giảng dễ hiểu, lộ trình rõ ràng. Mình học đều 20 phút mỗi ngày là thấy tiến bộ.',
    },
    {
      id: 2,
      name: 'Minh Khánh',
      rating: 4,
      time: '1 tháng trước',
      content: 'Ví dụ thực tế, nói đúng lỗi thường gặp nên sửa rất nhanh. Mong thêm phần bài tập nói.',
    },
    {
      id: 3,
      name: 'Thanh Hương',
      rating: 5,
      time: '3 tháng trước',
      content: 'Học nhẹ nhàng nhưng hiệu quả. Đáng tiền và đáng thời gian.',
    },
  ]

  const comments = [
    {
      id: 1,
      name: 'Ngọc Anh',
      time: '3 giờ trước',
      content: 'Phần “Sentence Structure” có file bài tập không ạ?',
    },
    {
      id: 2,
      name: 'Tuấn Vũ',
      time: 'Hôm qua',
      content: 'Em bị rối phần thì hiện tại hoàn thành, có tip học nhanh không thầy?',
    },
    {
      id: 3,
      name: 'Mai Phương',
      time: '2 ngày trước',
      content: 'Mình follow đúng lộ trình, tuần này nói tự tin hơn thật.',
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.round(rating) ? 'fill-accent text-accent' : 'text-muted-foreground/40'
          }`}
      />
    ))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 min-h-screen">
      {/* Main Content */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Video Player */}
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/40">
          <div className="relative aspect-video bg-primary/10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent"></div>
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-white/90">
                Video bài học: {currentLessonData?.title ?? 'Đang cập nhật'}
              </p>
            </div>
          </div>
        </div>

        {/* Course Header */}
        <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
                Lộ trình cá nhân • {courseMeta.level}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">{courseMeta.title}</h1>
                <p className="mt-2 text-muted-foreground">{courseMeta.subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Giảng viên: {courseMeta.instructor}</span>
                <span>•</span>
                <span>{courseMeta.totalLessons} bài học</span>
                {courseMeta.totalHours > 0 ? (
                  <>
                    <span>•</span>
                    <span>{courseMeta.totalHours} giờ học</span>
                  </>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">{renderStars(courseMeta.rating)}</div>
                <span className="text-sm font-medium">{courseMeta.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({courseMeta.reviewCount.toLocaleString()} đánh giá)
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Đang học</p>
              <p className="mt-2 text-2xl font-semibold text-primary">
                {Math.round(progressPercentage)}%
              </p>
              <AppButton className="mt-4 w-full">Tiếp tục học</AppButton>
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{currentLessonData?.title ?? courseMeta.title}</h2>
            {typeof currentLessonData?.duration === 'number' && currentLessonData.duration > 0 ? (
              <p className="text-muted-foreground mt-1">
                Thời lượng: {currentLessonData.duration} phút
              </p>
            ) : null}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú</TabsTrigger>
              <TabsTrigger value="resources">Tài liệu</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="text-sm text-muted-foreground whitespace-pre-line">
                {currentLessonDetail?.description ||
                  normalizedDescription ||
                  'Nội dung tổng quan của khóa học đang được cập nhật.'}
              </div>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4 mt-4">
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú nhanh trong lúc học..."
                  className="w-full h-32 p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <AppButton>Lưu ghi chú</AppButton>
              </div>
            </TabsContent>
            <TabsContent value="resources" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 110 2h-6a1 1 0 110-2h6V4H6v12a1 1 0 110 2H4a2 2 0 01-2-2V4z" />
                  </svg>
                  <span className="text-sm font-medium">grammar-guide.pdf</span>
                </div>
                <div className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 110 2h-6a1 1 0 110-2h6V4H6v12a1 1 0 110 2H4a2 2 0 01-2-2V4z" />
                  </svg>
                  <span className="text-sm font-medium">practice-exercises.pdf</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={currentLessonIndex <= 0}
              onClick={() => {
                const prevLessonId = lessonIds[currentLessonIndex - 1]
                if (typeof prevLessonId === 'number') {
                  setCurrentLesson(prevLessonId)
                }
              }}
            >
              Bài trước
            </Button>
            <AppButton
              className="flex-1"
              onClick={handleCompleteLesson}
            >
              {currentLessonData?.completed ? 'Tiếp tục' : 'Hoàn thành'} & Bài tiếp theo
            </AppButton>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-2 rounded-2xl border border-border/60 bg-card/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Đánh giá khóa học</h3>
              <p className="text-sm text-muted-foreground">Phản hồi từ học viên đã mua</p>
            </div>
            <Button variant="outline">Viết đánh giá</Button>
          </div>
          <div className="mt-6 grid gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border/60 bg-background p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {review.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Thảo luận</h3>
              <p className="text-sm text-muted-foreground">Hỏi đáp ngay trong khóa học</p>
            </div>
            <Button variant="outline">Viết bình luận</Button>
          </div>
          <div className="mt-6 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-xl border border-border/60 bg-background p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-semibold">
                      {comment.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-medium">{comment.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar: Course Roadmap */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="rounded-2xl border border-border/60 bg-card/80">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="font-bold text-lg mb-2">Tiến độ khóa học</h2>
              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {Math.round(progressPercentage)}% hoàn thành
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id}>
                  <h3 className="font-semibold text-sm mb-3">{module.title}</h3>
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <CourseListItem
                        key={lesson.id}
                        lesson={lesson}
                        isActive={currentLesson === lesson.id}
                        onSelect={setCurrentLesson}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
