"use client";

import { create } from "zustand";
import { City } from "@/data/models/city.model";
import { ICityRepository } from "@/data/repositories/remote/city/city.repository.interface";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";

interface CityStoreState {
  status: AppStatus;
  cities: City[];
  setCities: (cities: City[]) => void;
  setStatus: (status: AppStatus) => void;
  initial: () => Promise<void>;
  fetchCities: () => Promise<void>;
}

function resolveCityRepository(): ICityRepository {
  return resolveClient<ICityRepository>(IOC_TOKENS.CITY_REPOSITORY);
}

export const useCityStore = create<CityStoreState>((set, get) => ({
  status: AppStatus.initial,
  cities: [],
  setCities: (cities) => set({ cities }),
  setStatus: (status) => set({ status }),

  initial: async () => {
    if (get().status === AppStatus.loading) {
      return;
    }

    if (get().status === AppStatus.done && get().cities.length > 0) {
      return;
    }

    await get().fetchCities();
  },

  fetchCities: async () => {
    set({ status: AppStatus.loading });
    const result = await resolveCityRepository().getAll();

    if (!result.response) {
      set({ status: AppStatus.error });
      return;
    }

    set({
      status: AppStatus.done,
      cities: result.response.data,
    });
  },
}));

