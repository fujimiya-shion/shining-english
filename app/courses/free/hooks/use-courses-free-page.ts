'use client'

import { AppStatus } from '@/shared/enums/app-status'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCourseFilterStore } from '@/app/courses/stores/course/course-filter.store'
import { CourseFilterRequest } from '@/data/dtos/course/course.dto'
import { Course } from '@/data/models/course.model'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { ICourseRepository } from '@/data/repositories/remote/course/course.repository.interface'
import { buildVisiblePages } from '@/app/courses/utils/course-page-utils'

export function useCoursesFreePage() {
  const { filterProps, initial: initialFilterProps, status: filterStatus } = useCourseFilterStore()

  const categories = filterProps?.categories ?? []
  const levels = filterProps?.levels ?? []
  const durationOptions = filterProps?.durationHours ?? []

  const [courses, setCourses] = useState<Course[]>([])
  const [status, setStatus] = useState(AppStatus.initial)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined)
  const [selectedLevelIds, setSelectedLevelIds] = useState<number[]>([])
  const [selectedDurationKeys, setSelectedDurationKeys] = useState<string[]>([])

  const activeCategory = categories.find((item) => item.id === selectedCategoryId)
  const activeLevels = levels.filter(
    (item) => item.value !== undefined && selectedLevelIds.includes(item.value),
  )
  const activeDurations = durationOptions.filter(
    (item) =>
      item.minHours !== undefined &&
      item.maxHours !== undefined &&
      selectedDurationKeys.includes(`${item.minHours ?? 'n'}-${item.maxHours ?? 'n'}`),
  )

  const selectedFilters = [
    activeCategory?.name,
    ...activeLevels.map((item) => item.label),
    ...activeDurations.map((item) => item.label),
  ].filter((item): item is string => Boolean(item))

  const hasAnyFilters = selectedCategoryId !== undefined || selectedLevelIds.length > 0 || selectedDurationKeys.length > 0

  const fetchFreeCourses = useCallback(async (targetPage: number, categoryId?: number, levelIds: number[] = [], durationKeys: string[] = []) => {
    setStatus(AppStatus.loading)

    const selectedDurations = durationOptions.filter((item) => {
      if (item.minHours === undefined || item.maxHours === undefined) return false
      return durationKeys.includes(`${item.minHours ?? 'n'}-${item.maxHours ?? 'n'}`)
    })
    const durationMinHours = selectedDurations.length > 0
      ? Math.min(...selectedDurations.map((item) => item.minHours ?? 0))
      : undefined
    const durationMaxHours = selectedDurations.length > 0
      ? Math.max(...selectedDurations.map((item) => item.maxHours ?? 0))
      : undefined

    const request = new CourseFilterRequest(
      categoryId,
      undefined,
      levelIds[0],
      undefined,
      0,
      durationMinHours,
      durationMaxHours,
      undefined,
      targetPage,
    )

    const courseRepo = resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY)
    const apiResult = await courseRepo.filter(request)

    apiResult.when({
      success: (response) => {
        setCourses(response.data)
        setPage(response.page)
        setPageCount(response.pageCount)
        setStatus(AppStatus.done)
      },
      error: () => {
        setStatus(AppStatus.error)
      },
    })
  }, [durationOptions])

  useEffect(() => {
    if (status !== AppStatus.initial) return
    void initialFilterProps()
    void fetchFreeCourses(1)
  }, [status, initialFilterProps, fetchFreeCourses])

  useEffect(() => {
    if (status === AppStatus.error || filterStatus === AppStatus.error) {
      toast.error('Không thể tải danh sách khóa học. Vui lòng thử lại.')
    }
  }, [status, filterStatus])

  const toggleCategory = async (categoryId?: number) => {
    const nextId = selectedCategoryId === categoryId ? undefined : categoryId
    setSelectedCategoryId(nextId)
    await fetchFreeCourses(1, nextId, selectedLevelIds, selectedDurationKeys)
  }

  const toggleLevel = async (levelValue?: number) => {
    if (levelValue === undefined) return
    const nextIds = selectedLevelIds.includes(levelValue)
      ? selectedLevelIds.filter((id) => id !== levelValue)
      : [...selectedLevelIds, levelValue]
    setSelectedLevelIds(nextIds)
    await fetchFreeCourses(1, selectedCategoryId, nextIds, selectedDurationKeys)
  }

  const toggleDuration = async (minHours?: number | null, maxHours?: number | null) => {
    if (minHours === undefined || maxHours === undefined || minHours === null || maxHours === null) return
    const key = `${minHours}-${maxHours}`
    const nextKeys = selectedDurationKeys.includes(key)
      ? selectedDurationKeys.filter((item) => item !== key)
      : [...selectedDurationKeys, key]
    setSelectedDurationKeys(nextKeys)
    await fetchFreeCourses(1, selectedCategoryId, selectedLevelIds, nextKeys)
  }

  const resetFilters = async () => {
    setSelectedCategoryId(undefined)
    setSelectedLevelIds([])
    setSelectedDurationKeys([])
    await fetchFreeCourses(1)
  }

  const handlePageChange = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > pageCount || nextPage === page) return
    await fetchFreeCourses(nextPage, selectedCategoryId, selectedLevelIds, selectedDurationKeys)
  }

  const visiblePages = useMemo(() => buildVisiblePages(page, pageCount), [page, pageCount])

  return {
    categories,
    courses,
    durationOptions,
    filterStatus,
    handlePageChange,
    hasAnyFilters,
    levels,
    page,
    pageCount,
    resetFilters,
    selectedCategoryId,
    selectedDurationKeys,
    selectedFilters,
    selectedLevelIds,
    status,
    toggleCategory,
    toggleDuration,
    toggleLevel,
    visiblePages,
  }
}
