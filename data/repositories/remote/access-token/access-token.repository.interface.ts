import { AccessTokenResponse } from "@/data/dtos/server/server.dto";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

export interface IAccessTokenRepository {
  getAccessToken(email: string, password: string): Promise<ApiResult<ObjectResponse<AccessTokenResponse>, ApiException>>;
}
