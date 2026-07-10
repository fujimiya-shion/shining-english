"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { resetPasswordSchema } from "@/shared/validations/auth-schemas";

export interface ResetPasswordStoreProps {
  status: AppStatus;
  password: string;
  passwordConfirmation: string;
  message: string | null;
  errorMessage: string | null;
  localError: string | null;
  fieldErrors: Record<string, string | undefined>;
}

export interface ResetPasswordStoreState extends ResetPasswordStoreProps {
  setPassword: (password: string) => void;
  setPasswordConfirmation: (passwordConfirmation: string) => void;
  clearFeedback: () => void;
  clearFieldError: (field: string) => void;
  setLocalError: (localError: string | null) => void;
  resetPassword: (email: string, token: string) => Promise<boolean>;
  reset: () => void;
}

const initState: ResetPasswordStoreProps = {
  status: AppStatus.initial,
  password: "",
  passwordConfirmation: "",
  message: null,
  errorMessage: null,
  localError: null,
  fieldErrors: {},
};

function resolveUserRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

function resolveErrorMessage(error?: { message?: string | null; httpStatus?: number | null } | null): string {
  return resolveApiErrorMessage(error as never);
}

export const useResetPasswordStore = create<ResetPasswordStoreState>((set, get) => ({
  ...initState,

  setPassword: (password) => set({ password, fieldErrors: { ...get().fieldErrors, password: undefined, passwordConfirmation: undefined } }),
  setPasswordConfirmation: (passwordConfirmation) => set({ passwordConfirmation, fieldErrors: { ...get().fieldErrors, passwordConfirmation: undefined } }),
  clearFeedback: () => set({ message: null, errorMessage: null, localError: null }),
  clearFieldError: (field) => set({ fieldErrors: { ...get().fieldErrors, [field]: undefined } }),
  setLocalError: (localError) => set({ localError }),
  resetPassword: async (email, token) => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({
      message: null,
      errorMessage: null,
      localError: null,
      fieldErrors: {},
    });

    if (!email.trim() || !token.trim()) {
      set({
        status: AppStatus.error,
        localError: "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã thiếu thông tin.",
      });
      return false;
    }

    const state = get();
    const validation = resetPasswordSchema.safeParse({
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string | undefined> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      set({ status: AppStatus.error, fieldErrors });
      return false;
    }

    set({ status: AppStatus.loading });

    const repository = resolveUserRepository();
    const result = await repository.resetPassword(
      email,
      token,
      state.password,
      state.passwordConfirmation,
    );

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveErrorMessage(result.exception),
      });
      return false;
    }

    set({
      status: AppStatus.success,
      message: "Mật khẩu đã được cập nhật.",
      errorMessage: null,
    });

    return true;
  },
  reset: () => set({ ...initState }),
}));
