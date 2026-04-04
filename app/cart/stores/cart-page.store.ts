'use client'

import { CartItem } from '@/data/models/cart-item.model'
import { create } from 'zustand'

function resolveCourseId(item: CartItem): number {
  return Number(item.courseId ?? item.course?.id ?? 0)
}

type CartPageStoreProps = {
  selectedCourseIds: number[]
  confirmAction: 'remove_single' | 'remove_selected' | 'clear_all' | null
  confirmCourseId: number | null
  confirmOpen: boolean
}

type CartPageStoreState = CartPageStoreProps & {
  syncSelection: (items: CartItem[]) => void
  toggleCourse: (courseId: number) => void
  toggleAll: (items: CartItem[]) => void
  clearSelection: () => void
  removeSelection: (courseIds: number[]) => void
  openRemoveCourseConfirm: (courseId: number) => void
  openRemoveSelectedConfirm: () => void
  openClearConfirm: () => void
  closeConfirm: () => void
}

const initState: CartPageStoreProps = {
  selectedCourseIds: [],
  confirmAction: null,
  confirmCourseId: null,
  confirmOpen: false,
}

export const useCartPageStore = create<CartPageStoreState>((set, get) => ({
  ...initState,

  syncSelection: (items) => {
    const availableIds = new Set(items.map(resolveCourseId).filter((courseId) => courseId > 0))
    const currentSelected = get().selectedCourseIds.filter((courseId) => availableIds.has(courseId))

    set({
      selectedCourseIds:
        currentSelected.length > 0
          ? currentSelected
          : items.map(resolveCourseId).filter((courseId) => courseId > 0),
    })
  },

  toggleCourse: (courseId) =>
    set((state) => ({
      selectedCourseIds: state.selectedCourseIds.includes(courseId)
        ? state.selectedCourseIds.filter((item) => item !== courseId)
        : [...state.selectedCourseIds, courseId],
    })),

  toggleAll: (items) => {
    const nextIds = items.map(resolveCourseId).filter((courseId) => courseId > 0)
    const allSelected = nextIds.length > 0 && nextIds.every((courseId) => get().selectedCourseIds.includes(courseId))

    set({
      selectedCourseIds: allSelected ? [] : nextIds,
    })
  },

  clearSelection: () => set({ selectedCourseIds: [] }),

  removeSelection: (courseIds) =>
    set((state) => ({
      selectedCourseIds: state.selectedCourseIds.filter((courseId) => !courseIds.includes(courseId)),
    })),

  openRemoveCourseConfirm: (courseId) =>
    set({
      confirmAction: 'remove_single',
      confirmCourseId: courseId,
      confirmOpen: true,
    }),

  openRemoveSelectedConfirm: () =>
    set({
      confirmAction: 'remove_selected',
      confirmCourseId: null,
      confirmOpen: true,
    }),

  openClearConfirm: () =>
    set({
      confirmAction: 'clear_all',
      confirmCourseId: null,
      confirmOpen: true,
    }),

  closeConfirm: () =>
    set({
      confirmAction: null,
      confirmCourseId: null,
      confirmOpen: false,
    }),
}))
