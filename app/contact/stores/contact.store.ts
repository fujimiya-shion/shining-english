"use client";

import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { IContactRepository } from "@/data/repositories/remote/contact/contact.repository.interface";
import { resolveApiErrorMessage } from "@/shared/utils/api-error-message";
import { contactSchema } from "@/shared/validations/auth-schemas";

type ContactStoreProps = {
  status: AppStatus;
  name: string;
  email: string;
  message: string;
  successMessage: string | null;
  errorMessage: string | null;
  fieldErrors: Record<string, string | undefined>;
};

type ContactStoreState = ContactStoreProps & {
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setMessage: (value: string) => void;
  clearFeedback: () => void;
  clearFieldError: (field: string) => void;
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
  fieldErrors: {},
};

function resolveContactRepository(): IContactRepository {
  return resolveClient<IContactRepository>(IOC_TOKENS.CONTACT_REPOSITORY);
}

export const useContactStore = create<ContactStoreState>((set, get) => ({
  ...initialState,
  setName: (name) => set({ name, fieldErrors: { ...get().fieldErrors, name: undefined } }),
  setEmail: (email) => set({ email, fieldErrors: { ...get().fieldErrors, email: undefined } }),
  setMessage: (message) => set({ message, fieldErrors: { ...get().fieldErrors, message: undefined } }),
  clearFeedback: () => set({ successMessage: null, errorMessage: null }),
  clearFieldError: (field) => set({ fieldErrors: { ...get().fieldErrors, [field]: undefined } }),
  submitContact: async (recaptchaToken: string) => {
    if (get().status === AppStatus.loading) {
      return false;
    }

    set({ successMessage: null, errorMessage: null, fieldErrors: {} });

    const state = get();
    const validation = contactSchema.safeParse({
      name: state.name,
      email: state.email,
      message: state.message,
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

    const repository = resolveContactRepository();
    const result = await repository.submitContact(
      state.name,
      state.email,
      state.message,
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
      fieldErrors: {},
    });
    return true;
  },
  reset: () => set(initialState),
}));
