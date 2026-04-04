'use client'

import { useCourseLearningPlayerState } from '@/app/courses/hooks/use-course-learning-player-state'
import { SerializedCourse } from '@/data/models/course.model'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  CourseLearningPlayerHeaderSection,
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
            <CourseLearningPlayerLockedHero
              title={playerState.courseMeta.title}
              subtitle={playerState.courseMeta.subtitle}
              lessonTitle={playerState.currentLessonData?.title}
              totalLessons={playerState.courseMeta.totalLessons}
              totalHours={playerState.courseMeta.totalHours}
              authenticated={authenticated}
            />

            <CourseLearningPlayerHeaderSection
              authenticated={authenticated}
              canWatchCourse={false}
              courseMeta={playerState.courseMeta}
              coursePrice={course.price}
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
