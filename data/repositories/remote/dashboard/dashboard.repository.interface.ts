import { ObjectResponse } from "@/data/dtos/common/object-response";
import { DashboardOverviewModel } from "@/data/models/dashboard.model";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

export interface IDashboardRepository {
  getOverview(): Promise<ApiResult<ObjectResponse<DashboardOverviewModel>, ApiException>>;
}
