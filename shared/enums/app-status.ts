export enum AppStatus {
    initial,
    loading,
    done,
    success,
    error,
}

export const isInitial = (status: AppStatus): boolean => status === AppStatus.initial;
export const isLoading = (status: AppStatus): boolean => status === AppStatus.loading;
export const isDone = (status: AppStatus): boolean => status === AppStatus.done;
export const isSuccess = (status: AppStatus): boolean => status === AppStatus.success;
export const isError = (status: AppStatus): boolean => status === AppStatus.error;