import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AppButton } from '@/components/ui/app-button'
import { Input } from '@/components/ui/input'
import { CourseCardItem } from '@/components/course/course-card-item'
import { Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const courses = [
  {
    id: 1,
    title: 'Tiếng Anh Giao Tiếp Căn Bản',
    level: 'Beginner',
    duration: '6 tuần',
    lessons: 24,
    price: '690.000',
    rating: 4.8,
    students: '2.3k',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?fm=jpg&q=80&w=1200',
    tag: 'Giao tiếp',
  },
  {
    id: 2,
    title: 'Luyện Phản Xạ Nói Tự Nhiên',
    level: 'Intermediate',
    duration: '8 tuần',
    lessons: 32,
    price: '790.000',
    rating: 4.9,
    students: '3.1k',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?fm=jpg&q=80&w=1200',
    tag: 'Speaking',
  },
  {
    id: 3,
    title: 'Ngữ Pháp Trọng Tâm',
    level: 'Beginner',
    duration: '5 tuần',
    lessons: 20,
    price: '650.000',
    rating: 4.7,
    students: '1.7k',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?fm=jpg&q=80&w=1200',
    tag: 'Ngữ pháp',
  },
  {
    id: 4,
    title: 'Viết Email & Báo Cáo Chuyên Nghiệp',
    level: 'Intermediate',
    duration: '7 tuần',
    lessons: 28,
    price: '890.000',
    rating: 4.8,
    students: '1.9k',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?fm=jpg&q=80&w=1200',
    tag: 'Writing',
  },
  {
    id: 5,
    title: 'Luyện Thi IELTS Foundation',
    level: 'Intermediate',
    duration: '10 tuần',
    lessons: 40,
    price: '990.000',
    rating: 4.9,
    students: '4.2k',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?fm=jpg&q=80&w=1200',
    tag: 'IELTS',
  },
  {
    id: 6,
    title: 'Pronunciation Clinic',
    level: 'Beginner',
    duration: '4 tuần',
    lessons: 16,
    price: '590.000',
    rating: 4.6,
    students: '1.2k',
    image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?fm=jpg&q=80&w=1200',
    tag: 'Phát âm',
  },
]

const filters = {
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  topics: ['Giao tiếp', 'Ngữ pháp', 'Phát âm', 'IELTS', 'Writing', 'Speaking'],
  duration: ['< 4 tuần', '4-8 tuần', '> 8 tuần'],
  price: ['< 700k', '700k - 900k', '> 900k'],
}

export default function CoursesPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Khoá học</p>
            <h1 className="mt-3 text-4xl font-semibold text-[color:var(--brand-900)]">Chọn khoá học phù hợp</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Lộ trình được thiết kế theo mục tiêu cụ thể — từ giao tiếp cơ bản đến luyện thi chuyên sâu.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Input placeholder="Tìm khóa học..." className="h-10 w-full sm:w-72" />
            <AppButton size="icon" className="h-10 w-10 rounded-full">
              <Search className="h-4 w-4 text-white" />
              <span className="sr-only">Tìm kiếm</span>
            </AppButton>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
          {filters.topics.map((topic) => (
            <Button key={topic} variant="outline" size="sm" className="rounded-full">
              {topic}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
                <Card className="border-border/70 bg-white/90">
                  <CardContent className="space-y-6 px-5 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--brand-900)]">Bộ lọc</p>
                        <p className="text-xs text-muted-foreground">Chọn để thu gọn kết quả</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Xoá lọc
                      </Button>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-60)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Đang chọn
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {['Giao tiếp', 'Beginner', '4-8 tuần'].map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[color:var(--brand-900)] shadow-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-white p-4">
                    <p className="text-sm font-semibold">Trình độ</p>
                    <div className="mt-3 space-y-2">
                      {filters.levels.map((level) => (
                        <label key={level} className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-border" />
                            {level}
                          </span>
                          <span className="text-xs text-muted-foreground/70">12</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-white p-4">
                    <p className="text-sm font-semibold">Chủ đề</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {filters.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-border/80 bg-white px-3 py-1 text-xs text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-white p-4">
                    <p className="text-sm font-semibold">Thời lượng</p>
                    <div className="mt-3 space-y-2">
                      {filters.duration.map((item) => (
                        <label key={item} className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-border" />
                            {item}
                          </span>
                          <span className="text-xs text-muted-foreground/70">6</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-white p-4">
                    <p className="text-sm font-semibold">Mức giá</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Input placeholder="Từ 500k" className="h-9 text-xs" />
                      <Input placeholder="Đến 1.2M" className="h-9 text-xs" />
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-muted">
                      <div className="h-1.5 w-2/3 rounded-full bg-primary/70"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-muted-foreground">
              <span>Hiển thị 1-6 trong 24 khoá học</span>
              <div className="flex items-center gap-2">
                <span>Sắp xếp:</span>
                <Button variant="outline" size="sm" className="rounded-full">
                  Mới nhất
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full">
                  Phổ biến
                </Button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCardItem
                  key={course.id}
                  title={course.title}
                  image={course.image}
                  category={course.tag}
                  rating={course.rating}
                  students={course.students}
                  price={course.price}
                  metaNote="Có phản hồi trực tiếp"
                  href={`/courses/${course.id}`}
                  className="shadow-[0_18px_50px_-45px_rgba(15,43,82,0.35)]"
                  actionLabel="Xem Chi Tiết"
                  actions={
                    <>
                      <AppButton asChild className="flex-1 rounded-full">
                        <Link href={`/courses/${course.id}`}>Xem Chi Tiết</Link>
                      </AppButton>
                      <Button
                        variant="outline"
                        size="icon"
                        className="group rounded-full bg-background hover:bg-background hover:text-foreground hover:border-primary/60"
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
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-4 text-sm text-muted-foreground sm:flex-row">
              <span>Trang 1 / 4</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Trước
                </Button>
                <AppButton size="sm">1</AppButton>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
