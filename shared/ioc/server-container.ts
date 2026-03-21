import "server-only";

import { ServerSideHttpClient } from "@/infra/http/server-side-http.client";
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
    () => new UserRepository(new ServerSideHttpClient()),
  );
  container.bind<ICourseRepository>(
    IOC_TOKENS.COURSE_REPOSITORY,
    () => new CourseRepository(new ServerSideHttpClient()),
  );
  return container;
}

export function ensureServerBindings(): void {
  serverContainer ??= buildServerContainer();
}

export function resolveServer<T>(token: IoCToken): T {
  ensureServerBindings();
  return serverContainer!.resolve<T>(token);
}
