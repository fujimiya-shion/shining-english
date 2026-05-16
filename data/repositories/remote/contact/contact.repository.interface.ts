import { ObjectResponse } from "@/data/dtos/common/object-response";
import { ApiException } from "@/data/types/api-exception";
import { ApiResult } from "@/data/types/api-result";

export interface IContactRepository {
  submitContact(
    name: string,
    email: string,
    message: string,
    recaptchaToken: string,
  ): Promise<ApiResult<ObjectResponse<unknown>, ApiException>>;
}

