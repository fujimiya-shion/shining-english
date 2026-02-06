import { CourseCard, type CourseCardProps } from '@/components/course/course-card'

export type { CourseCardProps }

export function CourseCardItem(props: CourseCardProps) {
  return <CourseCard {...props} />
}
