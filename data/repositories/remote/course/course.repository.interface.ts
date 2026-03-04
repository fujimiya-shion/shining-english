import { Course } from "@/data/models/course.model";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { CommonRequest } from "@/data/dtos/common/common-request";
import { ApiResult } from "@/data/types/api-result";
import { ApiException } from "@/data/types/api-exception";

export interface ICourseRepository {
  getAll(request?: CommonRequest): Promise<ApiResult<PaginationResponse<Course>, ApiException>>;
}
