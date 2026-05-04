"use client";

import { create } from "zustand";
import { DashboardOverviewModel } from "@/data/models/dashboard.model";
import { IDashboardRepository } from "@/data/repositories/remote/dashboard/dashboard.repository.interface";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

interface DashboardStoreState {
  status: AppStatus;
  overview: DashboardOverviewModel | null;
  errorMessage: string | null;
  fetchOverview: () => Promise<void>;
  reset: () => void;
}

function resolveDashboardRepository(): IDashboardRepository {
  return resolveClient<IDashboardRepository>(IOC_TOKENS.DASHBOARD_REPOSITORY);
}

export const useDashboardStore = create<DashboardStoreState>((set, get) => ({
  status: AppStatus.initial,
  overview: null,
  errorMessage: null,

  fetchOverview: async () => {
    if (get().status === AppStatus.loading) {
      return;
    }

    set({
      status: AppStatus.loading,
      errorMessage: null,
    });

    const result = await resolveDashboardRepository().getOverview();

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception as never),
      });
      return;
    }

    set({
      status: AppStatus.done,
      overview: result.response.data,
      errorMessage: null,
    });
  },

  reset: () =>
    set({
      status: AppStatus.initial,
      overview: null,
      errorMessage: null,
    }),
}));
