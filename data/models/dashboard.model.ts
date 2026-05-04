import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { Course, SerializedCourse } from '@/data/models/course.model'
import { Serializable } from './serializable.model'

export class DashboardStatModel {
  @Expose({ name: 'enrolled_courses' })
  enrolledCourses: number = 0

  @Expose({ name: 'hours_this_week' })
  hoursThisWeek: number = 0

  certificates: number = 0

  @Expose({ name: 'streak_days' })
  streakDays: number = 0
}

export class DashboardEnrolledCourseModel {
  @Type(() => Course)
  course: Course = new Course()

  progress: number = 0
  instructor: string = ''

  @Expose({ name: 'next_lesson' })
  nextLesson?: string | null

  @Expose({ name: 'last_accessed' })
  lastAccessed: string = ''
}

export class DashboardRecentActivityModel {
  id: number = 0
  type: 'completed' | 'passed' | 'enrolled' = 'enrolled'
  title: string = ''
  course: string = ''
  time: string = ''
  score?: number | null
}

export class DashboardCertificateModel {
  id: number = 0
  course: string = ''

  @Expose({ name: 'earned_date' })
  earnedDate: string = ''

  @Expose({ name: 'credential_id' })
  credentialId: string = ''
}

export class DashboardWeeklyPlanItemModel {
  label: string = ''
  status: string = ''
  tone: 'done' | 'doing' | 'todo' = 'todo'
}

export class SerializedDashboardStat {
  enrolledCourses: number = 0
  hoursThisWeek: number = 0
  certificates: number = 0
  streakDays: number = 0
}

export class SerializedDashboardEnrolledCourse {
  course!: SerializedCourse
  progress: number = 0
  instructor: string = ''
  nextLesson?: string | null
  lastAccessed: string = ''
}

export class SerializedDashboardRecentActivity {
  id: number = 0
  type: 'completed' | 'passed' | 'enrolled' = 'enrolled'
  title: string = ''
  course: string = ''
  time: string = ''
  score?: number | null
}

export class SerializedDashboardCertificate {
  id: number = 0
  course: string = ''
  earnedDate: string = ''
  credentialId: string = ''
}

export class SerializedDashboardWeeklyPlanItem {
  label: string = ''
  status: string = ''
  tone: 'done' | 'doing' | 'todo' = 'todo'
}

export class SerializedDashboardOverview {
  stats: SerializedDashboardStat = new SerializedDashboardStat()
  enrolledCourses: SerializedDashboardEnrolledCourse[] = []
  recentActivity: SerializedDashboardRecentActivity[] = []
  certificates: SerializedDashboardCertificate[] = []
  weeklyPlan: SerializedDashboardWeeklyPlanItem[] = []
}

export class DashboardOverviewModel implements Serializable<SerializedDashboardOverview> {
  @Type(() => DashboardStatModel)
  stats: DashboardStatModel = new DashboardStatModel()

  @Expose({ name: 'enrolled_courses' })
  @Type(() => DashboardEnrolledCourseModel)
  enrolledCourses: DashboardEnrolledCourseModel[] = []

  @Expose({ name: 'recent_activity' })
  @Type(() => DashboardRecentActivityModel)
  recentActivity: DashboardRecentActivityModel[] = []

  @Type(() => DashboardCertificateModel)
  certificates: DashboardCertificateModel[] = []

  @Expose({ name: 'weekly_plan' })
  @Type(() => DashboardWeeklyPlanItemModel)
  weeklyPlan: DashboardWeeklyPlanItemModel[] = []

  serialize(): SerializedDashboardOverview {
    const result = new SerializedDashboardOverview()
    result.stats = Object.assign(new SerializedDashboardStat(), {
      enrolledCourses: this.stats.enrolledCourses,
      hoursThisWeek: this.stats.hoursThisWeek,
      certificates: this.stats.certificates,
      streakDays: this.stats.streakDays,
    })
    result.enrolledCourses = this.enrolledCourses.map((item) =>
      Object.assign(new SerializedDashboardEnrolledCourse(), {
        course: item.course.serialize(),
        progress: item.progress,
        instructor: item.instructor,
        nextLesson: item.nextLesson,
        lastAccessed: item.lastAccessed,
      })
    )
    result.recentActivity = this.recentActivity.map((item) =>
      Object.assign(new SerializedDashboardRecentActivity(), {
        id: item.id,
        type: item.type,
        title: item.title,
        course: item.course,
        time: item.time,
        score: item.score,
      })
    )
    result.certificates = this.certificates.map((item) =>
      Object.assign(new SerializedDashboardCertificate(), {
        id: item.id,
        course: item.course,
        earnedDate: item.earnedDate,
        credentialId: item.credentialId,
      })
    )
    result.weeklyPlan = this.weeklyPlan.map((item) =>
      Object.assign(new SerializedDashboardWeeklyPlanItem(), {
        label: item.label,
        status: item.status,
        tone: item.tone,
      })
    )

    return result
  }
}
