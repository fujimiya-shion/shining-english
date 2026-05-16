"use client";

import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { create } from "zustand";

type PendingQuiz = {
  lessonId: number;
} | null;

export interface CourseLearningProgressStoreProps {
  status: AppStatus;
  actionStatus: AppStatus;
  errorMessage: string | null;
  currentLessonId: number | null;
  completedLessonIds: number[];
  progressPercentage: number;
  totalLessons: number;
  pendingQuiz: PendingQuiz;
  hasReviewed: boolean;
}

export interface CourseLearningProgressStoreState extends CourseLearningProgressStoreProps {
  fetchProgress: (courseId: number) => Promise<boolean>;
  completeLesson: (
    courseId: number,
    lessonId: number,
  ) => Promise<{ success: boolean; shouldPromptReview: boolean }>;
  setCurrentLesson: (courseId: number, lessonId: number) => Promise<boolean>;
  shouldPromptQuizForLesson: (lessonId: number) => Promise<boolean>;
  consumePendingQuiz: () => void;
  reset: () => void;
}

const initState: CourseLearningProgressStoreProps = {
  status: AppStatus.initial,
  actionStatus: AppStatus.initial,
  errorMessage: null,
  currentLessonId: null,
  completedLessonIds: [],
  progressPercentage: 0,
  totalLessons: 0,
  pendingQuiz: null,
  hasReviewed: false,
};

function resolveCourseRepository(): ICourseRepository {
  return resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY);
}

export const useCourseLearningProgressStore = create<CourseLearningProgressStoreState>((set, get) => ({
  ...initState,

  fetchProgress: async (courseId) => {
    set({
      status: AppStatus.loading,
      errorMessage: null,
    });

    const result = await resolveCourseRepository().getLearningProgress(courseId);
    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    const data = result.response.data;
    set({
      status: AppStatus.done,
      currentLessonId: data.currentLessonId ?? null,
      completedLessonIds: data.completedLessonIds ?? [],
      progressPercentage: data.progressPercentage ?? 0,
      totalLessons: data.totalLessons ?? 0,
      hasReviewed: Boolean(data.hasReviewed),
      errorMessage: null,
    });

    return true;
  },

  completeLesson: async (courseId, lessonId) => {
    const beforeCompletedCount = get().completedLessonIds.length;
    set({
      actionStatus: AppStatus.loading,
      errorMessage: null,
    });

    const result = await resolveCourseRepository().completeLesson(courseId, lessonId);
    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return { success: false, shouldPromptReview: false };
    }

    const data = result.response.data;
    const hasReviewed = Boolean(data.hasReviewed);
    const afterCompletedCount = data.completedLessonIds?.length ?? 0;
    const justCompletedFirstLesson = beforeCompletedCount === 0 && afterCompletedCount === 1;
    const shouldPromptReview = !hasReviewed && (justCompletedFirstLesson || afterCompletedCount > 1);

    set({
      actionStatus: AppStatus.done,
      currentLessonId: data.currentLessonId ?? null,
      completedLessonIds: data.completedLessonIds ?? [],
      progressPercentage: data.progressPercentage ?? 0,
      totalLessons: data.totalLessons ?? 0,
      hasReviewed,
      pendingQuiz:
        data.nextLesson?.hasQuiz && typeof data.nextLesson.id === "number"
          ? { lessonId: data.nextLesson.id }
          : null,
      errorMessage: null,
    });

    return { success: true, shouldPromptReview };
  },

  setCurrentLesson: async (courseId, lessonId) => {
    const result = await resolveCourseRepository().setCurrentLesson(courseId, lessonId);
    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    const data = result.response.data;
    set({
      actionStatus: AppStatus.done,
      currentLessonId: data.currentLessonId ?? lessonId,
      completedLessonIds: data.completedLessonIds ?? [],
      progressPercentage: data.progressPercentage ?? 0,
      totalLessons: data.totalLessons ?? 0,
      hasReviewed: Boolean(data.hasReviewed),
      errorMessage: null,
    });
    return true;
  },

  shouldPromptQuizForLesson: async (lessonId) => {
    const lessonQuizResult = await resolveCourseRepository().getLessonQuiz(lessonId);
    const lessonQuizData = lessonQuizResult.response?.data;

    if (!lessonQuizData) {
      if (lessonQuizResult.exception?.httpStatus === 404) {
        return false;
      }

      // Fallback an toàn: nếu không verify được trạng thái quiz thì vẫn prompt.
      return true;
    }

    const quizIdValue = lessonQuizData?.id;
    const quizId =
      typeof quizIdValue === "number"
        ? quizIdValue
        : typeof quizIdValue === "string"
          ? Number.parseInt(quizIdValue, 10)
          : NaN;

    if (!Number.isFinite(quizId)) {
      return false;
    }

    const latestAttemptResult = await resolveCourseRepository().getLatestQuizAttempt(quizId);

    if (latestAttemptResult.response) {
      return false;
    }

    if (latestAttemptResult.exception?.httpStatus === 404) {
      return true;
    }

    // Fallback an toàn: lỗi ngoài 404 xem như chưa chắc đã làm quiz.
    return true;
  },

  consumePendingQuiz: () =>
    set({
      pendingQuiz: null,
    }),

  reset: () => set({ ...initState }),
}));
