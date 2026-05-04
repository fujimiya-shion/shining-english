"use client";

import { Quiz } from "@/data/models/quiz.model";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { QuizAttempt } from "@/data/models/quiz-attempt.model";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { create } from "zustand";

type CourseQuizStoreProps = {
  quizStatus: AppStatus;
  latestAttemptStatus: AppStatus;
  submitStatus: AppStatus;
  quiz: Quiz | null;
  latestAttempt: QuizAttempt | null;
  message: string | null;
  errorMessage: string | null;
};

type CourseQuizStoreState = CourseQuizStoreProps & {
  fetchQuizByLesson: (lessonId: number) => Promise<boolean>;
  fetchLatestAttempt: (quizId: number) => Promise<boolean>;
  submitAttempt: (scorePercent: number, passed: boolean) => Promise<boolean>;
  clearFeedback: () => void;
  reset: () => void;
};

const initState: CourseQuizStoreProps = {
  quizStatus: AppStatus.initial,
  latestAttemptStatus: AppStatus.initial,
  submitStatus: AppStatus.initial,
  quiz: null,
  latestAttempt: null,
  message: null,
  errorMessage: null,
};

function resolveCourseRepository(): ICourseRepository {
  return resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY);
}

export const useCourseQuizStore = create<CourseQuizStoreState>((set, get) => ({
  ...initState,

  fetchQuizByLesson: async (lessonId) => {
    set({
      quizStatus: AppStatus.loading,
      quiz: null,
      latestAttemptStatus: AppStatus.initial,
      latestAttempt: null,
      errorMessage: null,
      message: null,
    });

    const result = await resolveCourseRepository().getLessonQuiz(lessonId);
    if (!result.response) {
      set({
        quizStatus: AppStatus.error,
        quiz: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      quizStatus: AppStatus.done,
      quiz: result.response.data,
      errorMessage: null,
    });
    return true;
  },

  fetchLatestAttempt: async (quizId) => {
    set({
      latestAttemptStatus: AppStatus.loading,
      latestAttempt: null,
      errorMessage: null,
    });

    const result = await resolveCourseRepository().getLatestQuizAttempt(quizId);

    if (!result.response) {
      if (result.exception?.httpStatus === 404) {
        set({
          latestAttemptStatus: AppStatus.done,
          latestAttempt: null,
        });
        return true;
      }

      set({
        latestAttemptStatus: AppStatus.error,
        latestAttempt: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      latestAttemptStatus: AppStatus.done,
      latestAttempt: result.response.data,
      errorMessage: null,
    });
    return true;
  },

  submitAttempt: async (scorePercent, passed) => {
    const quizId = get().quiz?.id;
    const normalizedQuizId = typeof quizId === "number"
      ? quizId
      : typeof quizId === "string"
        ? Number.parseInt(quizId, 10)
        : NaN;

    if (!Number.isFinite(normalizedQuizId)) {
      set({
        submitStatus: AppStatus.error,
        errorMessage: "Không xác định được quiz để nộp kết quả.",
      });
      return false;
    }

    set({
      submitStatus: AppStatus.loading,
      errorMessage: null,
      message: null,
    });

    const result = await resolveCourseRepository().createQuizAttempt(normalizedQuizId, {
      scorePercent,
      passed,
      submittedAt: new Date().toISOString(),
    });

    if (!result.response) {
      set({
        submitStatus: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      submitStatus: AppStatus.success,
      latestAttempt: result.response.data,
      latestAttemptStatus: AppStatus.done,
      message: "Nộp kết quả quiz thành công.",
      errorMessage: null,
    });
    return true;
  },

  clearFeedback: () =>
    set({
      message: null,
      errorMessage: null,
    }),

  reset: () => set({ ...initState }),
}));
