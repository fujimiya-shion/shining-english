import { User } from "@/data/models/user.model";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { ApiResult } from "@/data/types/api-result";
import { ApiException } from "@/data/types/api-exception";

export interface IUserRepository {
  register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>>;

  login(
    email: string,
    password: string,
    deviceIdentifier: string,
    deviceName?: string,
    platform?: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>>;

  getProfile(): Promise<ApiResult<ObjectResponse<User>, ApiException>>;

  updateProfile(
    data: FormData | Record<string, unknown>,
  ): Promise<ApiResult<ObjectResponse<User>, ApiException>>;

  logout(): Promise<ApiResult<ObjectResponse<unknown>, ApiException>>;

  me(): Promise<ApiResult<ObjectResponse<User>, ApiException>>;
}
