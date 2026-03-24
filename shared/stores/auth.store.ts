"use client";

import { create } from "zustand";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { User } from "@/data/models/user.model";
import { ApiException } from "@/data/types/api-exception";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

export interface AuthStoreProps {
  status: AppStatus;
  authenticated: boolean;
  currentUser: User | null;
  errorMessage: string | null;
}

export interface AuthStoreState extends AuthStoreProps {
  setState: (state: Partial<AuthStoreProps>) => void;
  setStatus: (status: AppStatus) => void;
  setCurrentUser: (currentUser: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  reset: () => void;
  fetchMe: () => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const initState: AuthStoreProps = {
  status: AppStatus.initial,
  authenticated: false,
  currentUser: null,
  errorMessage: null,
};

function resolveAuthRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

function resolveErrorMessage(exception?: ApiException): string {
  return resolveApiErrorMessage(exception);
}

export const useAuthStore = create<AuthStoreState>((set) => {
  const syncCurrentUser = async (): Promise<boolean> => {
    const repository = resolveAuthRepository();
    const result = await repository.me();

    if (result.response) {
      set({
        status: AppStatus.done,
        authenticated: true,
        currentUser: result.response.data,
        errorMessage: null,
      });
      return true;
    }

    if (result.exception?.httpStatus === 401) {
      set({
        status: AppStatus.done,
        authenticated: false,
        currentUser: null,
        errorMessage: null,
      });
      return false;
    }

    set({
      status: AppStatus.error,
      authenticated: false,
      currentUser: null,
      errorMessage: resolveErrorMessage(result.exception),
    });

    return false;
  };

  return {
    ...initState,

    setState: (state) => set(state),
    setStatus: (status) => set({ status }),
    setCurrentUser: (currentUser) => set({ currentUser }),
    setAuthenticated: (authenticated) => set({ authenticated }),
    reset: () => set({ ...initState }),

    fetchMe: async () => {
      set({
        status: AppStatus.loading,
        errorMessage: null,
      });

      return syncCurrentUser();
    },

    logout: async () => {
      set({
        status: AppStatus.loading,
        errorMessage: null,
      });

      const repository = resolveAuthRepository();
      const result = await repository.logout();

      if (!result.response && result.exception?.httpStatus !== 401) {
        set({
          status: AppStatus.error,
          errorMessage: resolveErrorMessage(result.exception),
        });
        return false;
      }

      set({
        status: AppStatus.success,
        authenticated: false,
        currentUser: null,
        errorMessage: null,
      });

      return true;
    },
  };
});
