import { ObjectResponse } from "@/data/dtos/common/object-response";
import { DashboardOverviewModel } from "@/data/models/dashboard.model";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { BaseRepository } from "../base.repository";
import { IDashboardRepository } from "./dashboard.repository.interface";

export class DashboardRepository extends BaseRepository implements IDashboardRepository {
  async getOverview(): Promise<ApiResult<ObjectResponse<DashboardOverviewModel>, ApiException>> {
    return this.get({
      url: AppEndpoints.dashboard.overview,
      map: (raw) => ObjectResponse.fromApiJson<DashboardOverviewModel>(raw),
    });
  }
}

