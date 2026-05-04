import { ListResponse } from "@/data/dtos/common/list-response";
import { City } from "@/data/models/city.model";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

export interface ICityRepository {
  getAll(): Promise<ApiResult<ListResponse<City>, ApiException>>;
}

