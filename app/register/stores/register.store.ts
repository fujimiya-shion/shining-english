"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

export interface RegisterFormStoreProps {
  status: AppStatus;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
  message: string | null;
  errorMessage: string | null;
  localError: string | null;
}

export interface RegisterFormStoreState extends RegisterFormStoreProps {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirmation: (passwordConfirmation: string) => void;
  setAcceptTerms: (acceptTerms: boolean) => void;
  clearFeedback: () => void;
  setLocalError: (localError: string | null) => void;
  register: () => Promise<boolean>;
  reset: () => void;
}

const initState: RegisterFormStoreProps = {
  status: AppStatus.initial,
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
  acceptTerms: false,
  message: null,
  errorMessage: null,
  localError: null,
};

function resolveUserRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

function resolveErrorMessage(error?: { message?: string | null; httpStatus?: number | null } | null): string {
  return resolveApiErrorMessage(error as never);
}

export const useRegisterStore = create<RegisterFormStoreState>((set, get) => ({
  ...initState,

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setPassword: (password) => set({ password }),
  setPasswordConfirmation: (passwordConfirmation) => set({ passwordConfirmation }),
  setAcceptTerms: (acceptTerms) => set({ acceptTerms }),
  clearFeedback: () => set({ message: null, errorMessage: null, localError: null }),
  setLocalError: (localError) => set({ localError }),
  register: async () => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({
      message: null,
      errorMessage: null,
      localError: null,
    });

    if (get().password !== get().passwordConfirmation) {
      set({
        status: AppStatus.error,
        localError: "Mật khẩu xác nhận không khớp.",
      });
      return false;
    }

    if (!get().acceptTerms) {
      set({
        status: AppStatus.error,
        localError: "Bạn cần đồng ý điều khoản để tạo tài khoản.",
      });
      return false;
    }

    set({ status: AppStatus.loading });

    const repository = resolveUserRepository();
    const result = await repository.register(
      get().name,
      get().email,
      get().phone,
      get().password,
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
      message: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
      errorMessage: null,
    });

    return true;
  },
  reset: () => set({ ...initState }),
}));
