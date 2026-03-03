import { BrowserProxyHttpClient } from "@/infra/http/browser-proxy-http.client";
import { UserRepository } from "@/data/repositories/remote/user/user_repository";
import { IUserRepository } from "@/data/repositories/remote/user/user_repository.interface";
import { IoCContainer } from "./ioc-container";
import { IOC_TOKENS, IoCToken } from "./tokens";

let clientContainer: IoCContainer | null = null;

function buildClientContainer(): IoCContainer {
  const container = new IoCContainer();
  container.bind<IUserRepository>(
    IOC_TOKENS.USER_REPOSITORY,
    () => new UserRepository(new BrowserProxyHttpClient()),
  );
  return container;
}

export function ensureClientBindings(): void {
  clientContainer ??= buildClientContainer();
}

export function resolveClient<T>(token: IoCToken): T {
  ensureClientBindings();
  return clientContainer!.resolve<T>(token);
}
