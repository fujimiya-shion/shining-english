import { BaseModel } from "./base.model";

export class User extends BaseModel {
  name?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  birthday?: string | Date | null;
  avatar?: string;
  cityId?: number | null;
  city_id?: number | null;
  emailVerifiedAt?: string | Date | null;
  email_verified_at?: string | Date | null;
}
