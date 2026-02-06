'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  Clock,
  Flame,
  GraduationCap,
  Sparkles,
  Target,
  CheckCircle2,
  PlayCircle,
  BadgeCheck,
  PenTool,
  MessageCircle,
  CalendarCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppButton } from '@/components/ui/app-button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EnrolledCourse {
  id: number
  title: string
  category: string
  progress: number
  image: string
  instructor: string
  nextLesson?: string
  lastAccessed: string
  accent: string
}

interface ActivityItem {
  id: number
  type: 'completed' | 'passed' | 'enrolled'
  title: string
  course: string
  time: string
  score?: number
}

interface CertificateItem {
  id: number
  course: string
  earnedDate: string
  credentialId: string
}

interface WeeklyPlanItem {
  label: string
  status: string
  tone: 'done' | 'doing' | 'todo'
}

export function StudentDashboard() {
  // TODO: Replace these mocked values with API data when backend is ready.
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: 1,
      title: 'Nắm Vững Ngữ Pháp Tiếng Anh',
      category: 'Ngữ pháp',
      progress: 65,
      image:
        'https://images.unsplash.com/photo-1671774635688-e02ae66974df?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=1200',
      instructor: 'Thầy Minh Anh',
      nextLesson: 'Mệnh đề quan hệ nâng cao',
      lastAccessed: '2 giờ trước',
      accent: 'from-[#60A5FA]/25 via-[#FBBF24]/15 to-white',
    },
    {
      id: 2,
      title: 'Tiếng Anh Giao Tiếp Nâng Cao',
      category: 'Giao tiếp',
      progress: 42,
      image:
        'https://images.pexels.com/photos/6001377/pexels-photo-6001377.jpeg?cs=srgb&dl=pexels-sam-lion-6001377.jpg&fm=jpg',
      instructor: 'Cô Khánh Linh',
      nextLesson: 'Thuyết trình tự tin',
      lastAccessed: '1 ngày trước',
      accent: 'from-[#F97316]/25 via-[#FCD34D]/15 to-white',
    },
    {
      id: 3,
      title: 'Viết Tiếng Anh Chuyên Nghiệp',
      category: 'Viết học thuật',
      progress: 78,
      image:
        'https://images.pexels.com/photos/6001375/pexels-photo-6001375.jpeg?cs=srgb&dl=pexels-sam-lion-6001375.jpg&fm=jpg',
      instructor: 'Thầy Quốc Huy',
      nextLesson: 'Cấu trúc email công việc',
      lastAccessed: '3 giờ trước',
      accent: 'from-[#34D399]/25 via-[#A7F3D0]/15 to-white',
    },
  ]

  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      type: 'completed',
      title: 'Hoàn thành bài: Thì hiện tại hoàn thành',
      course: 'Nắm Vững Ngữ Pháp Tiếng Anh',
      time: '2 giờ trước',
    },
    {
      id: 2,
      type: 'passed',
      title: 'Đạt quiz: Động từ bất quy tắc',
      course: 'Nắm Vững Ngữ Pháp Tiếng Anh',
      score: 92,
      time: '5 giờ trước',
    },
    {
      id: 3,
      type: 'enrolled',
      title: 'Đăng ký khóa mới',
      course: 'Tiếng Anh Giao Tiếp Nâng Cao',
      time: '1 ngày trước',
    },
    {
      id: 4,
      type: 'completed',
      title: 'Hoàn thành bài: Phát âm cơ bản',
      course: 'Tiếng Anh Giao Tiếp Nâng Cao',
      time: '2 ngày trước',
    },
  ]

  const certificatesEarned: CertificateItem[] = [
    {
      id: 1,
      course: 'Ngữ pháp nền tảng',
      earnedDate: '15/01/2025',
      credentialId: 'SE-2025-001',
    },
    {
      id: 2,
      course: 'Giao tiếp công việc',
      earnedDate: '20/12/2024',
      credentialId: 'SE-2024-089',
    },
  ]

  const weeklyPlan: WeeklyPlanItem[] = [
    { label: 'Buổi 1: Ngữ pháp', status: 'Hoàn thành', tone: 'done' },
    { label: 'Buổi 2: Giao tiếp', status: 'Đang học', tone: 'doing' },
    { label: 'Buổi 3: Viết email', status: 'Chưa bắt đầu', tone: 'todo' },
  ]

  const stats = [
    {
      label: 'Khóa đang học',
      value: '3',
      note: 'Đang theo lộ trình',
      icon: BookOpen,
      color: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]'
    },
    {
      label: 'Giờ học tuần này',
      value: '4.5h',
      note: 'Còn 1.5h để đạt mục tiêu',
      icon: Clock,
      color: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]'
    },
    {
      label: 'Chứng nhận',
      value: '2',
      note: 'Sẵn sàng chia sẻ',
      icon: GraduationCap,
      color: 'bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]'
    },
    {
      label: 'Chuỗi học',
      value: '7 ngày',
      note: 'Giữ vững phong độ',
      icon: Flame,
      color: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]'
    },
  ]

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
                  Duy trì lịch học để đạt mục tiêu tiếng Anh trong 12 tuần.
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
                        <p className="mt-2 text-2xl font-semibold text-[color:var(--brand-900)]">
                          {stat.value}
                        </p>
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

            <Tabs defaultValue="learning" className="mt-8 space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="learning">Khóa học</TabsTrigger>
                <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                <TabsTrigger value="certificates">Chứng nhận</TabsTrigger>
              </TabsList>

              <TabsContent value="learning" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {enrolledCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="flex h-full flex-col overflow-hidden border-border/60 bg-white"
                    >
                      <div className={`h-2 w-full bg-gradient-to-r ${course.accent}`} />
                      <div className="relative h-36 bg-muted">
                        <Image
                          src={course.image || '/placeholder.svg'}
                          alt={course.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex h-full flex-col p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase text-primary">
                            {course.category}
                          </p>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--sky-70)] px-2 py-1 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {course.lastAccessed}
                          </span>
                        </div>
                        <h3 className="mt-2 font-semibold text-[color:var(--brand-900)]">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">{course.instructor}</p>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Tiến độ</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Target className="h-3.5 w-3.5" />
                          Bài tiếp theo: {course.nextLesson}
                        </div>

                        <AppButton className="mt-auto w-full">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Vào học
                        </AppButton>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id} className="border-border/60 bg-white p-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--sky-70)] text-[color:var(--brand-900)]">
                        {activity.type === 'completed' && <CheckCircle2 className="h-5 w-5" />}
                        {activity.type === 'passed' && <BadgeCheck className="h-5 w-5" />}
                        {activity.type === 'enrolled' && <Sparkles className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[color:var(--brand-900)]">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.course}
                          {activity.type === 'passed' && (
                            <span className="ml-2 font-medium">• Điểm: {activity.score}%</span>
                          )}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 rounded-full">
                        Xem
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="certificates" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {certificatesEarned.map((cert) => (
                    <Card
                      key={cert.id}
                      className="border-border/60 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Chứng nhận
                        </p>
                        <BadgeCheck className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-[color:var(--brand-900)]">
                        {cert.course}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Ngày nhận: {cert.earnedDate}
                      </p>
                      <p className="text-xs text-muted-foreground">Mã: {cert.credentialId}</p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" className="flex-1 rounded-full" size="sm">
                          Xem chứng nhận
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-full" size="sm">
                          Chia sẻ
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="border-border/70 bg-white/95 p-6 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Kế hoạch tuần này
                </p>
                <CalendarCheck className="h-4 w-4 text-primary" />
              </div>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--brand-900)]">
                3 buổi học, 2 quiz ngắn
              </h2>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                {weeklyPlan.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-[color:var(--sky-70)] px-3 py-2"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-xs font-semibold ${
                        item.tone === 'done'
                          ? 'text-emerald-600'
                          : item.tone === 'doing'
                            ? 'text-sky-600'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <AppButton asChild className="mt-5 h-10 w-full rounded-full">
                <Link href="/notes">Xem lộ trình</Link>
              </AppButton>
            </Card>

            <Card className="border-border/70 bg-white/95 p-6 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Nhắc học hôm nay
                </p>
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--brand-900)]">
                20 phút luyện phản xạ
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hoàn thành bài nói ngắn để giữ chuỗi học liên tục.
              </p>
              <AppButton className="mt-5 h-10 w-full rounded-full">
                <PlayCircle className="mr-2 h-4 w-4" />
                Bắt đầu ngay
              </AppButton>
            </Card>

            <Card className="border-border/70 bg-white/95 p-6 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Hỗ trợ
                </p>
                <PenTool className="h-4 w-4 text-primary" />
              </div>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--brand-900)]">
                Cần góp ý bài tập?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Gửi bài viết hoặc ghi âm để nhận phản hồi trong 24h.
              </p>
              <Button asChild variant="outline" className="mt-5 h-10 w-full rounded-full">
                <Link href="/notes">Gửi bài tập</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
