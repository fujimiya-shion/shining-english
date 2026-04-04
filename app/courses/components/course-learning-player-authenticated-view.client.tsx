'use client'

import { SerializedCourse } from '@/data/models/course.model'
import { useCourseLearningPlayerState } from '@/app/courses/hooks/use-course-learning-player-state'
import { AppStatus } from '@/shared/enums/app-status'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCoursePurchaseStore } from '../stores/course/course-purchase.store'
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
  const inCart = useCoursePurchaseStore((state) => state.inCart)
  const purchaseMessage = useCoursePurchaseStore((state) => state.message)
  const purchaseErrorMessage = useCoursePurchaseStore((state) => state.errorMessage)
  const syncAccess = useCoursePurchaseStore((state) => state.syncAccess)
  const addToCart = useCoursePurchaseStore((state) => state.addToCart)
  const clearPurchaseFeedback = useCoursePurchaseStore((state) => state.clearFeedback)
  const resetPurchaseState = useCoursePurchaseStore((state) => state.reset)

  const playerState = useCourseLearningPlayerState({
    course,
    enrolled,
  })

  const courseId = Number(course.id ?? 0)
  const isAccessLoading = purchaseStatus === AppStatus.initial || purchaseStatus === AppStatus.loading
  const isPurchaseActionLoading = purchaseActionStatus === AppStatus.loading
  const canWatchCourse = enrolled

  useEffect(() => {
    resetPurchaseState()

    if (!courseId) {
      return
    }

    void syncAccess(courseId)
  }, [courseId, resetPurchaseState, syncAccess])

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

  return (
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
              notes={playerState.notes}
              onChangeNotes={playerState.setNotes}
              onCompleteLesson={playerState.handleCompleteLesson}
              onSelectLesson={playerState.setCurrentLesson}
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
              notes={playerState.notes}
              onChangeNotes={playerState.setNotes}
              onCompleteLesson={playerState.handleCompleteLesson}
              onSelectLesson={playerState.setCurrentLesson}
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
          onSelectLesson={playerState.setCurrentLesson}
          progressPercentage={playerState.progressPercentage}
        />
      }
    />
  )
}
