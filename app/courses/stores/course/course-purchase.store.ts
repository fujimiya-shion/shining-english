"use client";

import { create } from "zustand";
import { ICartRepository } from "@/data/repositories/remote/cart/cart.repository.interface";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { IStarRepository } from "@/data/repositories/remote/star/star.repository.interface";
import { IOrderRepository } from "@/data/repositories/remote/order/order.repository.interface";
import { CartInvalidatedEvent } from "@/infra/events/events/cart-invalidated.event";
import { EventBus } from "@/infra/events/event-bus";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { useStarStore } from "@/shared/stores/star.store";

type AuthPromptAction = "buy_now" | "add_to_cart" | null;

export interface CoursePurchaseStoreProps {
  status: AppStatus;
  actionStatus: AppStatus;
  enrolled: boolean;
  pendingAccess: boolean;
  inCart: boolean;
  isFreeCourse: boolean;
  canEnrollFree: boolean;
  allowStarPayment: boolean;
  starPrice: number;
  starBalance: number;
  loginPromptOpen: boolean;
  loginPromptAction: AuthPromptAction;
  message: string | null;
  errorMessage: string | null;
}

export interface CoursePurchaseStoreState extends CoursePurchaseStoreProps {
  syncAccess: (courseId: number) => Promise<boolean>;
  addToCart: (courseId: number) => Promise<boolean>;
  activateFreeCourse: (courseId: number) => Promise<boolean>;
  payWithStars: (courseId: number) => Promise<boolean>;
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
  allowStarPayment: false,
  starPrice: 0,
  starBalance: 0,
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

function resolveStarRepository(): IStarRepository {
  return resolveClient<IStarRepository>(IOC_TOKENS.STAR_REPOSITORY);
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
        allowStarPayment: false,
        starPrice: 0,
        starBalance: 0,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    const data = result.response.data;

    set({
      status: AppStatus.done,
      enrolled: data.enrolled,
      pendingAccess: data.pendingAccess,
      inCart: data.inCart,
      isFreeCourse: data.isFreeCourse,
      canEnrollFree: data.canEnrollFree,
      allowStarPayment: data.allowStarPayment ?? false,
      starPrice: data.starPrice ?? 0,
      starBalance: data.starBalance ?? 0,
      errorMessage: null,
    });

    useStarStore.getState().syncBalance(data.starBalance);
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

    const data = accessResult.response.data;
    set({
      actionStatus: AppStatus.success,
      enrolled: data.enrolled,
      pendingAccess: data.pendingAccess,
      inCart: data.inCart,
      isFreeCourse: data.isFreeCourse,
      canEnrollFree: data.canEnrollFree,
      allowStarPayment: data.allowStarPayment ?? false,
      starPrice: data.starPrice ?? 0,
      starBalance: data.starBalance ?? 0,
      message: "Kích hoạt khóa học miễn phí thành công.",
      errorMessage: null,
    });

    return true;
  },

  payWithStars: async (courseId) => {
    set({
      actionStatus: AppStatus.loading,
      message: null,
      errorMessage: null,
    });

    const result = await resolveStarRepository().payForCourse(courseId);

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
      enrolled: true,
      message: "Mở khóa học bằng sao thành công.",
      errorMessage: null,
    });

    useStarStore.getState().syncBalance(result.response.data.star_balance);
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
