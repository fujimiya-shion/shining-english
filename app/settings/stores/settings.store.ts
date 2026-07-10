"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IUserRepository } from "@/data/repositories/remote/user/user.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { useAuthStore } from "@/shared/stores/auth.store";
import { City } from "@/data/models/city.model";
import { settingsSchema } from "@/shared/validations/auth-schemas";

interface SettingsFormProps {
  status: AppStatus;
  name: string;
  phone: string;
  birthday: string;
  cityQuery: string;
  cityId: string;
  avatarFile: File | null;
  message: string | null;
  errorMessage: string | null;
  fieldErrors: Record<string, string | undefined>;
}

interface SettingsStoreState extends SettingsFormProps {
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setBirthday: (birthday: string) => void;
  setCityQuery: (cityQuery: string) => void;
  setCityId: (cityId: string) => void;
  setCity: (city: City | null) => void;
  setAvatarFile: (file: File | null) => void;
  loadFromAuth: () => void;
  clearFeedback: () => void;
  clearFieldError: (field: string) => void;
  updateProfile: () => Promise<boolean>;
}

const initState: SettingsFormProps = {
  status: AppStatus.initial,
  name: "",
  phone: "",
  birthday: "",
  cityQuery: "",
  cityId: "",
  avatarFile: null,
  message: null,
  errorMessage: null,
  fieldErrors: {},
};

function resolveUserRepository(): IUserRepository {
  return resolveClient<IUserRepository>(IOC_TOKENS.USER_REPOSITORY);
}

export const useSettingsStore = create<SettingsStoreState>((set, get) => ({
  ...initState,

  clearFieldError: (field) => set({ fieldErrors: { ...get().fieldErrors, [field]: undefined } }),
  setName: (name) => set({ name, fieldErrors: { ...get().fieldErrors, name: undefined } }),
  setPhone: (phone) => set({ phone, fieldErrors: { ...get().fieldErrors, phone: undefined } }),
  setBirthday: (birthday) => set({ birthday }),
  setCityQuery: (cityQuery) => set({ cityQuery, cityId: "" }),
  setCityId: (cityId) => set({ cityId }),
  setCity: (city) =>
    set({
      cityId: city?.id ? String(city.id) : "",
      cityQuery: city?.name ?? "",
    }),
  setAvatarFile: (avatarFile) => set({ avatarFile }),

  loadFromAuth: () => {
    const user = useAuthStore.getState().currentUser;
    const cityId = String(user?.cityId ?? user?.city_id ?? "");
    const cityName = (user as { city_name?: string; city?: { name?: string } } | null)?.city?.name
      ?? (user as { city_name?: string } | null)?.city_name
      ?? "";

    set({
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      birthday:
        typeof user?.birthday === "string"
          ? user.birthday.slice(0, 10)
          : user?.birthday instanceof Date
          ? user.birthday.toISOString().slice(0, 10)
          : "",
      cityId,
      cityQuery: cityName,
    });
  },

  clearFeedback: () => set({ message: null, errorMessage: null }),

  updateProfile: async () => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({ message: null, errorMessage: null, fieldErrors: {} });

    const state = get();

    const validation = settingsSchema.safeParse({
      name: state.name,
      phone: state.phone,
      birthday: state.birthday,
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

    const payload = new FormData();
    if (state.name.trim()) payload.append("name", state.name.trim());
    if (state.phone.trim()) payload.append("phone", state.phone.trim());
    if (state.birthday.trim()) payload.append("birthday", state.birthday.trim());
    if (state.cityId.trim()) payload.append("city_id", state.cityId.trim());
    if (state.avatarFile) payload.append("avatar", state.avatarFile);

    const result = await resolveUserRepository().updateProfile(payload);

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception as never),
      });
      return false;
    }

    useAuthStore.getState().setCurrentUser(result.response.data);

    set({
      status: AppStatus.success,
      message: "Cập nhật hồ sơ thành công.",
      avatarFile: null,
      errorMessage: null,
    });

    return true;
  },
}));
