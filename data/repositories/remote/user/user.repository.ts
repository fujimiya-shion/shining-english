import { User } from "@/data/models/user.model";
import { BaseRepository } from "../base.repository";
import { IUserRepository } from "./user.repository.interface";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { ObjectResponse } from "@/shared/responses/object-response";

export class UserRepository extends BaseRepository implements IUserRepository {
  async register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<ObjectResponse<unknown>> {
    const raw = await this.post<Record<string, unknown>>(AppEndpoints.auth.register, {
      name,
      email,
      phone,
      password,
    });

    return ObjectResponse.fromApiJson(raw);
  }

  async login(
    email: string,
    password: string,
    deviceIdentifier: string,
    deviceName?: string,
    platform?: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ObjectResponse<unknown>> {
    const raw = await this.post<Record<string, unknown>>(AppEndpoints.auth.login, {
      email,
      password,
      device_identifier: deviceIdentifier,
      device_name: deviceName,
      platform,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    return ObjectResponse.fromApiJson(raw);
  }

  async getProfile(): Promise<ObjectResponse<User>> {
    const raw = await this.get<Record<string, unknown>>(AppEndpoints.auth.me);
    return ObjectResponse.fromApiJson(raw, User);
  }

  async updateProfile(
    data: FormData | Record<string, unknown>,
  ): Promise<ObjectResponse<User>> {
    const raw = await this.post<Record<string, unknown>, FormData | Record<string, unknown>>(
      AppEndpoints.user.update,
      data,
    );

    return ObjectResponse.fromApiJson(raw, User);
  }

  async logout(): Promise<ObjectResponse<unknown>> {
    const raw = await this.post<Record<string, unknown>>(AppEndpoints.auth.logout);
    return ObjectResponse.fromApiJson(raw);
  }

  async me(): Promise<ObjectResponse<User>> {
    return this.getProfile();
  }
}
