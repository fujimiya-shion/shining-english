'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useNotificationStore } from '@/shared/stores/notification.store'
import { AppStatus } from '@/shared/enums/app-status'
import { NotificationDropdown } from './notification-dropdown'
import { Bell } from 'lucide-react'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const unreadCount = useNotificationStore((state) => state.unreadCount)
  const fetchUnreadCount = useNotificationStore((state) => state.fetchUnreadCount)
  const status = useNotificationStore((state) => state.status)

  useEffect(() => {
    if (status === AppStatus.initial) {
      void fetchUnreadCount()
    }
  }, [status, fetchUnreadCount])

  const handleToggle = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  // Refresh unread count after dropdown closes
  useEffect(() => {
    if (!open) {
      void fetchUnreadCount()
    }
  }, [open, fetchUnreadCount])

  return (
    <div className="relative" ref={buttonRef}>
      <button
        type="button"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
        aria-label="Thông báo"
        onClick={handleToggle}
      >
        <Bell className="h-5 w-5" strokeWidth={2} />
        {unreadCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-background bg-red-500 px-0.5 text-[9px] font-bold leading-none text-white shadow-sm">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        ) : null}
      </button>
      {open ? <NotificationDropdown onClose={handleClose} excludeRef={buttonRef} /> : null}
    </div>
  )
}
