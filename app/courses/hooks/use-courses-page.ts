'use client'

import { AppStatus } from '@/shared/enums/app-status'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCourseFilterStore } from '../stores/course/course-filter.store'
import { useCourseStore } from '../stores/course/course.store'
import {
  buildCourseFilterRequest,
  buildVisiblePages,
  clamp,
  parseOptionalNumber,
  sanitizeNumberInput,
} from '../utils/course-page-utils'

type ApplyFiltersOverrides = {
  categoryId?: number
  levelIds?: number[]
  priceMin?: string
  priceMax?: string
  query?: string
  page?: number
}

export function useCoursesPage() {
  const {
    courses,
    initial: initialCourses,
    status: coursesStatus,
    page,
    pageCount,
    setPage,
    fetchCourses,
    filterCourses,
  } = useCourseStore()
  const { filterProps, initial: initialFilterProps, status: filterStatus } = useCourseFilterStore()

  const categories = filterProps?.categories ?? []
  const levels = filterProps?.levels ?? []

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined)
  const [selectedLevelIds, setSelectedLevelIds] = useState<number[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [priceMinInput, setPriceMinInput] = useState('')
  const [priceMaxInput, setPriceMaxInput] = useState('')

  const priceBoundMin = filterProps?.price?.min ?? 0
  const rawPriceBoundMax = filterProps?.price?.max ?? 0
  const priceBoundMax = rawPriceBoundMax > priceBoundMin ? rawPriceBoundMax : priceBoundMin + 1

  const activeCategory = categories.find((item) => item.id === selectedCategoryId)
  const activeLevels = levels.filter(
    (item) => item.value !== undefined && selectedLevelIds.includes(item.value)
  )

  const selectedFilters = [
    activeCategory?.name,
    ...activeLevels.map((item) => item.label),
  ].filter((item): item is string => Boolean(item))

  const hasAnyFilters = useMemo(() => {
    return (
      selectedCategoryId !== undefined ||
      selectedLevelIds.length > 0 ||
      searchKeyword.trim() !== '' ||
      priceMinInput.trim() !== '' ||
      priceMaxInput.trim() !== ''
    )
  }, [priceMaxInput, priceMinInput, searchKeyword, selectedCategoryId, selectedLevelIds])

  const parsedMinPrice = parseOptionalNumber(priceMinInput)
  const parsedMaxPrice = parseOptionalNumber(priceMaxInput)
  const sliderMinValue = clamp(
    parsedMinPrice ?? priceBoundMin,
    priceBoundMin,
    parsedMaxPrice ?? priceBoundMax
  )
  const sliderMaxValue = clamp(
    parsedMaxPrice ?? priceBoundMax,
    sliderMinValue,
    priceBoundMax
  )
  const sliderLeftPercent = ((sliderMinValue - priceBoundMin) / (priceBoundMax - priceBoundMin)) * 100
  const sliderWidthPercent = ((sliderMaxValue - sliderMinValue) / (priceBoundMax - priceBoundMin)) * 100

  const applyFilters = async (overrides?: ApplyFiltersOverrides) => {
    const categoryId =
      overrides && 'categoryId' in overrides ? overrides.categoryId : selectedCategoryId
    const levelIds =
      overrides && 'levelIds' in overrides ? overrides.levelIds ?? [] : selectedLevelIds
    const priceMinRaw =
      overrides && 'priceMin' in overrides ? overrides.priceMin ?? '' : priceMinInput
    const priceMaxRaw =
      overrides && 'priceMax' in overrides ? overrides.priceMax ?? '' : priceMaxInput
    const queryRaw = overrides && 'query' in overrides ? overrides.query ?? '' : searchKeyword
    const targetPage = overrides?.page ?? page
    const priceMin = parseOptionalNumber(priceMinRaw)
    const priceMax = parseOptionalNumber(priceMaxRaw)
    const query = queryRaw.trim() === '' ? undefined : queryRaw.trim()

    if (
      categoryId === undefined &&
      levelIds.length === 0 &&
      query === undefined &&
      priceMin === undefined &&
      priceMax === undefined
    ) {
      setPage(targetPage)
      await fetchCourses()
      return
    }

    setPage(targetPage)
    await filterCourses(
      buildCourseFilterRequest({
        categoryId,
        levelIds,
        priceMin,
        priceMax,
        query,
        page: targetPage,
      })
    )
  }

  const handlePageChange = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > pageCount || nextPage === page) {
      return
    }

    await applyFilters({ page: nextPage })
  }

  const resetFilters = async () => {
    setSelectedCategoryId(undefined)
    setSelectedLevelIds([])
    setSearchKeyword('')
    setPriceMinInput('')
    setPriceMaxInput('')
    setPage(1)
    await fetchCourses()
  }

  const toggleLevel = async (levelValue?: number) => {
    if (levelValue === undefined) {
      return
    }

    const nextLevelIds = selectedLevelIds.includes(levelValue)
      ? selectedLevelIds.filter((id) => id !== levelValue)
      : [...selectedLevelIds, levelValue]

    setSelectedLevelIds(nextLevelIds)
    await applyFilters({ levelIds: nextLevelIds, page: 1 })
  }

  const toggleCategory = async (categoryId?: number) => {
    const nextCategoryId = selectedCategoryId === categoryId ? undefined : categoryId
    setSelectedCategoryId(nextCategoryId)
    await applyFilters({ categoryId: nextCategoryId, page: 1 })
  }

  const updatePriceMinInput = (value: string) => {
    setPriceMinInput(sanitizeNumberInput(value))
  }

  const updatePriceMaxInput = (value: string) => {
    setPriceMaxInput(sanitizeNumberInput(value))
  }

  const setPriceMinFromSlider = (value: number) => {
    const nextMin = Math.min(value, sliderMaxValue)
    setPriceMinInput(String(nextMin))
  }

  const setPriceMaxFromSlider = (value: number) => {
    const nextMax = Math.max(value, sliderMinValue)
    setPriceMaxInput(String(nextMax))
  }

  useEffect(() => {
    void initialCourses()
    void initialFilterProps()
  }, [initialCourses, initialFilterProps])

  useEffect(() => {
    if (coursesStatus === AppStatus.error || filterStatus === AppStatus.error) {
      toast.error('Không thể tải danh sách khóa học. Vui lòng thử lại.')
    }
  }, [coursesStatus, filterStatus])

  return {
    activeCategory,
    applyFilters,
    categories,
    courses,
    coursesStatus,
    filterProps,
    filterStatus,
    handlePageChange,
    hasAnyFilters,
    levels,
    page,
    pageCount,
    parsedMaxPrice,
    parsedMinPrice,
    priceBoundMax,
    priceBoundMin,
    priceMaxInput,
    priceMinInput,
    searchKeyword,
    resetFilters,
    selectedCategoryId,
    selectedFilters,
    selectedLevelIds,
    setPriceMaxFromSlider,
    setPriceMinFromSlider,
    setSearchKeyword,
    sliderLeftPercent,
    sliderMaxValue,
    sliderMinValue,
    sliderWidthPercent,
    toggleCategory,
    toggleLevel,
    updatePriceMaxInput,
    updatePriceMinInput,
    visiblePages: buildVisiblePages(page, pageCount),
  }
}
