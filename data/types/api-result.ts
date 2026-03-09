export class ApiResult<T, V> {
  constructor(
    public readonly response?: T,
    public readonly exception?: V,
  ) {}

  when(handlers: {
    success?: (response: T) => void;
    error?: (exception: V) => void;
  }): void {
    if (this.response !== undefined) {
      handlers.success?.(this.response);
      return;
    }

    if (this.exception !== undefined) {
      handlers.error?.(this.exception);
    }
  }
}
