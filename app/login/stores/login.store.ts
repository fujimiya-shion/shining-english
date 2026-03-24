"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { useAuthStore } from "@/shared/stores/auth.store";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

export interface LoginFormStoreProps {
  status: AppStatus;
  email: string;
  password: string;
  message: string | null;
  errorMessage: string | null;
}

export interface LoginFormStoreState extends LoginFormStoreProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  clearFeedback: () => void;
  login: () => Promise<boolean>;
  reset: () => void;
}

const initState: LoginFormStoreProps = {
  status: AppStatus.initial,
  email: "",
  password: "",
  message: null,
  errorMessage: null,
};

function resolveUserRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

function buildDeviceIdentifier(): string {
  const randomValue = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`;
  return `web-${randomValue}`;
}

function buildDeviceMetadata(): {
  identifier: string;
  name: string;
  platform: string;
  userAgent: string;
} {
  const navigatorRef = globalThis.navigator;
  const userAgentData = navigatorRef as Navigator & {
    userAgentData?: { platform?: string };
  };

  return {
    identifier: buildDeviceIdentifier(),
    name: "Web Browser",
    platform: userAgentData.userAgentData?.platform ?? navigatorRef.platform ?? "web",
    userAgent: navigatorRef.userAgent,
  };
}

function resolveErrorMessage(error?: { message?: string | null; httpStatus?: number | null } | null): string {
  return resolveApiErrorMessage(error as never);
}

export const useLoginStore = create<LoginFormStoreState>((set, get) => ({
  ...initState,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  clearFeedback: () => set({ message: null, errorMessage: null }),
  login: async () => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({
      status: AppStatus.loading,
      message: null,
      errorMessage: null,
    });

    const repository = resolveUserRepository();
    const device = buildDeviceMetadata();
    const result = await repository.login(
      get().email,
      get().password,
      device.identifier,
      device.name,
      device.platform,
      undefined,
      device.userAgent,
    );

    if (!result.response) {
      set({
        status: AppStatus.error,
        message: null,
        errorMessage: resolveErrorMessage(result.exception),
      });
      return false;
    }

    const fetched = await useAuthStore.getState().fetchMe();
    set({
      status: fetched ? AppStatus.success : AppStatus.error,
      message: fetched ? "Đăng nhập thành công." : null,
      errorMessage: fetched ? null : "Không thể đồng bộ thông tin người dùng.",
    });

    return fetched;
  },
  reset: () => set({ ...initState }),
}));
