import { CourseFilterRequest } from '@/data/dtos/course/course.dto'

export const durationFilters = ['< 4 tuần', '4-8 tuần', '> 8 tuần']

export function formatPricePlaceholder(value: number | null | undefined, fallback: string): string {
  if (value === null || value === undefined) {
    return fallback
  }

  return `${value.toLocaleString('vi-VN')}đ`
}

export function sanitizeNumberInput(value: string): string {
  return value.replace(/[^\d]/g, '')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function parseOptionalNumber(value: string): number | undefined {
  const trimmed = sanitizeNumberInput(value.trim())
  if (trimmed === '') {
    return undefined
  }

  const parsed = Number.parseInt(trimmed, 10)
  if (Number.isNaN(parsed)) {
    return undefined
  }

  return parsed
}

export function buildVisiblePages(page: number, pageCount: number): number[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const start = Math.max(1, page - 2)
  const end = Math.min(pageCount, start + 4)
  const normalizedStart = Math.max(1, end - 4)
  const length = end - normalizedStart + 1

  return Array.from({ length }, (_, index) => normalizedStart + index)
}

export function buildCourseFilterRequest({
  categoryId,
  levelIds,
  priceMin,
  priceMax,
  page,
}: {
  categoryId?: number
  levelIds: number[]
  priceMin?: number
  priceMax?: number
  page: number
}) {
  return new CourseFilterRequest(
    categoryId,
    undefined,
    levelIds[0],
    priceMin,
    priceMax,
    undefined,
    page
  )
}
