'use client'

import { Course } from '@/data/models/course.model'
import { AppUtils } from '@/shared/utils/app-utils'
import { Button } from '@/shared/components/ui/button'
import { CourseCardItem } from '@/shared/components/ui/course/course-card-item'
import Image from 'next/image'
import Link from 'next/link'

export function CoursesPageGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => {
        const detailHref = course.slug ? `/courses/${course.slug}` : undefined

        return (
          <CourseCardItem
            key={course.id}
            course={course}
            image={AppUtils.getStorageUrl(course.thumbnail)}
            metaNote="Có phản hồi trực tiếp"
            href={detailHref}
            className="shadow-[0_18px_50px_-45px_rgba(15,43,82,0.35)]"
            actionLabel="Xem Chi Tiết"
            actions={
              <>
                <Button asChild className="flex-1 rounded-full">
                  {detailHref ? <Link href={detailHref}>Xem Chi Tiết</Link> : <span>Xem Chi Tiết</span>}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="group rounded-full bg-background hover:border-primary/60 hover:bg-background hover:text-foreground"
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
              </>
            }
          />
        )
      })}
    </div>
  )
}
