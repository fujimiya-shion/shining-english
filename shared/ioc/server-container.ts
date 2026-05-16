import "server-only";

import { ServerSideHttpClient } from "@/infra/http/server-side-http.client";
import { UserRepository } from "@/data/repositories/remote/user/user.repository";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { ICityRepository } from "@/data/repositories/remote/city/city.repository.interface";
import { CityRepository } from "@/data/repositories/remote/city/city.repository";
import { IDashboardRepository } from "@/data/repositories/remote/dashboard/dashboard.repository.interface";
import { DashboardRepository } from "@/data/repositories/remote/dashboard/dashboard.repository";
import { IoCContainer } from "./ioc-container";
import { IOC_TOKENS, IoCToken } from "./tokens";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { CourseRepository } from "@/data/repositories/remote/course/course.repository";
import { ILessonNoteRepository } from '@/data/repositories/remote/lesson-note/lesson-note.repository.interface'
import { LessonNoteRepository } from '@/data/repositories/remote/lesson-note/lesson-note.repository'
import { EventBus } from "@/infra/events/event-bus";
import { EventManager } from "@/infra/events/event-manager";
import { IContactRepository } from "@/data/repositories/remote/contact/contact.repository.interface";
import { ContactRepository } from "@/data/repositories/remote/contact/contact.repository";

let serverContainer: IoCContainer | null = null;

function buildServerContainer(): IoCContainer {
  const container = new IoCContainer();
  const eventManager = new EventManager();
  const eventBus = new EventBus(eventManager);

  container.bind<IUserRepository>(
    IOC_TOKENS.USER_REPOSITORY,
    () => new UserRepository(new ServerSideHttpClient()),
  );
  container.bind<ICityRepository>(
    IOC_TOKENS.CITY_REPOSITORY,
    () => new CityRepository(new ServerSideHttpClient()),
  );
  container.bind<IDashboardRepository>(
    IOC_TOKENS.DASHBOARD_REPOSITORY,
    () => new DashboardRepository(new ServerSideHttpClient()),
  );
  container.bind<ICourseRepository>(
    IOC_TOKENS.COURSE_REPOSITORY,
    () => new CourseRepository(new ServerSideHttpClient()),
  );
  container.bind<ILessonNoteRepository>(
    IOC_TOKENS.LESSON_NOTE_REPOSITORY,
    () => new LessonNoteRepository(new ServerSideHttpClient()),
  );
  container.bind<IContactRepository>(
    IOC_TOKENS.CONTACT_REPOSITORY,
    () => new ContactRepository(new ServerSideHttpClient()),
  );
  container.bind<EventManager>(
    IOC_TOKENS.EVENT_MANAGER,
    () => eventManager,
  );
  container.bind<EventBus>(
    IOC_TOKENS.EVENT_BUS,
    () => eventBus,
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
