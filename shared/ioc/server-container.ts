import "server-only";

import { ServerBackendHttpClient } from "@/infra/http/server-backend-http.client";
import { UserRepository } from "@/data/repositories/remote/user/user_repository";
import { IUserRepository } from "@/data/repositories/remote/user/user_repository.interface";
import { IoCContainer } from "./ioc-container";
import { IOC_TOKENS, IoCToken } from "./tokens";

let serverContainer: IoCContainer | null = null;

function buildServerContainer(): IoCContainer {
  const container = new IoCContainer();
  container.bind<IUserRepository>(
    IOC_TOKENS.USER_REPOSITORY,
    () => new UserRepository(new ServerBackendHttpClient()),
  );
  return container;
}

export function resolveServer<T>(token: IoCToken): T {
  serverContainer ??= buildServerContainer();
  return serverContainer.resolve<T>(token);
}
