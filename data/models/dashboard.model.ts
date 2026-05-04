export interface DashboardStatModel {
  enrolled_courses: number;
  hours_this_week: number;
  certificates: number;
  streak_days: number;
}

export interface DashboardEnrolledCourseModel {
  id: number;
  title: string;
  category: string;
  progress: number;
  image: string;
  instructor: string;
  next_lesson?: string | null;
  last_accessed: string;
}

export interface DashboardRecentActivityModel {
  id: number;
  type: "completed" | "passed" | "enrolled";
  title: string;
  course: string;
  time: string;
  score?: number | null;
}

export interface DashboardCertificateModel {
  id: number;
  course: string;
  earned_date: string;
  credential_id: string;
}

export interface DashboardWeeklyPlanItemModel {
  label: string;
  status: string;
  tone: "done" | "doing" | "todo";
}

export interface DashboardOverviewModel {
  stats: DashboardStatModel;
  enrolled_courses: DashboardEnrolledCourseModel[];
  recent_activity: DashboardRecentActivityModel[];
  certificates: DashboardCertificateModel[];
  weekly_plan: DashboardWeeklyPlanItemModel[];
}

