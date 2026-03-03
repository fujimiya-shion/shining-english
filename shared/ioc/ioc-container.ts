import { IoCToken } from "./tokens";

type Factory<T> = () => T;

export class IoCContainer {
  private readonly factories = new Map<IoCToken, Factory<unknown>>();

  bind<T>(token: IoCToken, factory: Factory<T>): void {
    this.factories.set(token, factory as Factory<unknown>);
  }

  resolve<T>(token: IoCToken): T {
    const factory = this.factories.get(token);
    if (!factory) {
      throw new Error("Missing binding for requested token");
    }

    return factory() as T;
  }
}
