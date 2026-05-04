"use client";

import { create } from "zustand";
import { ICartRepository } from "@/data/repositories/remote/cart/cart.repository.interface";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { IOrderRepository } from "@/data/repositories/remote/order/order.repository.interface";
import { CartInvalidatedEvent } from "@/infra/events/events/cart-invalidated.event";
import { EventBus } from "@/infra/events/event-bus";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

type AuthPromptAction = "buy_now" | "add_to_cart" | null;

export interface CoursePurchaseStoreProps {
  status: AppStatus;
  actionStatus: AppStatus;
  enrolled: boolean;
  pendingAccess: boolean;
  inCart: boolean;
  isFreeCourse: boolean;
  canEnrollFree: boolean;
  loginPromptOpen: boolean;
  loginPromptAction: AuthPromptAction;
  message: string | null;
  errorMessage: string | null;
}

export interface CoursePurchaseStoreState extends CoursePurchaseStoreProps {
  syncAccess: (courseId: number) => Promise<boolean>;
  addToCart: (courseId: number) => Promise<boolean>;
  activateFreeCourse: (courseId: number) => Promise<boolean>;
  openLoginPrompt: (action: Exclude<AuthPromptAction, null>) => void;
  closeLoginPrompt: () => void;
  clearFeedback: () => void;
  reset: () => void;
}

const initState: CoursePurchaseStoreProps = {
  status: AppStatus.initial,
  actionStatus: AppStatus.initial,
  enrolled: false,
  pendingAccess: false,
  inCart: false,
  isFreeCourse: false,
  canEnrollFree: false,
  loginPromptOpen: false,
  loginPromptAction: null,
  message: null,
  errorMessage: null,
};

function resolveCourseRepository(): ICourseRepository {
  return resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY);
}

function resolveCartRepository(): ICartRepository {
  return resolveClient<ICartRepository>(IOC_TOKENS.CART_REPOSITORY);
}

function resolveOrderRepository(): IOrderRepository {
  return resolveClient<IOrderRepository>(IOC_TOKENS.ORDER_REPOSITORY);
}

function resolveEventBus(): EventBus {
  return resolveClient<EventBus>(IOC_TOKENS.EVENT_BUS);
}

export const useCoursePurchaseStore = create<CoursePurchaseStoreState>((set) => ({
  ...initState,

  syncAccess: async (courseId) => {
    set({
      status: AppStatus.loading,
      errorMessage: null,
    });

    const result = await resolveCourseRepository().getAccess(courseId);

    if (!result.response) {
      set({
        status: AppStatus.error,
        enrolled: false,
        pendingAccess: false,
        inCart: false,
        isFreeCourse: false,
        canEnrollFree: false,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      status: AppStatus.done,
      enrolled: result.response.data.enrolled,
      pendingAccess: result.response.data.pendingAccess,
      inCart: result.response.data.inCart,
      isFreeCourse: result.response.data.isFreeCourse,
      canEnrollFree: result.response.data.canEnrollFree,
      errorMessage: null,
    });
    return true;
  },

  addToCart: async (courseId) => {
    set({
      actionStatus: AppStatus.loading,
      message: null,
      errorMessage: null,
    });

    const result = await resolveCartRepository().addCourse(courseId);

    if (!result.response) {
      set({
        actionStatus: AppStatus.error,
        message: null,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      actionStatus: AppStatus.success,
      inCart: result.response.data.inCart,
      enrolled: result.response.data.enrolled,
      pendingAccess: result.response.data.pendingAccess,
      isFreeCourse: result.response.data.isFreeCourse,
      canEnrollFree: result.response.data.canEnrollFree,
      message: "Đã thêm khóa học vào giỏ hàng.",
      errorMessage: null,
    });

    const eventBus = resolveEventBus();
    eventBus.emit(new CartInvalidatedEvent('course_purchase', courseId));
    return true;
  },

  activateFreeCourse: async (courseId) => {
    set({
      actionStatus: AppStatus.loading,
      message: null,
      errorMessage: null,
    });

    const orderResult = await resolveOrderRepository().createBuyNow(courseId, 1, "cod");
    if (!orderResult.response) {
      set({
        actionStatus: AppStatus.error,
        message: null,
        errorMessage: resolveApiErrorMessage(orderResult.exception),
      });
      return false;
    }

    const accessResult = await resolveCourseRepository().getAccess(courseId);
    if (!accessResult.response) {
      set({
        actionStatus: AppStatus.error,
        message: null,
        errorMessage: resolveApiErrorMessage(accessResult.exception),
      });
      return false;
    }

    set({
      actionStatus: AppStatus.success,
      enrolled: accessResult.response.data.enrolled,
      pendingAccess: accessResult.response.data.pendingAccess,
      inCart: accessResult.response.data.inCart,
      isFreeCourse: accessResult.response.data.isFreeCourse,
      canEnrollFree: accessResult.response.data.canEnrollFree,
      message: "Kích hoạt khóa học miễn phí thành công.",
      errorMessage: null,
    });

    return true;
  },

  openLoginPrompt: (action) =>
    set({
      loginPromptOpen: true,
      loginPromptAction: action,
      message: null,
      errorMessage: null,
    }),

  closeLoginPrompt: () =>
    set({
      loginPromptOpen: false,
      loginPromptAction: null,
    }),

  clearFeedback: () =>
    set({
      message: null,
      errorMessage: null,
    }),

  reset: () => set({ ...initState }),
}));
