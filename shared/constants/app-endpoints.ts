export const AppEndpoints = {
  server: {
    accessToken: "/access-token",
  },
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    thirdPartyLogin: "/auth/third-party-login",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  user: {
    update: "/user/update",
  },

  course: {
    index: "/courses",
    detail: (slug: string) => `/courses/slug/${encodeURIComponent(slug)}`,
    access: (courseId: number) => `/courses/${courseId}/access`,
    filter: "/courses/filter",
    filterProps: "/courses/filter-props",
  },
  cart: {
    items: "/cart/items",
  },
} as const;
