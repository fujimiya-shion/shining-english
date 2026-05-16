import { ListResponse } from "@/data/dtos/common/list-response";
import { City } from "@/data/models/city.model";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { BaseRepository } from "../base.repository";
import { ICityRepository } from "./city.repository.interface";

export class CityRepository extends BaseRepository implements ICityRepository {
  async getAll(): Promise<ApiResult<ListResponse<City>, ApiException>> {
    return this.get({
      url: AppEndpoints.city.index,
      map: (raw) => ListResponse.fromApiJson(raw, City),
    });
  }
}

