import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CourseLearningPlayerClient } from '@/app/courses/components/course-learning-player.client'
import { Course } from '@/data/models/course.model'
import { ICourseRepository } from '@/data/repositories/remote/course/course.repository.interface'
import { resolveServer } from '@/shared/ioc/server-container'
import { IOC_TOKENS } from '@/shared/ioc/tokens'

type CoursePageProps = {
  params: Promise<{ slug: string }>
}

function buildCourseDescription(course: Course): string {
  if (course.description) {
    return course.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
  }
  return `Khám phá khóa học ${course.name ?? ''} tại Shining English.`
}

const getCourseBySlug = cache(async (slug: string): Promise<Course | null> => {
  const repository = resolveServer<ICourseRepository>(IOC_TOKENS.COURSE_REPOSITORY)
  const result = await repository.getBySlug(slug)

  if (result.exception) {
    if (result.exception.httpStatus === 404) {
      return null
    }

    throw result.exception
  }

  return result.response?.data ?? null
})

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) {
    return {
      title: 'Không tìm thấy khóa học | Shining English',
      description: 'Khóa học không tồn tại hoặc đã bị gỡ.',
    }
  }

  return {
    title: `${course.name ?? 'Khóa học'} | Shining English`,
    description: buildCourseDescription(course),
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) {
    notFound()
  }
  const courseData = course.serialize()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CourseLearningPlayerClient course={courseData} />
    </main>
  )
}
