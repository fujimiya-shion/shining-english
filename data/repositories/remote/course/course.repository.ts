import { Course } from "@/data/models/course.model";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { BaseRepository } from "../base.repository";
import { ICourseRepository } from "./course.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { CommonRequest } from "@/data/dtos/common/common-request";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

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
  
}
