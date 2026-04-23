import { Course } from "@/data/models/course.model";
import { CourseAccess } from "@/data/models/course-access.model";
import { CourseLearningProgress } from "@/data/models/course-learning-progress.model";
import { QuizAttempt } from "@/data/models/quiz-attempt.model";
import { Quiz } from "@/data/models/quiz.model";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { CommonRequest } from "@/data/dtos/common/common-request";
import { ApiResult } from "@/data/types/api-result";
import { ApiException } from "@/data/types/api-exception";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { CourseFilterRequest, CourseFilterResponse } from "@/data/dtos/course/course.dto";

export interface ICourseRepository {
  getAll(request?: CommonRequest): Promise<ApiResult<PaginationResponse<Course>, ApiException>>;
  getBySlug(slug: string): Promise<ApiResult<ObjectResponse<Course>, ApiException>>;
  getAccess(courseId: number): Promise<ApiResult<ObjectResponse<CourseAccess>, ApiException>>;
  getLearningProgress(courseId: number): Promise<ApiResult<ObjectResponse<CourseLearningProgress>, ApiException>>;
  completeLesson(
    courseId: number,
    lessonId: number,
  ): Promise<ApiResult<ObjectResponse<CourseLearningProgress>, ApiException>>;
  setCurrentLesson(
    courseId: number,
    lessonId: number,
  ): Promise<ApiResult<ObjectResponse<CourseLearningProgress>, ApiException>>;
  getLessonQuiz(lessonId: number): Promise<ApiResult<ObjectResponse<Quiz>, ApiException>>;
  getLatestQuizAttempt(quizId: number): Promise<ApiResult<ObjectResponse<QuizAttempt>, ApiException>>;
  createQuizAttempt(
    quizId: number,
    payload: {
      scorePercent: number;
      passed: boolean;
      submittedAt?: string;
    },
  ): Promise<ApiResult<ObjectResponse<QuizAttempt>, ApiException>>;
  filter(
    request?: CourseFilterRequest,
  ): Promise<ApiResult<PaginationResponse<Course>, ApiException>>;
  getFilterProps(): Promise<ApiResult<ObjectResponse<CourseFilterResponse>, ApiException>>;
}
