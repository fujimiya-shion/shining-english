'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { NotificationItem } from './notification-item'
import { useNotificationStore } from '@/shared/stores/notification.store'
import { AppStatus } from '@/shared/enums/app-status'
import Link from 'next/link'
import { Bell, CheckCheck } from 'lucide-react'

type NotificationDropdownProps = {
  onClose: () => void
  excludeRef: RefObject<HTMLDivElement | null>
}

export function NotificationDropdown({ onClose, excludeRef }: NotificationDropdownProps) {
  const {
    list,
    status,
    unreadCount,
    fetchList,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === AppStatus.initial || status === AppStatus.error) {
      void fetchList(1)
    }
  }, [status, fetchList])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (excludeRef.current?.contains(target)) {
        return
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, excludeRef])

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-background shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="text-sm font-semibold">Thông báo</span>
          {unreadCount > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-(--brand-900) px-1.5 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          ) : null}
        </div>
        {unreadCount > 0 ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
            onClick={() => void markAllAsRead()}
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Đã đọc tất cả
          </button>
        ) : null}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {status === AppStatus.loading && list.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-muted-foreground">Đang tải...</span>
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Bell className="mb-2 h-8 w-8 text-muted-foreground/40" />
            <span className="text-sm text-muted-foreground">Không có thông báo</span>
          </div>
        ) : (
          list.slice(0, 10).map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={(id) => void markAsRead(id)}
            />
          ))
        )}
      </div>

      <div className="border-t border-border px-4 py-2.5">
        <Link
          href="/notifications"
          className="block text-center text-xs font-medium text-muted-foreground hover:text-primary"
          onClick={onClose}
        >
          Xem tất cả thông báo
        </Link>
      </div>
    </div>
  )
}
