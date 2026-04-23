'use client'

import { SerializedCourse } from '@/data/models/course.model'
import { useCourseLearningPlayerState } from '@/app/courses/hooks/use-course-learning-player-state'
import { AppStatus } from '@/shared/enums/app-status'
import { AppConfirmModal } from '@/shared/components/ui/app-confirm-modal'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCoursePurchaseStore } from '../stores/course/course-purchase.store'
import { useLessonNoteStore } from '@/shared/stores/lesson-note.store'
import { useCourseLearningProgressStore } from '../stores/course/course-learning-progress.store'
import { useCourseQuizStore } from '../stores/course/course-quiz.store'
import { formatRelativeTime } from '@/shared/utils/date-time-utils'
import {
  CourseLearningPlayerHeaderSection,
  CourseLearningPlayerLessonSection,
  CourseLearningPlayerLoadingState,
  CourseLearningPlayerLockedHero,
  CourseLearningPlayerReviewsSection,
  CourseLearningPlayerScaffold,
  CourseLearningPlayerSidebar,
} from './course-learning-player-sections'

export function CourseLearningPlayerAuthenticatedView({
  course,
  authenticated,
}: {
  course: SerializedCourse
  authenticated: boolean
}) {
  const router = useRouter()
  const purchaseStatus = useCoursePurchaseStore((state) => state.status)
  const purchaseActionStatus = useCoursePurchaseStore((state) => state.actionStatus)
  const enrolled = useCoursePurchaseStore((state) => state.enrolled)
  const pendingAccess = useCoursePurchaseStore((state) => state.pendingAccess)
  const inCart = useCoursePurchaseStore((state) => state.inCart)
  const purchaseMessage = useCoursePurchaseStore((state) => state.message)
  const purchaseErrorMessage = useCoursePurchaseStore((state) => state.errorMessage)
  const syncAccess = useCoursePurchaseStore((state) => state.syncAccess)
  const addToCart = useCoursePurchaseStore((state) => state.addToCart)
  const clearPurchaseFeedback = useCoursePurchaseStore((state) => state.clearFeedback)
  const resetPurchaseState = useCoursePurchaseStore((state) => state.reset)
  const lessonNotes = useLessonNoteStore((state) => state.lessonNotes)
  const lessonNotesStatus = useLessonNoteStore((state) => state.lessonStatus)
  const noteActionStatus = useLessonNoteStore((state) => state.actionStatus)
  const fetchLessonNotes = useLessonNoteStore((state) => state.fetchLessonNotes)
  const createNote = useLessonNoteStore((state) => state.createNote)
  const deleteNote = useLessonNoteStore((state) => state.deleteNote)
  const clearNoteFeedback = useLessonNoteStore((state) => state.clearFeedback)
  const progressCurrentLessonId = useCourseLearningProgressStore((state) => state.currentLessonId)
  const progressCompletedLessonIds = useCourseLearningProgressStore((state) => state.completedLessonIds)
  const fetchProgress = useCourseLearningProgressStore((state) => state.fetchProgress)
  const completeLessonProgress = useCourseLearningProgressStore((state) => state.completeLesson)
  const setCurrentLessonProgress = useCourseLearningProgressStore((state) => state.setCurrentLesson)
  const shouldPromptQuizForLesson = useCourseLearningProgressStore((state) => state.shouldPromptQuizForLesson)
  const resetLearningProgress = useCourseLearningProgressStore((state) => state.reset)
  const lessonQuizStatus = useCourseQuizStore((state) => state.quizStatus)
  const lessonQuiz = useCourseQuizStore((state) => state.quiz)
  const lessonQuizLatestAttempt = useCourseQuizStore((state) => state.latestAttempt)
  const fetchQuizByLesson = useCourseQuizStore((state) => state.fetchQuizByLesson)
  const fetchLatestAttempt = useCourseQuizStore((state) => state.fetchLatestAttempt)
  const [quizPromptLessonId, setQuizPromptLessonId] = useState<number | null>(null)

  const playerState = useCourseLearningPlayerState({
    course,
    enrolled,
    progressCurrentLessonId,
    progressCompletedLessonIds,
  })

  const courseId = Number(course.id ?? 0)
  const isAccessLoading = purchaseStatus === AppStatus.initial || purchaseStatus === AppStatus.loading
  const isPurchaseActionLoading = purchaseActionStatus === AppStatus.loading
  const canWatchCourse = enrolled

  useEffect(() => {
    resetPurchaseState()
    resetLearningProgress()

    if (!courseId) {
      return
    }

    void syncAccess(courseId)
  }, [courseId, resetLearningProgress, resetPurchaseState, syncAccess])

  useEffect(() => {
    if (!canWatchCourse || !courseId) {
      return
    }

    void fetchProgress(courseId)
  }, [canWatchCourse, courseId, fetchProgress])

  useEffect(() => {
    if (!canWatchCourse || playerState.currentLesson <= 0) {
      return
    }

    void fetchLessonNotes(playerState.currentLesson)
  }, [canWatchCourse, fetchLessonNotes, playerState.currentLesson])

  useEffect(() => {
    if (!canWatchCourse || playerState.currentLesson <= 0 || !playerState.currentLessonHasQuiz) {
      return
    }

    void fetchQuizByLesson(playerState.currentLesson)
  }, [canWatchCourse, fetchQuizByLesson, playerState.currentLesson, playerState.currentLessonHasQuiz])

  useEffect(() => {
    const quizId = lessonQuiz?.id
    const normalizedQuizId = typeof quizId === 'number'
      ? quizId
      : typeof quizId === 'string'
        ? Number.parseInt(quizId, 10)
        : NaN

    if (!Number.isFinite(normalizedQuizId)) {
      return
    }

    void fetchLatestAttempt(normalizedQuizId)
  }, [fetchLatestAttempt, lessonQuiz?.id])

  const handleBuyNow = () => {
    clearPurchaseFeedback()

    const query = new URLSearchParams({
      mode: 'buy_now',
      courseId: `${courseId}`,
      title: playerState.courseMeta.title,
      price: `${course.price ?? 0}`,
      image: course.thumbnail ?? '',
    })

    router.push(`/checkout?${query.toString()}`)
  }

  const handleAddToCart = async () => {
    clearPurchaseFeedback()

    if (inCart) {
      router.push('/cart')
      return
    }

    if (!courseId) {
      return
    }

    await addToCart(courseId)
  }

  const mappedLessonNotes = lessonNotes.map((note) => ({
    id: note.id ?? '',
    content: note.content?.trim() || 'Ghi chú đang được cập nhật.',
    time: formatRelativeTime(
      note.createdAt instanceof Date ? note.createdAt.toISOString() : note.createdAt,
    ),
    lessonName: note.lesson?.name?.trim() || playerState.currentLessonData?.title || 'Bài học hiện tại',
    courseName: note.lesson?.course?.name?.trim() || course.name,
  }))

  const handleSaveNote = async () => {
    const lessonId = playerState.currentLesson
    const content = playerState.notes.trim()

    if (!lessonId || !content) {
      return
    }

    clearNoteFeedback()

    const saved = await createNote(lessonId, content)
    if (saved) {
      playerState.clearCurrentLessonNoteDraft()
    }
  }

  const handleDeleteNote = async (noteId: number) => {
    clearNoteFeedback()
    await deleteNote(noteId)
  }

  const handleSelectLesson = (lessonId: number) => {
    setQuizPromptLessonId(null)
    playerState.setCurrentLesson(lessonId)

    if (!canWatchCourse || !courseId) {
      return
    }

    void setCurrentLessonProgress(courseId, lessonId)
  }

  const handleCompleteLesson = async () => {
    if (!canWatchCourse || !courseId || playerState.currentLesson <= 0) {
      playerState.handleCompleteLesson()
      return
    }

    if (playerState.currentLessonHasQuiz) {
      const shouldPromptQuiz = await shouldPromptQuizForLesson(playerState.currentLesson)
      if (shouldPromptQuiz) {
        await openQuizPromptModal(playerState.currentLesson)
        return
      }
    }

    const completed = await completeLessonProgress(courseId, playerState.currentLesson)
    if (!completed) {
      playerState.handleCompleteLesson()
    }
  }

  const openQuizForLesson = (lessonId: number, mode?: 'result') => {
    const slug = typeof course.slug === 'string' ? course.slug : ''
    if (!slug) {
      setQuizPromptLessonId(null)
      return
    }

    setQuizPromptLessonId(null)
    const query = new URLSearchParams({ lessonId: `${lessonId}` })
    if (mode) {
      query.set('mode', mode)
    }
    router.push(`/courses/${slug}/quiz?${query.toString()}`)
  }

  const openQuizPromptModal = async (lessonId: number) => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen()
      } catch {
        // Ignore fullscreen exit error and still show modal.
      }
    }

    setQuizPromptLessonId(lessonId)
  }

  const handleVideoEnded = async () => {
    if (!canWatchCourse || playerState.currentLesson <= 0) {
      return
    }

    void handleCompleteLesson()
  }

  const handleOpenCurrentLessonQuiz = () => {
    if (playerState.currentLesson <= 0 || !playerState.currentLessonHasQuiz) {
      return
    }

    openQuizForLesson(playerState.currentLesson)
  }

  const handleViewCurrentLessonQuizResult = () => {
    if (playerState.currentLesson <= 0 || !playerState.currentLessonHasQuiz) {
      return
    }

    openQuizForLesson(playerState.currentLesson, 'result')
  }

  return (
    <>
      <CourseLearningPlayerScaffold
        main={
        <>
          {isAccessLoading ? (
            <CourseLearningPlayerLoadingState message="Đang kiểm tra quyền truy cập khóa học..." />
          ) : canWatchCourse ? (
            <CourseLearningPlayerLessonSection
              comments={playerState.comments}
              currentLesson={playerState.currentLesson}
              currentLessonData={playerState.currentLessonData}
              currentLessonDetail={playerState.currentLessonDetail}
              currentLessonIndex={playerState.currentLessonIndex}
              currentLessonVideoUrl={playerState.currentLessonVideoUrl}
              lessonIds={playerState.lessonIds}
              lessonNotes={mappedLessonNotes}
              lessonNotesStatus={lessonNotesStatus}
              notes={playerState.notes}
              noteActionStatus={noteActionStatus}
              onChangeNotes={playerState.setNotes}
              onDeleteNote={handleDeleteNote}
              onSaveNote={handleSaveNote}
              onCompleteLesson={handleCompleteLesson}
              onOpenQuiz={handleOpenCurrentLessonQuiz}
              onViewQuizResult={handleViewCurrentLessonQuizResult}
              onSelectLesson={handleSelectLesson}
              onVideoEnded={() => {
                void handleVideoEnded()
              }}
              onVideoError={playerState.handleVideoError}
              showQuizAction={playerState.currentLessonHasQuiz}
              quizStatus={lessonQuizStatus}
              quizSummary={
                playerState.currentLessonHasQuiz
                  ? {
                      passPercent: lessonQuiz?.passPercent ?? 70,
                      hasAttempt: Boolean(lessonQuizLatestAttempt),
                      scorePercent: lessonQuizLatestAttempt?.scorePercent,
                      passed: lessonQuizLatestAttempt?.passed,
                    }
                  : undefined
              }
              shouldShowVideo={playerState.shouldShowVideo}
            />
          ) : (
            <CourseLearningPlayerLockedHero
              title={playerState.courseMeta.title}
              subtitle={playerState.courseMeta.subtitle}
              lessonTitle={playerState.currentLessonData?.title}
              totalLessons={playerState.courseMeta.totalLessons}
              totalHours={playerState.courseMeta.totalHours}
              authenticated
            />
          )}

          <CourseLearningPlayerHeaderSection
            authenticated
            canWatchCourse={canWatchCourse}
            pendingAccess={pendingAccess}
            courseMeta={playerState.courseMeta}
            coursePrice={course.price}
            inCart={inCart}
            progressPercentage={playerState.progressPercentage}
            onAddToCart={() => {
              void handleAddToCart()
            }}
            onBuyNow={handleBuyNow}
            purchaseErrorMessage={purchaseErrorMessage}
            purchaseMessage={purchaseMessage}
            isPurchaseActionLoading={isPurchaseActionLoading}
          />

          {canWatchCourse ? (
            <CourseLearningPlayerLessonSection
              comments={playerState.comments}
              currentLesson={playerState.currentLesson}
              currentLessonData={playerState.currentLessonData}
              currentLessonDetail={playerState.currentLessonDetail}
              currentLessonIndex={playerState.currentLessonIndex}
              currentLessonVideoUrl={playerState.currentLessonVideoUrl}
              lessonIds={playerState.lessonIds}
              lessonNotes={mappedLessonNotes}
              lessonNotesStatus={lessonNotesStatus}
              notes={playerState.notes}
              noteActionStatus={noteActionStatus}
              onChangeNotes={playerState.setNotes}
              onDeleteNote={handleDeleteNote}
              onSaveNote={handleSaveNote}
              onCompleteLesson={handleCompleteLesson}
              onOpenQuiz={handleOpenCurrentLessonQuiz}
              onViewQuizResult={handleViewCurrentLessonQuizResult}
              onSelectLesson={handleSelectLesson}
              onVideoEnded={() => undefined}
              onVideoError={playerState.handleVideoError}
              showQuizAction={playerState.currentLessonHasQuiz}
              quizStatus={lessonQuizStatus}
              quizSummary={
                playerState.currentLessonHasQuiz
                  ? {
                      passPercent: lessonQuiz?.passPercent ?? 70,
                      hasAttempt: Boolean(lessonQuizLatestAttempt),
                      scorePercent: lessonQuizLatestAttempt?.scorePercent,
                      passed: lessonQuizLatestAttempt?.passed,
                    }
                  : undefined
              }
              shouldShowVideo={playerState.shouldShowVideo}
              showLessonOnlyContent
            />
          ) : null}

          <CourseLearningPlayerReviewsSection reviews={playerState.reviews} canWriteReview={canWatchCourse} />
        </>
      }
      sidebar={
        <CourseLearningPlayerSidebar
          canWatchCourse={canWatchCourse}
          currentLesson={playerState.currentLesson}
          modules={playerState.modules}
          onSelectLesson={handleSelectLesson}
          progressPercentage={playerState.progressPercentage}
        />
        }
      />
      {quizPromptLessonId ? (
        <AppConfirmModal
          open
          message="Bài học này có quiz"
          title="Làm quiz ngay bây giờ?"
          description={`Bạn vừa xem xong bài ${quizPromptLessonId}. Bạn có muốn làm quiz của bài này ngay bây giờ không?`}
          confirmText="Làm quiz"
          cancelText="Để sau"
          onConfirm={() => openQuizForLesson(quizPromptLessonId)}
          onCancal={() => {
            setQuizPromptLessonId(null)
          }}
        />
      ) : null}
    </>
  )
}
