import { create } from "zustand";
import { Course } from "@/data/models/course.model";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { ICourseRepository } from "@/data/repositories/remote/course/course.repository.interface";
import { CommonRequest } from "@/data/dtos/common/common-request";

export interface CourseStoreProps {
    status: AppStatus;
    page: number;
    pageCount: number;
    courses: Course[];
}

export interface CourseStoreState extends CourseStoreProps {
    setState: (state: CourseStoreProps) => void;
    setStatus: (status: AppStatus) => void;
    setPage: (page: number) => void;
    setPageCount: (pageCount: number) => void;
    setCourses: (courses: Course[]) => void;
    reset: () => void;
    initial: () => Promise<void>;
    fetchCourses: () => Promise<void>;
}

export const initState: CourseStoreProps = {
    status: AppStatus.initial,
    page: 1,
    pageCount: 1,
    courses: [],
};

export const useCourseStore = create<CourseStoreState>((set, get) => ({
    ...initState,

    setState: (state) => set({ ...state }),
    setStatus: (status) => set({ status }),
    setPage: (page) => set({ page }),
    setPageCount: (pageCount) => set({ pageCount }),
    setCourses: (courses) => set({ courses }),
    reset: () => set({ ...initState }),

    initial: async () => {
        await get().fetchCourses();
    },

    fetchCourses: async () => {
        if (get().status === AppStatus.loading) {
            return;
        }
        set({ status: AppStatus.loading });
        const courseRepo = resolveClient<ICourseRepository>(
            IOC_TOKENS.COURSE_REPOSITORY,
        );
        const apiResult = await courseRepo.getAll(
            new CommonRequest(get().page),
        );

        apiResult.when({
            success: (response) => {
                set({
                    status: AppStatus.done,
                    courses: response.data,
                    page: response.page,
                    pageCount: response.pageCount,
                });
            },
            error: () => {
                set({ status: AppStatus.error });
            },
        });
    },
}));
