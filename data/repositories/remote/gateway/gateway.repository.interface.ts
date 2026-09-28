import { CommonRequest } from "@/data/dtos/common/common-request";
import { PaginationResponse } from "@/data/dtos/common/pagination-response";
import { Gateway } from "@/data/models/gateway.model";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

export interface IGatewayRepository {
    getAll(request?: CommonRequest): Promise<ApiResult<PaginationResponse<Gateway>, ApiException>>;
}