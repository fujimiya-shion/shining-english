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
    learningProgress: (courseId: number) => `/courses/${courseId}/learning-progress`,
    completeLesson: (courseId: number, lessonId: number) => `/courses/${courseId}/lessons/${lessonId}/complete`,
    setCurrentLesson: (courseId: number) => `/courses/${courseId}/current-lesson`,
    filter: "/courses/filter",
    filterProps: "/courses/filter-props",
  },
  cart: {
    items: "/cart/items",
    item: (courseId: number) => `/cart/items/${courseId}`,
    count: "/cart/count",
    clear: "/cart/clear",
  },
  order: {
    index: "/orders",
  },
  lessonNote: {
    index: '/notes',
    byLesson: (lessonId: number) => `/lessons/${lessonId}/notes`,
    detail: (noteId: number) => `/notes/${noteId}`,
  },
} as const;
