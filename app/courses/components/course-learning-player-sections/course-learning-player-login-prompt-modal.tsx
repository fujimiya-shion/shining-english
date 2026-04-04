'use client'

import { AppConfirmModal } from '@/shared/components/ui/app-confirm-modal'

export function CourseLearningPlayerLoginPromptModal({
  open,
  onClose,
  onLogin,
}: {
  open: boolean
  onClose: () => void
  onLogin: () => void
}) {
  if (!open) {
    return null
  }

  return (
    <AppConfirmModal
      open={open}
      message="Yêu cầu đăng nhập"
      title="Đăng nhập để tiếp tục"
      description="Bạn cần đăng nhập để mua khóa học này, thêm vào giỏ hàng và đồng bộ tiến độ học tập."
      confirmText="Đăng nhập"
      cancelText="Để sau"
      onConfirm={onLogin}
      onCancal={onClose}
    />
  )
}
