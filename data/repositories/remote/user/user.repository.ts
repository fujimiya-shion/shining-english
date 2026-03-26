import { User } from "@/data/models/user.model";
import { BaseRepository } from "../base.repository";
import { IUserRepository } from "./user.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

export class UserRepository extends BaseRepository implements IUserRepository {
  async register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.auth.register,
      body: {
        name,
        email,
        phone,
        password,
      },
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }

  async login(
    email: string,
    password: string,
    deviceIdentifier: string,
    remember?: boolean,
    deviceName?: string,
    platform?: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.auth.login,
      body: {
        email,
        password,
        remember,
        device_identifier: deviceIdentifier,
        device_name: deviceName,
        platform,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }

  async loginWithThirdParty(
    provider: string,
    accessToken: string,
    deviceIdentifier: string,
    remember?: boolean,
    deviceName?: string,
    platform?: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.auth.thirdPartyLogin,
      body: {
        provider,
        access_token: accessToken,
        remember,
        device_identifier: deviceIdentifier,
        device_name: deviceName,
        platform,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }

  async getProfile(): Promise<ApiResult<ObjectResponse<User>, ApiException>> {
    return this.get({
      url: AppEndpoints.auth.me,
      map: (raw) => ObjectResponse.fromApiJson(raw, User),
    });
  }

  async updateProfile(
    data: FormData | Record<string, unknown>,
  ): Promise<ApiResult<ObjectResponse<User>, ApiException>> {
    return this.post({
      url: AppEndpoints.user.update,
      body: data,
      map: (raw) => ObjectResponse.fromApiJson(raw, User),
    });
  }

  async logout(): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.auth.logout,
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }

  async me(): Promise<ApiResult<ObjectResponse<User>, ApiException>> {
    return this.getProfile();
  }

  async forgotPassword(
    email: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.auth.forgotPassword,
      body: { email },
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }

  async resetPassword(
    email: string,
    token: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.auth.resetPassword,
      body: {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      },
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }
}
