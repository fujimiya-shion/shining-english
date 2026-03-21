import { create } from "zustand";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { CourseFilterResponse } from "@/data/dtos/course/course.dto";

export interface CourseFilterStoreProps {
  status: AppStatus;
  filterProps: CourseFilterResponse | null;
}

export interface CourseFilterStoreState extends CourseFilterStoreProps {
  setStatus: (status: AppStatus) => void;
  setFilterProps: (filterProps: CourseFilterResponse | null) => void;
  reset: () => void;
  initial: () => Promise<void>;
  fetchFilterProps: () => Promise<void>;
}

const initState: CourseFilterStoreProps = {
  status: AppStatus.initial,
  filterProps: null,
};

export const useCourseFilterStore = create<CourseFilterStoreState>((set, get) => ({
  ...initState,

  setStatus: (status) => set({ status }),
  setFilterProps: (filterProps) => set({ filterProps }),
  reset: () => set({ ...initState }),

  initial: async () => {
    if (get().status === AppStatus.loading) {
      return;
    }

    if (get().status === AppStatus.done && get().filterProps) {
      return;
    }

    await get().fetchFilterProps();
  },

  fetchFilterProps: async () => {
    set({ status: AppStatus.loading });
    const courseRepo = resolveClient<ICourseRepository>(
      IOC_TOKENS.COURSE_REPOSITORY,
    );
    const apiResult = await courseRepo.getFilterProps();

    apiResult.when({
      success: (response) => {
        set({
          status: AppStatus.done,
          filterProps: response.data,
        });
      },
      error: () => {
        set({ status: AppStatus.error });
      },
    });
  },
}));
