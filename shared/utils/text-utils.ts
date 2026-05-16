export function toPlainText(value?: string | null): string {
  if (!value) {
    return ''
  }

  const trimmed = value.trim()
  if (trimmed === '') {
    return ''
  }

  if (typeof window === 'undefined') {
    return trimmed
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const doc = new DOMParser().parseFromString(trimmed, 'text/html')

  return (doc.body.textContent ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}
