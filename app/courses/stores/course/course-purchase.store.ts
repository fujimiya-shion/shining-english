"use client";

import { create } from "zustand";
import { ICartRepository } from "@/data/repositories/remote/cart/cart.repository.interface";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
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
  loginPromptOpen: boolean;
  loginPromptAction: AuthPromptAction;
  message: string | null;
  errorMessage: string | null;
}

export interface CoursePurchaseStoreState extends CoursePurchaseStoreProps {
  syncAccess: (courseId: number) => Promise<boolean>;
  addToCart: (courseId: number) => Promise<boolean>;
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
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      status: AppStatus.done,
      enrolled: result.response.data.enrolled,
      pendingAccess: result.response.data.pendingAccess,
      inCart: result.response.data.inCart,
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
      message: "Đã thêm khóa học vào giỏ hàng.",
      errorMessage: null,
    });

    const eventBus = resolveEventBus();
    eventBus.emit(new CartInvalidatedEvent('course_purchase', courseId));
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
