export abstract class Event {
  readonly occurredAt: Date

  protected constructor() {
    this.occurredAt = new Date()
  }
}
