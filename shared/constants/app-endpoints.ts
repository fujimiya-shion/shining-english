export const AppEndpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  user: {
    update: "/user/update",
  },

  course: {
    index: "/courses",
    detail: (slug: string) => `/courses/slug/${encodeURIComponent(slug)}`,
    filter: "/courses/filter",
    filterProps: "/courses/filter-props",
  }
} as const;
