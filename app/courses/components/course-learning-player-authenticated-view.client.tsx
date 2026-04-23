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
  const pendingQuiz = useCourseLearningProgressStore((state) => state.pendingQuiz)
  const fetchProgress = useCourseLearningProgressStore((state) => state.fetchProgress)
  const completeLessonProgress = useCourseLearningProgressStore((state) => state.completeLesson)
  const setCurrentLessonProgress = useCourseLearningProgressStore((state) => state.setCurrentLesson)
  const consumePendingQuiz = useCourseLearningProgressStore((state) => state.consumePendingQuiz)
  const resetLearningProgress = useCourseLearningProgressStore((state) => state.reset)
  const [quizPromptOpen, setQuizPromptOpen] = useState(false)

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

    const completed = await completeLessonProgress(courseId, playerState.currentLesson)
    if (!completed) {
      playerState.handleCompleteLesson()
    }
  }

  const openQuizForPendingLesson = (lessonId: number) => {
    const slug = typeof course.slug === 'string' ? course.slug : ''
    if (!slug) {
      consumePendingQuiz()
      return
    }

    consumePendingQuiz()
    setQuizPromptOpen(false)
    router.push(`/courses/${slug}/quiz?lessonId=${lessonId}`)
  }

  useEffect(() => {
    if (!pendingQuiz || !canWatchCourse) {
      setQuizPromptOpen(false)
      return
    }

    const isFullscreen = Boolean(document.fullscreenElement)
    if (isFullscreen) {
      const confirmed = window.confirm('Bài tiếp theo có quiz. Bạn muốn làm quiz ngay bây giờ không?')
      if (confirmed) {
        openQuizForPendingLesson(pendingQuiz.lessonId)
      } else {
        consumePendingQuiz()
      }
      return
    }

    setQuizPromptOpen(true)
  }, [canWatchCourse, consumePendingQuiz, pendingQuiz, router])

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
              onSelectLesson={handleSelectLesson}
              onVideoError={playerState.handleVideoError}
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
              onSelectLesson={handleSelectLesson}
              onVideoError={playerState.handleVideoError}
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
      {pendingQuiz ? (
        <AppConfirmModal
          open={quizPromptOpen}
          message="Có quiz ở bài tiếp theo"
          title="Làm quiz ngay bây giờ?"
          description={`Bài ${pendingQuiz.lessonId} có quiz. Bạn có muốn làm ngay để mở khóa tiến độ học không?`}
          confirmText="Làm quiz"
          cancelText="Để sau"
          onConfirm={() => openQuizForPendingLesson(pendingQuiz.lessonId)}
          onCancal={() => {
            setQuizPromptOpen(false)
            consumePendingQuiz()
          }}
        />
      ) : null}
    </>
  )
}
