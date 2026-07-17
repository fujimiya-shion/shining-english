'use client'

import { useEffect } from 'react'
import { useNotificationStore } from '@/shared/stores/notification.store'
import { NotificationItem } from '@/shared/components/ui/notification/notification-item'
import { AppStatus } from '@/shared/enums/app-status'
import { AuthRequiredGuard } from '@/shared/components/auth/client-auth-guard'
import { Bell, CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react'

function NotificationListPage() {
  const {
    list,
    status,
    currentPage,
    lastPage,
    unreadCount,
    fetchList,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore()

  useEffect(() => {
    void fetchList(1)
  }, [fetchList])

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Thông báo</h1>
          {unreadCount > 0 ? (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-(--brand-900) px-2 text-xs font-semibold text-white">
              {unreadCount}
            </span>
          ) : null}
        </div>
        {unreadCount > 0 ? (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
            onClick={() => void markAllAsRead()}
          >
            <CheckCheck className="h-4 w-4" />
            Đã đọc tất cả
          </button>
        ) : null}
      </div>

      <div className="space-y-1">
        {status === AppStatus.loading && list.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-sm text-muted-foreground">Đang tải...</span>
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="mb-3 h-12 w-12 text-muted-foreground/30" />
            <span className="text-sm text-muted-foreground">Không có thông báo</span>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-2xl border border-border">
            {list.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={(id) => void markAsRead(id)}
                isFullWidth
              />
            ))}
          </div>
        )}
      </div>

      {lastPage > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary disabled:opacity-40"
            disabled={currentPage <= 1}
            onClick={() => void fetchList(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Trước
          </button>
          <span className="text-sm text-muted-foreground">
            Trang {currentPage} / {lastPage}
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary disabled:opacity-40"
            disabled={currentPage >= lastPage}
            onClick={() => void fetchList(currentPage + 1)}
          >
            Sau
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <AuthRequiredGuard redirectTo="/login">
      <NotificationListPage />
    </AuthRequiredGuard>
  )
}
