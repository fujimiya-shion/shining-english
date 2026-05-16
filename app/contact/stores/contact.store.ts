"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IContactRepository } from "@/data/repositories/remote/contact/contact.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";

type ContactStoreProps = {
  status: AppStatus;
  name: string;
  email: string;
  message: string;
  successMessage: string | null;
  errorMessage: string | null;
};

type ContactStoreState = ContactStoreProps & {
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setMessage: (value: string) => void;
  clearFeedback: () => void;
  submitContact: (recaptchaToken: string) => Promise<boolean>;
  reset: () => void;
};

const initialState: ContactStoreProps = {
  status: AppStatus.initial,
  name: "",
  email: "",
  message: "",
  successMessage: null,
  errorMessage: null,
};

function resolveContactRepository(): IContactRepository {
  return resolveClient<IContactRepository>(IOC_TOKENS.CONTACT_REPOSITORY);
}

export const useContactStore = create<ContactStoreState>((set, get) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setMessage: (message) => set({ message }),
  clearFeedback: () => set({ successMessage: null, errorMessage: null }),
  submitContact: async (recaptchaToken: string) => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({ status: AppStatus.loading, successMessage: null, errorMessage: null });

    if (!recaptchaToken) {
      set({
        status: AppStatus.error,
        errorMessage: "Không thể xác minh reCAPTCHA.",
      });
      return false;
    }

    const repository = resolveContactRepository();
    const result = await repository.submitContact(
      get().name,
      get().email,
      get().message,
      recaptchaToken,
    );

    if (!result.response) {
      set({
        status: AppStatus.error,
        errorMessage: resolveApiErrorMessage(result.exception),
      });
      return false;
    }

    set({
      status: AppStatus.success,
      successMessage: "Gửi liên hệ thành công. Chúng tôi sẽ phản hồi sớm.",
      errorMessage: null,
      name: "",
      email: "",
      message: "",
    });
    return true;
  },
  reset: () => set(initialState),
}));
