export function formatRelativeTime(value?: string): string {
  if (!value) {
    return 'Vừa xong'
  }

  const time = new Date(value)
  if (Number.isNaN(time.getTime())) {
    return 'Vừa xong'
  }

  const diffMs = Date.now() - time.getTime()
  const minute = 60_000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day

  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute))
    return `${minutes} phút trước`
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour)
    return `${hours} giờ trước`
  }

  if (diffMs < month) {
    const days = Math.floor(diffMs / day)
    return `${days} ngày trước`
  }

  const months = Math.floor(diffMs / month)
  return `${months} tháng trước`
}
