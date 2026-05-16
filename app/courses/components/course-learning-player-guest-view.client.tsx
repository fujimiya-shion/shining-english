'use client'

import { useCourseLearningPlayerState } from '@/app/courses/hooks/use-course-learning-player-state'
import { SerializedCourse } from '@/data/models/course.model'
import { AppStatus } from '@/shared/enums/app-status'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  CourseLearningPlayerHeaderSection,
  CourseLearningPlayerLessonSection,
  CourseLearningPlayerLoginPromptModal,
  CourseLearningPlayerLockedHero,
  CourseLearningPlayerReviewsSection,
  CourseLearningPlayerScaffold,
  CourseLearningPlayerSidebar,
} from './course-learning-player-sections'

export function CourseLearningPlayerGuestView({
  course,
  authenticated,
}: {
  course: SerializedCourse
  authenticated: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loginPromptOpen, setLoginPromptOpen] = useState(false)

  const playerState = useCourseLearningPlayerState({
    course,
    enrolled: false,
  })

  const returnTo = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const isFreeCourse = (course.price ?? 0) <= 0

  return (
    <>
      <CourseLearningPlayerLoginPromptModal
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        onLogin={() => router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`)}
      />

      <CourseLearningPlayerScaffold
        main={
          <>
            {playerState.shouldShowVideo ? (
              <CourseLearningPlayerLessonSection
                comments={[]}
                currentLesson={playerState.currentLesson}
                currentLessonData={playerState.currentLessonData}
                currentLessonDetail={playerState.currentLessonDetail}
                currentLessonIndex={playerState.currentLessonIndex}
                currentLessonVideoUrl={playerState.currentLessonVideoUrl}
                lessonIds={playerState.lessonIds}
                lessonNotes={[]}
                lessonNotesStatus={AppStatus.initial}
                notes=""
                noteActionStatus={AppStatus.initial}
                onChangeNotes={() => undefined}
                onDeleteNote={() => undefined}
                onSaveNote={() => undefined}
                onCompleteLesson={() => undefined}
                onOpenQuiz={() => undefined}
                onViewQuizResult={() => undefined}
                onSelectLesson={playerState.setCurrentLesson}
                onVideoEnded={() => undefined}
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
                authenticated={authenticated}
                thumbnail={course.thumbnail}
              />
            )}

            <CourseLearningPlayerHeaderSection
              authenticated={authenticated}
              canWatchCourse={false}
              pendingAccess={false}
              courseMeta={playerState.courseMeta}
              coursePrice={course.price}
              isFreeCourse={isFreeCourse}
              inCart={false}
              progressPercentage={playerState.progressPercentage}
              onAddToCart={() => setLoginPromptOpen(true)}
              onBuyNow={() => setLoginPromptOpen(true)}
              purchaseErrorMessage={undefined}
              purchaseMessage={undefined}
              isPurchaseActionLoading={false}
            />

            <CourseLearningPlayerReviewsSection reviews={playerState.reviews} canWriteReview={false} />
          </>
        }
        sidebar={
          <CourseLearningPlayerSidebar
            canWatchCourse={false}
            currentLesson={playerState.currentLesson}
            modules={playerState.modules}
            onSelectLesson={playerState.setCurrentLesson}
            progressPercentage={playerState.progressPercentage}
          />
        }
      />
    </>
  )
}
