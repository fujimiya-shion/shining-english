export class NotificationModel {
  id!: string
  type!: string
  title!: string
  body!: string
  data!: Record<string, unknown>
  readAt!: Date | null
  createdAt!: Date

  get isRead(): boolean {
    return this.readAt !== null
  }
}
