"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { registerSchema } from "@/shared/validations/auth-schemas";

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
  fieldErrors: Record<string, string | undefined>;
}

export interface RegisterFormStoreState extends RegisterFormStoreProps {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirmation: (passwordConfirmation: string) => void;
  setAcceptTerms: (acceptTerms: boolean) => void;
  clearFeedback: () => void;
  clearFieldError: (field: string) => void;
  setLocalError: (localError: string | null) => void;
  register: (recaptchaToken: string) => Promise<boolean>;
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
  fieldErrors: {},
};

function resolveUserRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

function resolveErrorMessage(error?: { message?: string | null; httpStatus?: number | null } | null): string {
  return resolveApiErrorMessage(error as never);
}

export const useRegisterStore = create<RegisterFormStoreState>((set, get) => ({
  ...initState,

  setName: (name) => set({ name, fieldErrors: { ...get().fieldErrors, name: undefined } }),
  setEmail: (email) => set({ email, fieldErrors: { ...get().fieldErrors, email: undefined } }),
  setPhone: (phone) => set({ phone, fieldErrors: { ...get().fieldErrors, phone: undefined } }),
  setPassword: (password) => set({ password, fieldErrors: { ...get().fieldErrors, password: undefined, passwordConfirmation: undefined } }),
  setPasswordConfirmation: (passwordConfirmation) => set({ passwordConfirmation, fieldErrors: { ...get().fieldErrors, passwordConfirmation: undefined } }),
  setAcceptTerms: (acceptTerms) => set({ acceptTerms, fieldErrors: { ...get().fieldErrors, acceptTerms: undefined } }),
  clearFeedback: () => set({ message: null, errorMessage: null, localError: null }),
  clearFieldError: (field) => set({ fieldErrors: { ...get().fieldErrors, [field]: undefined } }),
  setLocalError: (localError) => set({ localError }),
  register: async (recaptchaToken: string) => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({
      message: null,
      errorMessage: null,
      localError: null,
      fieldErrors: {},
    });

    const state = get();
    const validation = registerSchema.safeParse({
      name: state.name,
      email: state.email,
      phone: state.phone,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
      acceptTerms: state.acceptTerms,
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

    if (!recaptchaToken) {
      set({
        status: AppStatus.error,
        errorMessage: "Không thể xác minh reCAPTCHA.",
      });
      return false;
    }

    set({ status: AppStatus.loading });

    const repository = resolveUserRepository();

    const result = await repository.register(
      state.name,
      state.email,
      state.phone,
      state.password,
      recaptchaToken,
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
