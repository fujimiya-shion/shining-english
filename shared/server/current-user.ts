import { User } from "@/data/models/user.model";
import { resolveServer } from "@/shared/ioc/server-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { ObjectResponse } from "@/data/dtos/common/object-response";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";

export type AuthUserResult = {
  authenticated: boolean;
  data: ObjectResponse<User> | null;
};

export async function getCurrentUser(): Promise<AuthUserResult> {
  const repository = resolveServer<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);

  const result = await repository.me();
  if (result.response) {
    return {
      authenticated: true,
      data: result.response,
    };
  }

  return {
    authenticated: false,
    data: null,
  };
}
