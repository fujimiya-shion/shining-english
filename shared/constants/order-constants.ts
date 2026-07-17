export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  cancelled: 'Đã hủy',
}

export const ORDER_STATUS_COLOR: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  paid: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
}

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  payos: 'Chuyển khoản / Thẻ tín dụng',
  cod: 'Thanh toán thủ công',
  star: 'Thanh toán bằng sao',
}

export function formatPaymentMethod(method?: string | null): string {
  return method ? (PAYMENT_METHOD_LABEL[method] ?? method) : '---'
}

export function formatOrderCode(id?: number | string | null): string {
  const numericId = typeof id === 'string' ? Number(id) : id
  return numericId && Number.isFinite(numericId) ? `#SE${numericId}` : ''
}
