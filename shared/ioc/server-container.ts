import "server-only";

import { ServerBackendHttpClient } from "@/infra/http/server-backend-http.client";
import { UserRepository } from "@/data/repositories/remote/user/user.repository";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { IoCContainer } from "./ioc-container";
import { IOC_TOKENS, IoCToken } from "./tokens";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { CourseRepository } from "@/data/repositories/remote/course/course.repository";

let serverContainer: IoCContainer | null = null;

function buildServerContainer(): IoCContainer {
  const container = new IoCContainer();
  container.bind<IUserRepository>(
    IOC_TOKENS.USER_REPOSITORY,
    () => new UserRepository(new ServerBackendHttpClient()),
  );
  container.bind<ICourseRepository>(
    IOC_TOKENS.COURSE_REPOSITORY,
    () => new CourseRepository(new ServerBackendHttpClient()),
  )
  return container;
}

export function ensureServerBindings(): void {
  serverContainer ??= buildServerContainer();
}

export function resolveServer<T>(token: IoCToken): T {
  ensureServerBindings();
  return serverContainer!.resolve<T>(token);
}
