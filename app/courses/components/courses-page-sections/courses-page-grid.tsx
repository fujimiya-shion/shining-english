'use client'

import { Course } from '@/data/models/course.model'
import { Button } from '@/shared/components/ui/button'
import { CourseCardItem } from '@/shared/components/ui/course/course-card-item'
import Image from 'next/image'

export function CoursesPageGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 sm:gap-6 xl:grid-cols-3">
      {courses.map((course) => {
        const detailHref = course.slug ? `/courses/${course.slug}` : undefined

        return (
          <CourseCardItem
            key={course.id}
            course={course}
            href={detailHref}
            className="shadow-[0_18px_50px_-45px_rgba(15,43,82,0.35)]"
            actionLabel={course.enrolled ? 'Tiếp tục học' : 'Xem Chi Tiết'}
            cartAction={
              course.enrolled ? null : (
                <Button
                  variant="outline"
                  size="icon"
                  className="group h-11 w-14 rounded-full bg-background hover:border-primary/60 hover:bg-background hover:text-foreground sm:w-11"
                  aria-label="Thêm vào giỏ"
                >
                  <span className="sr-only">Thêm Vào Giỏ</span>
                  <Image
                    src="https://img.icons8.com/ios/50/add-shopping-cart--v1.png"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </Button>
              )
            }
          />
        )
      })}
    </div>
  )
}
