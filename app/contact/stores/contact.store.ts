"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IContactRepository } from "@/data/repositories/remote/contact/contact.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { getRecaptchaToken } from "@/shared/utils/recaptcha-v3";

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
  submitContact: () => Promise<boolean>;
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
  submitContact: async () => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({ status: AppStatus.loading, successMessage: null, errorMessage: null });

    const recaptchaAction = process.env.NEXT_PUBLIC_RECAPTCHA_CONTACT_ACTION ?? "contact";
    let recaptchaToken = "";

    try {
      recaptchaToken = await getRecaptchaToken(recaptchaAction);
    } catch (error) {
      set({
        status: AppStatus.error,
        errorMessage: error instanceof Error ? error.message : "Không thể xác minh reCAPTCHA.",
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

