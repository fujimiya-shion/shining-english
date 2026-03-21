import { Expose } from "class-transformer";

export class AccessTokenResponse {
  @Expose({ name: "access_token" })
  accessToken?: string;
}
