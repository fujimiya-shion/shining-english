'use client'

import { useEffect, useMemo } from 'react'
import { useCartPageStore } from '@/app/cart/stores/cart-page.store'
import { AppConfirmModal } from '@/shared/components/ui/app-confirm-modal'
import { AppStatus } from '@/shared/enums/app-status'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useCartStore } from '@/shared/stores/cart.store'
import { resolveReturnToFromReferrer } from '@/shared/utils/return-to-utils'
import {
  CartEmptyState,
  CartGuestState,
  CartItemsSection,
  CartSummaryCard,
} from './cart-page-sections'

export function CartPageClient() {
  const authStatus = useAuthStore((state) => state.status)
  const authenticated = useAuthStore((state) => state.authenticated)
  const cartStatus = useCartStore((state) => state.status)
  const actionStatus = useCartStore((state) => state.actionStatus)
  const items = useCartStore((state) => state.items)
  const fetchItems = useCartStore((state) => state.fetchItems)
  const clearCart = useCartStore((state) => state.clearCart)
  const removeCourse = useCartStore((state) => state.removeCourse)

  const selectedCourseIds = useCartPageStore((state) => state.selectedCourseIds)
  const syncSelection = useCartPageStore((state) => state.syncSelection)
  const toggleAll = useCartPageStore((state) => state.toggleAll)
  const toggleCourse = useCartPageStore((state) => state.toggleCourse)
  const removeSelection = useCartPageStore((state) => state.removeSelection)
  const confirmAction = useCartPageStore((state) => state.confirmAction)
  const confirmCourseId = useCartPageStore((state) => state.confirmCourseId)
  const confirmOpen = useCartPageStore((state) => state.confirmOpen)
  const openRemoveCourseConfirm = useCartPageStore((state) => state.openRemoveCourseConfirm)
  const openRemoveSelectedConfirm = useCartPageStore((state) => state.openRemoveSelectedConfirm)
  const openClearConfirm = useCartPageStore((state) => state.openClearConfirm)
  const closeConfirm = useCartPageStore((state) => state.closeConfirm)

  useEffect(() => {
    if (!authenticated) {
      return
    }

    if (cartStatus === AppStatus.initial) {
      void fetchItems()
    }
  }, [authenticated, cartStatus, fetchItems])

  useEffect(() => {
    syncSelection(items)
  }, [items, syncSelection])

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + (item.course?.price ?? 0) * Math.max(1, item.quantity ?? 1), 0),
    [items],
  )

  const handleRemoveSelected = async () => {
    const courseIds = [...selectedCourseIds]
    const removedCourseIds: number[] = []

    for (const courseId of courseIds) {
      const removed = await removeCourse(courseId)
      if (!removed) {
        break
      }

      removedCourseIds.push(courseId)
    }

    if (removedCourseIds.length > 0) {
      removeSelection(removedCourseIds)
    }
  }

  const handleConfirmAction = async () => {
    if (confirmAction === 'remove_single' && confirmCourseId) {
      await removeCourse(confirmCourseId)
      closeConfirm()
      return
    }

    if (confirmAction === 'remove_selected') {
      await handleRemoveSelected()
      closeConfirm()
      return
    }

    if (confirmAction === 'clear_all') {
      await clearCart()
      closeConfirm()
    }
  }

  const confirmConfig =
    confirmAction === 'remove_single'
      ? {
          message: 'Xóa khóa học',
          title: 'Xóa khóa học khỏi giỏ?',
          description: 'Khóa học này sẽ bị gỡ khỏi giỏ hàng hiện tại của bạn.',
          confirmText: 'Xóa',
        }
      : confirmAction === 'remove_selected'
        ? {
            message: 'Xóa mục đã chọn',
            title: 'Xóa các mục đã chọn?',
            description: `Bạn sắp xóa ${selectedCourseIds.length} khóa học đã chọn khỏi giỏ hàng.`,
            confirmText: 'Xóa đã chọn',
          }
        : {
            message: 'Làm trống giỏ hàng',
            title: 'Xóa toàn bộ giỏ hàng?',
            description: 'Toàn bộ khóa học trong giỏ sẽ bị gỡ khỏi phiên hiện tại.',
            confirmText: 'Xóa tất cả',
          }

  if (authStatus === AppStatus.initial || authStatus === AppStatus.loading) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full rounded-3xl border border-border/70 bg-white/90 p-10 text-center text-muted-foreground">
            Đang kiểm tra phiên đăng nhập...
          </div>
        </div>
      </main>
    )
  }

  if (!authenticated) {
    const returnTo = resolveReturnToFromReferrer('/cart')

    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <CartGuestState returnTo={returnTo} />
        </div>
      </main>
    )
  }

  if (cartStatus === AppStatus.initial || cartStatus === AppStatus.loading) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full rounded-3xl border border-border/70 bg-white/90 p-10 text-center text-muted-foreground">
            Đang tải giỏ hàng...
          </div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <CartEmptyState />
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <CartItemsSection
              items={items}
              selectedCourseIds={selectedCourseIds}
              onToggleAll={() => toggleAll(items)}
              onToggleCourse={toggleCourse}
              onRemoveCourse={openRemoveCourseConfirm}
            />
            <CartSummaryCard
              actionLoading={actionStatus === AppStatus.loading}
              itemsCount={items.length}
              selectedCount={selectedCourseIds.length}
              subtotal={subtotal}
              onRemoveSelected={openRemoveSelectedConfirm}
              onClear={openClearConfirm}
            />
          </div>
        </div>
      </main>
      <AppConfirmModal
        open={confirmOpen}
        message={confirmConfig.message}
        title={confirmConfig.title}
        description={confirmConfig.description}
        confirmText={confirmConfig.confirmText}
        cancelText="Hủy"
        onConfirm={() => {
          void handleConfirmAction()
        }}
        onCancal={closeConfirm}
      />
    </>
  )
}
