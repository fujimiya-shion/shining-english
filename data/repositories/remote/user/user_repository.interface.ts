import { User } from "@/data/models/user.model";
import { ObjectResponse } from "@/shared/responses/object-response";

export interface IUserRepository {
  register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<ObjectResponse<unknown>>;

  login(
    email: string,
    password: string,
    deviceIdentifier: string,
    deviceName?: string,
    platform?: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ObjectResponse<unknown>>;

  getProfile(): Promise<ObjectResponse<User>>;

  updateProfile(
    data: FormData | Record<string, unknown>,
  ): Promise<ObjectResponse<User>>;

  logout(): Promise<ObjectResponse<unknown>>;

  me(): Promise<ObjectResponse<User>>;
}
