'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import {
  BookOpen,
  Clock,
  Flame,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useDashboardStore } from '@/app/dashboard/stores/dashboard.store'
import { AppStatus } from '@/shared/enums/app-status'
import { CourseCardItem } from '@/shared/components/ui/course/course-card-item'

function formatWeeklyStudyTime(hoursThisWeek?: number): string {
  const normalizedHours = typeof hoursThisWeek === 'number' ? Math.max(0, hoursThisWeek) : 0
  const totalMinutes = Math.round(normalizedHours * 60)

  if (totalMinutes < 60) {
    return `${totalMinutes}m`
  }

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
}

export function StudentDashboard() {
  const status = useDashboardStore((state) => state.status)
  const overview = useDashboardStore((state) => state.overview)
  const errorMessage = useDashboardStore((state) => state.errorMessage)
  const fetchOverview = useDashboardStore((state) => state.fetchOverview)

  useEffect(() => {
    void fetchOverview()
  }, [fetchOverview])

  const stats = [
    {
      label: 'Khóa đang học',
      value: String(overview?.stats?.enrolledCourses ?? 0),
      note: 'Đang theo lộ trình',
      icon: BookOpen,
      color: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
    },
    {
      label: 'Giờ học tuần này',
      value: formatWeeklyStudyTime(overview?.stats?.hoursThisWeek),
      note: 'Theo dữ liệu thực tế',
      icon: Clock,
      color: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]',
    },
    {
      label: 'Chứng nhận',
      value: String(overview?.stats?.certificates ?? 0),
      note: 'Sẵn sàng chia sẻ',
      icon: GraduationCap,
      color: 'bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]',
    },
    {
      label: 'Chuỗi học',
      value: `${overview?.stats?.streakDays ?? 0} ngày`,
      note: 'Giữ vững phong độ',
      icon: Flame,
      color: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]',
    },
  ]

  const enrolledCourses = overview?.enrolledCourses ?? []
  const recentActivity = overview?.recentActivity ?? []
  const weeklyPlan = overview?.weeklyPlan ?? []

  return (
    <div className="min-h-screen bg-[radial-gradient(1400px_circle_at_top_left,#E0F2FE_0%,#EFF6FF_40%,#FFFFFF_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)] md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Dashboard học viên
                </div>
                <h1 className="mt-3 text-3xl font-semibold text-[color:var(--brand-900)]">
                  Chào mừng bạn quay lại
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dữ liệu dashboard đang đồng bộ theo tài khoản của bạn.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <AppButton asChild className="h-10 rounded-full">
                  <Link href="/courses">Tiếp tục học</Link>
                </AppButton>
                <Button asChild variant="outline" className="h-10 rounded-full">
                  <Link href="/settings">Cập nhật hồ sơ</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={stat.label}
                    className="border-border/60 bg-gradient-to-br from-white via-white to-[color:var(--sky-70)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-[color:var(--brand-900)]">{stat.value}</p>
                      </div>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${stat.color}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{stat.note}</p>
                  </Card>
                )
              })}
            </div>

            {status === AppStatus.loading ? <p className="mt-6 text-sm text-muted-foreground">Đang tải dashboard...</p> : null}
            {status === AppStatus.error ? <p className="mt-6 text-sm text-rose-600">{errorMessage ?? 'Không thể tải dashboard.'}</p> : null}

            <Tabs defaultValue="learning" className="mt-8 space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="learning">Khóa học</TabsTrigger>
                <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                <TabsTrigger value="certificates">Chứng nhận</TabsTrigger>
              </TabsList>

              <TabsContent value="learning" className="space-y-6">
                {enrolledCourses.length === 0 ? (
                  <Card className="border-border/60 bg-white p-4 text-sm text-muted-foreground">Chưa có khóa học đang theo học.</Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-3">
                    {enrolledCourses.map((enrollment) => {
                      const course = enrollment.course
                      const courseSlug = (course.slug ?? '').trim()
                      const detailHref = courseSlug ? `/courses/${encodeURIComponent(courseSlug)}` : '/courses'
                      const courseName = course.name ?? 'Khóa học'
                      const courseId = Number(course.id ?? 0)

                      return (
                      <CourseCardItem
                        key={`${courseId}-${courseSlug || courseName}`}
                        course={course}
                        href={detailHref}
                        actionLabel="Vào học"
                        className="h-full"
                      />
                      )
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                {recentActivity.length === 0 ? (
                  <Card className="border-border/60 bg-white p-4 text-sm text-muted-foreground">Chưa có hoạt động gần đây.</Card>
                ) : (
                  recentActivity.map((activity) => (
                    <Card key={activity.id} className="border-border/60 bg-white p-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--sky-70)] text-[color:var(--brand-900)]">
                          {activity.type === 'completed' && <CheckCircle2 className="h-5 w-5" />}
                          {activity.type === 'passed' && <BadgeCheck className="h-5 w-5" />}
                          {activity.type === 'enrolled' && <Sparkles className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[color:var(--brand-900)]">{activity.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {activity.course}
                            {activity.type === 'passed' && activity.score !== null && activity.score !== undefined ? (
                              <span className="ml-2 font-medium">• Điểm: {activity.score}%</span>
                            ) : null}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="certificates" className="space-y-4">
                <Card className="border-border/60 bg-white p-4 text-sm text-muted-foreground">
                  Chứng nhận sẽ được hiển thị khi backend cung cấp dữ liệu này.
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-border/70 bg-white/95 p-5">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">Mục tiêu hôm nay</h2>
              {weeklyPlan.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">Dữ liệu mục tiêu sẽ đồng bộ theo lịch học thực tế.</p>
              ) : (
                <div className="mt-3 space-y-3">
                  {weeklyPlan.map((item, index) => {
                    const toneClass =
                      item.tone === 'done'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : item.tone === 'doing'
                          ? 'border-amber-200 bg-amber-50 text-amber-700'
                          : 'border-slate-200 bg-slate-50 text-slate-700'

                    return (
                      <div key={`${item.label}-${index}`} className="rounded-2xl border border-border/60 bg-white p-3">
                        <p className="text-sm font-medium text-[color:var(--brand-900)]">{item.label}</p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <p className="text-xs text-muted-foreground">{item.status}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase ${toneClass}`}>
                            {item.tone}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
