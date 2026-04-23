import { Course } from "@/data/models/course.model";
import { CourseAccess } from "@/data/models/course-access.model";
import { CourseLearningProgress } from "@/data/models/course-learning-progress.model";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { BaseRepository } from "../base.repository";
import { ICourseRepository } from "./course.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { CommonRequest } from "@/data/dtos/common/common-request";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { CourseFilterRequest, CourseFilterResponse } from "@/data/dtos/course/course.dto";

export class CourseRepository extends BaseRepository implements ICourseRepository {
  async getAll(
    request?: CommonRequest,
  ): Promise<ApiResult<PaginationResponse<Course>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.index,
      query: request?.toParameters(),
      map: (raw) => PaginationResponse.fromJson(raw, Course),
    });
  }

  async getBySlug(slug: string): Promise<ApiResult<ObjectResponse<Course>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.detail(slug),
      map: (raw) =>
        ObjectResponse.fromApiJson<Course>(raw, Course),
    });
  }

  async getAccess(courseId: number): Promise<ApiResult<ObjectResponse<CourseAccess>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.access(courseId),
      map: (raw) => ObjectResponse.fromApiJson<CourseAccess>(raw, CourseAccess),
    });
  }

  async getLearningProgress(
    courseId: number,
  ): Promise<ApiResult<ObjectResponse<CourseLearningProgress>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.learningProgress(courseId),
      map: (raw) => ObjectResponse.fromApiJson<CourseLearningProgress>(raw, CourseLearningProgress),
    });
  }

  async completeLesson(
    courseId: number,
    lessonId: number,
  ): Promise<ApiResult<ObjectResponse<CourseLearningProgress>, ApiException>> {
    return this.post({
      url: AppEndpoints.course.completeLesson(courseId, lessonId),
      map: (raw) => ObjectResponse.fromApiJson<CourseLearningProgress>(raw, CourseLearningProgress),
    });
  }

  async setCurrentLesson(
    courseId: number,
    lessonId: number,
  ): Promise<ApiResult<ObjectResponse<CourseLearningProgress>, ApiException>> {
    return this.post({
      url: AppEndpoints.course.setCurrentLesson(courseId),
      body: { lesson_id: lessonId },
      map: (raw) => ObjectResponse.fromApiJson<CourseLearningProgress>(raw, CourseLearningProgress),
    });
  }

  async filter(
    request?: CourseFilterRequest,
  ): Promise<ApiResult<PaginationResponse<Course>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.filter,
      query: request?.toParameters(),
      map: (raw) => PaginationResponse.fromJson(raw, Course),
    });
  }

  async getFilterProps(): Promise<ApiResult<ObjectResponse<CourseFilterResponse>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.filterProps,
      map: (raw) =>
        ObjectResponse.fromApiJson<CourseFilterResponse>(raw, CourseFilterResponse),
    });
  }
}
