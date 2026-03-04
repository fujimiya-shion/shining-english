import { CourseCard, type CourseCardProps } from '@/shared/components/ui/course/course-card'

export type { CourseCardProps }

export function CourseCardItem(props: CourseCardProps) {
  return <CourseCard {...props} />
}
