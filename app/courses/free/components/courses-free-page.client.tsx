'use client'

import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Course } from '@/data/models/course.model'
import { resolveClient } from '@/shared/ioc/client-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'
import { ICourseRepository } from '@/data/repositories/remote/course/course.repository.interface'
import { AppStatus } from '@/shared/enums/app-status'
import { AppButton } from '@/shared/components/ui/app-button'
import { CourseCardItem } from '@/shared/components/ui/course/course-card-item'
import Link from 'next/link'
import { BookOpen, Sparkles } from 'lucide-react'

export function CoursesFreePageClient() {
  const [status, setStatus] = useState(AppStatus.initial)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    if (status !== AppStatus.initial) return

    setStatus(AppStatus.loading)
    const courseRepo = resolveClient<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY)

    courseRepo.getFree().then((apiResult) => {
      apiResult.when({
        success: (response) => {
          setCourses(response.data)
          setStatus(AppStatus.done)
        },
        error: () => {
          setStatus(AppStatus.error)
        },
      })
    })
  }, [status])

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)]">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Miễn phí
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[color:var(--brand-900)] sm:mt-3 sm:text-4xl">
              Khóa học miễn phí
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Các khóa học tiếng Anh hoàn toàn miễn phí, không giới hạn thời gian truy cập.
            </p>
          </div>
          <AppButton asChild variant="outline" className="rounded-full shrink-0">
            <Link href="/courses">
              <BookOpen className="h-4 w-4" />
              Xem tất cả khóa học
            </Link>
          </AppButton>
        </div>

        {status === AppStatus.loading && (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 sm:gap-6 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl bg-[color:var(--brand-900)]/8"
              />
            ))}
          </div>
        )}

        {status === AppStatus.done && courses.length === 0 && (
          <div className="mt-24 text-center">
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-white/80 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[color:var(--brand-900)]">
                Chưa có khóa học miễn phí
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Các khóa học miễn phí đang được cập nhật. Quay lại sau bạn nhé!
              </p>
              <AppButton asChild className="mt-6 rounded-full">
                <Link href="/courses">Xem tất cả khóa học</Link>
              </AppButton>
            </div>
          </div>
        )}

        {status === AppStatus.error && (
          <div className="mt-24 text-center">
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-white/80 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[color:var(--brand-900)]">
                Không thể tải khóa học
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Đã có lỗi xảy ra. Vui lòng thử lại sau.
              </p>
              <AppButton
                className="mt-6 rounded-full"
                onClick={() => setStatus(AppStatus.initial)}
              >
                Thử lại
              </AppButton>
            </div>
          </div>
        )}

        {status === AppStatus.done && courses.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 sm:gap-6 xl:grid-cols-3">
            {courses.map((course) => {
              const detailHref = course.slug ? `/courses/${course.slug}` : undefined

              return (
                <CourseCardItem
                  key={course.id}
                  course={course}
                  href={detailHref}
                  className="shadow-[0_18px_50px_-45px_rgba(15,43,82,0.35)]"
                  actionLabel="Xem Chi Tiết"
                />
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
