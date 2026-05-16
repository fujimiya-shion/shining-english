import { ObjectResponse } from "@/data/dtos/common/object-response";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";
import { AppEndpoints } from "@/shared/constants/app-endpoints";
import { BaseRepository } from "../base.repository";
import { IContactRepository } from "./contact.repository.interface";

export class ContactRepository extends BaseRepository implements IContactRepository {
  async submitContact(
    name: string,
    email: string,
    message: string,
    recaptchaToken: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return this.post({
      url: AppEndpoints.contact.submit,
      body: {
        name,
        email,
        message,
        recaptcha_token: recaptchaToken,
      },
      map: (raw) => ObjectResponse.fromApiJson(raw),
    });
  }
}

