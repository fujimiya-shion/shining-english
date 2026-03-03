import { User } from "@/data/models/user.model";
import { resolveServer } from "@/shared/ioc/server-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { ObjectResponse } from "@/shared/responses/object-response";
import { IUserRepository } from "@/data/repositories/remote/user/user_repository.interface";

export type AuthUserResult = {
  authenticated: boolean;
  data: ObjectResponse<User> | null;
};

export async function getCurrentUser(): Promise<AuthUserResult> {
  const repository = resolveServer<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);

  try {
    const data = await repository.me();
    return {
      authenticated: true,
      data,
    };
  } catch {
    return {
      authenticated: false,
      data: null,
    };
  }
}
