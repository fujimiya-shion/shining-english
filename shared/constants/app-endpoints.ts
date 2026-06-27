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
  city: {
    index: "/cities",
  },
  contact: {
    submit: "/contact",
  },
  home: {
    index: "/home",
  },
  dashboard: {
    overview: "/dashboard/overview",
  },
  blog: {
    index: "/blogs",
    detail: (slug: string) => `/blogs/slug/${encodeURIComponent(slug)}`,
    unlock: (blogId: number) => `/blogs/${blogId}/unlock`,
  },

  course: {
    index: "/courses",
    detail: (slug: string) => `/courses/slug/${encodeURIComponent(slug)}`,
    access: (courseId: number) => `/courses/${courseId}/access`,
    learningProgress: (courseId: number) => `/courses/${courseId}/learning-progress`,
    completeLesson: (courseId: number, lessonId: number) => `/courses/${courseId}/lessons/${lessonId}/complete`,
    setCurrentLesson: (courseId: number) => `/courses/${courseId}/current-lesson`,
    reviews: (courseId: number) => `/courses/${courseId}/reviews`,
    free: "/courses/free",
    filter: "/courses/filter",
    filterProps: "/courses/filter-props",
  },
  lesson: {
    quiz: (lessonId: number) => `/lessons/${lessonId}/quiz`,
    comments: (lessonId: number) => `/lessons/${lessonId}/comments`,
  },
  quizAttempt: {
    latest: (quizId: number) => `/quizzes/${quizId}/attempts/latest`,
    store: (quizId: number) => `/quizzes/${quizId}/attempts`,
  },
  cart: {
    items: "/cart/items",
    item: (courseId: number) => `/cart/items/${courseId}`,
    count: "/cart/count",
    clear: "/cart/clear",
  },
  order: {
    index: "/orders",
    detail: (orderId: number) => `/orders/${orderId}`,
    cancel: (orderId: number) => `/orders/${orderId}/cancel`,
  },
  lessonNote: {
    index: '/notes',
    byLesson: (lessonId: number) => `/lessons/${lessonId}/notes`,
    detail: (noteId: number) => `/notes/${noteId}`,
  },
  star: {
    balance: '/stars/balance',
    checkIn: '/stars/check-in',
    payForCourse: (courseId: number) => `/stars/courses/${courseId}/pay`,
  },
} as const;
