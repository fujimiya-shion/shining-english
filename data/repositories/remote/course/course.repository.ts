import { Course } from "@/data/models/course.model";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { BaseRepository } from "../base.repository";
import { ICourseRepository } from "./course.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { CommonRequest } from "@/data/dtos/common/common-request";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { CourseFilterRequest, CourseFilterResponse } from "@/data/dtos/course.dto";

export class CourseRepository extends BaseRepository implements ICourseRepository {
  async getAll(
    request?: CommonRequest,
  ): Promise<ApiResult<PaginationResponse<Course>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.index,
      query: request?.toParameters(),
      map: (raw) => PaginationResponse.fromJson(raw as Record<string, unknown>, Course),
    });
  }

  async filter(
    request?: CourseFilterRequest,
  ): Promise<ApiResult<PaginationResponse<Course>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.filter,
      query: request?.toParameters(),
      map: (raw) => PaginationResponse.fromJson(raw as Record<string, unknown>, Course),
    });
  }

  async getFilterProps(): Promise<ApiResult<ObjectResponse<CourseFilterResponse>, ApiException>> {
    return this.get({
      url: AppEndpoints.course.filterProps,
      map: (raw) =>
        ObjectResponse.fromApiJson<CourseFilterResponse>(
          raw as Record<string, unknown>,
          CourseFilterResponse,
        ),
    });
  }
}
