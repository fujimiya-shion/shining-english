export const IOC_TOKENS = {
  USER_REPOSITORY: Symbol("USER_REPOSITORY"),
} as const;

export type IoCToken = (typeof IOC_TOKENS)[keyof typeof IOC_TOKENS];
