import { ClientSideHttpClient } from "@/infra/http/client-side-http.client";
import { UserRepository } from "@/data/repositories/remote/user/user.repository";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { IoCContainer } from "./ioc-container";
import { IOC_TOKENS, IoCToken } from "./tokens";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { CourseRepository } from "@/data/repositories/remote/course/course.repository";
import { ICartRepository } from "@/data/repositories/remote/cart/cart.repository.interface";
import { CartRepository } from "@/data/repositories/remote/cart/cart.repository";
import { IOrderRepository } from "@/data/repositories/remote/order/order.repository.interface";
import { OrderRepository } from "@/data/repositories/remote/order/order.repository";
import { EventManager } from "@/infra/events/event-manager";
import { EventBus } from "@/infra/events/event-bus";

let clientContainer: IoCContainer | null = null;

function buildClientContainer(): IoCContainer {
  const container = new IoCContainer();
  const eventManager = new EventManager();
  const eventBus = new EventBus(eventManager);

  container.bind<IUserRepository>(
    IOC_TOKENS.USER_REPOSITORY,
    () => new UserRepository(new ClientSideHttpClient()),
  );

  container.bind<ICourseRepository>(
    IOC_TOKENS.COURSE_REPOSITORY,
    () => new CourseRepository(new ClientSideHttpClient()),
  );

  container.bind<ICartRepository>(
    IOC_TOKENS.CART_REPOSITORY,
    () => new CartRepository(new ClientSideHttpClient()),
  );

  container.bind<IOrderRepository>(
    IOC_TOKENS.ORDER_REPOSITORY,
    () => new OrderRepository(new ClientSideHttpClient()),
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

export function ensureClientBindings(): void {
  clientContainer ??= buildClientContainer();
}

export function resolveClient<T>(token: IoCToken): T {
  ensureClientBindings();
  return clientContainer!.resolve<T>(token);
}
