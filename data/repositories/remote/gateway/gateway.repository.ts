import { CommonRequest } from "@/data/dtos/common/common-request";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { Gateway } from "@/data/models/gateway.model";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { BaseRepository } from "../base.repository";
import { IGatewayRepository } from "./gateway.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";

export class GatewayRepository extends BaseRepository implements IGatewayRepository {
    getAll(request?: CommonRequest): Promise<ApiResult<PaginationResponse<Gateway>, ApiException>> {
        return this.get({
            url: AppEndpoints.gateway.index,
            body: request?.toParameters(),
            map: (raw) => PaginationResponse.fromJson<Gateway>(raw, Gateway)
        });
    }

}