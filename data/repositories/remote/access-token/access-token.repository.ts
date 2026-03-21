import { ObjectResponse } from "@/data/dtos/common/object-response";
import { AccessTokenResponse } from "@/data/dtos/server/server.dto";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { BaseRepository } from "@/data/repositories/remote/base.repository";

import { IAccessTokenRepository } from "./access-token.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";

export class AccessTokenRepository extends BaseRepository implements IAccessTokenRepository {
  async getAccessToken(email: string, password: string): Promise<ApiResult<ObjectResponse<AccessTokenResponse>, ApiException>> {
    
    return this.post({
      url: AppEndpoints.server.accessToken,
      body: {
        'email': email,
        'password': password,
      },
      map: (raw) => ObjectResponse.fromApiJson<AccessTokenResponse>(raw, AccessTokenResponse),
    });
  }
}
