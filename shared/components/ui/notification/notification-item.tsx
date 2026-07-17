'use client'

import { NotificationModel } from '@/data/models/notification.model'
import {
  Bell,
  BookOpen,
  CheckCircle,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

const notificationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  payment_success: ShoppingBag,
  star_wallet: Sparkles,
  enrollment: BookOpen,
  lesson_completed: CheckCircle,
}

const iconColors: Record<string, string> = {
  payment_success: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  star_wallet: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
  enrollment: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
  lesson_completed: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30',
}

type NotificationItemProps = {
  notification: NotificationModel
  onMarkAsRead: (id: string) => void
  isFullWidth?: boolean
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  isFullWidth,
}: NotificationItemProps) {
  const Icon = notificationIcons[notification.type] ?? Bell
  const colorClass = iconColors[notification.type] ?? 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'

  return (
    <button
      type="button"
      className={`flex w-full gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/50 ${
        isFullWidth ? '' : 'rounded-xl'
      } ${!notification.isRead ? 'bg-primary/5' : ''}`}
      onClick={() => {
        if (!notification.isRead) {
          onMarkAsRead(notification.id)
        }
      }}
    >
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm ${!notification.isRead ? 'font-semibold' : 'font-medium text-muted-foreground'}`}>
          {notification.title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {notification.body}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/60">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
            locale: vi,
          })}
        </p>
      </div>
      {!notification.isRead ? (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-(--brand-900)" />
      ) : null}
    </button>
  )
}
