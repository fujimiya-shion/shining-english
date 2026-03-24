"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

export interface ForgotPasswordStoreProps {
  status: AppStatus;
  email: string;
  message: string | null;
  errorMessage: string | null;
}

export interface ForgotPasswordStoreState extends ForgotPasswordStoreProps {
  setEmail: (email: string) => void;
  clearFeedback: () => void;
  forgotPassword: () => Promise<boolean>;
  reset: () => void;
}

const initState: ForgotPasswordStoreProps = {
  status: AppStatus.initial,
  email: "",
  message: null,
  errorMessage: null,
};

function resolveUserRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

function resolveErrorMessage(error?: { message?: string | null; httpStatus?: number | null } | null): string {
  return resolveApiErrorMessage(error as never);
}

export const useForgotPasswordStore = create<ForgotPasswordStoreState>((set, get) => ({
  ...initState,

  setEmail: (email) => set({ email }),
  clearFeedback: () => set({ message: null, errorMessage: null }),
  forgotPassword: async () => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({
      status: AppStatus.loading,
      message: null,
      errorMessage: null,
    });

    const repository = resolveUserRepository();
    const result = await repository.forgotPassword(get().email);

    if (!result.response) {
      set({
        status: AppStatus.error,
        message: null,
        errorMessage: resolveErrorMessage(result.exception),
      });
      return false;
    }

    set({
      status: AppStatus.success,
      message: "Nếu email tồn tại, liên kết đặt lại mật khẩu đã được gửi.",
      errorMessage: null,
    });

    return true;
  },
  reset: () => set({ ...initState }),
}));
