'use client'

import { useCourseQuizStore } from '@/app/courses/stores/course/course-quiz.store'
import { QuizSystem } from '@/shared/components/ui/quiz-system'
import { AppStatus } from '@/shared/enums/app-status'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function QuizPage() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()
  const lessonId = Number.parseInt(searchParams.get('lessonId') ?? '', 10)
  const mode = searchParams.get('mode')
  const quizStatus = useCourseQuizStore((state) => state.quizStatus)
  const latestAttemptStatus = useCourseQuizStore((state) => state.latestAttemptStatus)
  const latestAttempt = useCourseQuizStore((state) => state.latestAttempt)
  const submitStatus = useCourseQuizStore((state) => state.submitStatus)
  const quiz = useCourseQuizStore((state) => state.quiz)
  const errorMessage = useCourseQuizStore((state) => state.errorMessage)
  const fetchQuizByLesson = useCourseQuizStore((state) => state.fetchQuizByLesson)
  const fetchLatestAttempt = useCourseQuizStore((state) => state.fetchLatestAttempt)
  const submitAttempt = useCourseQuizStore((state) => state.submitAttempt)
  const reset = useCourseQuizStore((state) => state.reset)

  useEffect(() => {
    reset()

    if (!Number.isFinite(lessonId) || lessonId <= 0) {
      return
    }

    void fetchQuizByLesson(lessonId)
  }, [fetchQuizByLesson, lessonId, reset])

  useEffect(() => {
    const quizId = quiz?.id
    const normalizedQuizId = typeof quizId === 'number'
      ? quizId
      : typeof quizId === 'string'
        ? Number.parseInt(quizId, 10)
        : NaN

    if (!Number.isFinite(normalizedQuizId)) {
      return
    }

    void fetchLatestAttempt(normalizedQuizId)
  }, [fetchLatestAttempt, quiz?.id])

  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const mappedQuestions = useMemo(
    () =>
      (quiz?.questions ?? []).map((question) => ({
        id: question.id ?? '',
        content: question.content ?? 'Nội dung câu hỏi đang cập nhật.',
        options: (question.answers ?? []).map((answer) => ({
          id: answer.id ?? '',
          content: answer.content ?? 'Đáp án',
          isCorrect: Boolean(answer.isCorrect),
        })),
      })),
    [quiz?.questions],
  )

  if (!Number.isFinite(lessonId) || lessonId <= 0) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8 text-center text-muted-foreground">
          Lesson ID không hợp lệ.
        </div>
      </main>
    )
  }

  if (quizStatus === AppStatus.loading || quizStatus === AppStatus.initial) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8 text-center text-muted-foreground">
          Đang tải quiz...
        </div>
      </main>
    )
  }

  if (!quiz || quizStatus === AppStatus.error) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8 text-center text-destructive">
          {errorMessage || 'Không tải được quiz cho bài học này.'}
        </div>
      </main>
    )
  }

  if (mode === 'result' && latestAttemptStatus === AppStatus.done && latestAttempt) {
    const latestScore = latestAttempt.scorePercent ?? 0
    const passed = latestAttempt.passed ?? false

    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8">
          <h1 className="text-2xl font-bold text-foreground">Kết quả gần nhất</h1>
          <p className="mt-2 text-muted-foreground">Quiz bài {lessonId}</p>
          <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-5">
            <p className="text-4xl font-bold text-primary">{latestScore}%</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Mức đạt yêu cầu: <span className="font-semibold text-foreground">{quiz.passPercent ?? 70}%</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Trạng thái:{' '}
              <span className={passed ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>
                {passed ? 'Đạt' : 'Chưa đạt'}
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              onClick={() => {
                const slugValue = typeof params?.slug === 'string' ? params.slug : ''
                if (!slugValue) {
                  router.back()
                  return
                }
                router.push(`/courses/${slugValue}/quiz?lessonId=${lessonId}`)
              }}
            >
              Làm lại bài tập
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              onClick={() => {
                if (!slug) {
                  router.back()
                  return
                }
                router.push(`/courses/${slug}`)
              }}
            >
              Quay lại bài học
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <QuizSystem
        title={`Quiz bài ${lessonId}`}
        description="Hoàn thành quiz để lưu tiến độ và mở khóa học tiếp theo."
        passingScore={quiz.passPercent ?? 70}
        questions={mappedQuestions}
        submitStatus={submitStatus}
        allowRetake={!latestAttempt}
        onComplete={async (score, passed) => {
          await submitAttempt(score, passed)
        }}
        onContinue={() => {
          if (!slug) {
            router.back()
            return
          }

          router.push(`/courses/${slug}`)
        }}
      />
    </main>
  )
}
