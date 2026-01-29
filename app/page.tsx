'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import gsap from 'gsap'
import {
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  Award,
  MessageCircle,
  Rocket,
  Star,
} from 'lucide-react'

const mockCourses = [
  {
    id: 1,
    title: 'Nắm Vững Ngữ Pháp Tiếng Anh',
    category: 'Ngữ Pháp',
    price: 790000,
    image: 'https://cdn.pixabay.com/photo/2020/05/04/19/43/computer-5130405_640.jpg',
    rating: 4.8,
    students: 2453,
  },
  {
    id: 2,
    title: 'Tiếng Anh Giao Tiếp Nâng Cao',
    category: 'Giao Tiếp',
    price: 890000,
    image: 'https://cdn.pixabay.com/photo/2020/04/18/16/21/online-5059831_1280.jpg',
    rating: 4.9,
    students: 3102,
  },
  {
    id: 3,
    title: 'Viết Tiếng Anh Chuyên Nghiệp',
    category: 'Viết Văn',
    price: 990000,
    image: 'https://cdn.pixabay.com/photo/2021/04/29/16/48/webinar-6216973_1280.jpg',
    rating: 4.7,
    students: 1876,
  },
  {
    id: 4,
    title: 'Luyện Thi IELTS & TOEFL',
    category: 'Thi Cử',
    price: 690000,
    image: 'https://images.unsplash.com/photo-1758874384070-d8f494b5abcf?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    rating: 4.6,
    students: 4521,
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Hà Linh',
    role: 'Sinh viên',
    content: 'Shining English giúp mình cải thiện kỹ năng speaking rất nhanh. Chỉ sau 2 tháng, mình đã tự tin nói chuyện với người nước ngoài.',
    image: 'https://images.pexels.com/photos/7403185/pexels-photo-7403185.jpeg?cs=srgb&dl=pexels-rdne-7403185.jpg&fm=jpg',
  },
  {
    id: 2,
    name: 'Minh Khánh',
    role: 'Chuyên gia IT',
    content: 'Tôi đã hoàn thành khóa IELTS và đạt 7.5 điểm. Cảm ơn các bài học chi tiết và bài tập thực hành của Shining English!',
    image: 'https://images.pexels.com/photos/7625294/pexels-photo-7625294.jpeg?cs=srgb&dl=pexels-mikhail-nilov-7625294.jpg&fm=jpg',
  },
  {
    id: 3,
    name: 'Thanh Hương',
    role: 'Nhân viên Marketing',
    content: 'Khóa viết tiếng Anh chuyên nghiệp thật tuyệt vời. Bây giờ mình có thể viết email tự tin và hiệu quả.',
    image: 'https://images.pexels.com/photos/8066637/pexels-photo-8066637.jpeg?cs=srgb&dl=pexels-anna-tarazevich-8066637.jpg&fm=jpg',
  },
]

const features = [
  {
    title: 'Lộ trình cá nhân',
    description: 'Từng bài được sắp xếp rõ ràng để bạn học đều và chắc',
    icon: BookOpen,
  },
  {
    title: 'Do một người hướng dẫn',
    description: 'Tôi tự quay, tự dạy và theo sát từng nội dung học',
    icon: Users,
  },
  {
    title: 'Bài tập thực chiến',
    description: 'Bài luyện nói – viết – phản xạ được cập nhật thường xuyên',
    icon: CheckCircle,
  },
  {
    title: 'Học theo tốc độ của bạn',
    description: 'Xem video bất cứ lúc nào, tua lại phần khó và học chậm',
    icon: Clock,
  },
  {
    title: 'Tiến bộ đo được',
    description: 'Theo dõi điểm số và kỹ năng bạn cải thiện mỗi tuần',
    icon: Award,
  },
  {
    title: 'Hỗ trợ trực tiếp',
    description: 'Nhắn mình bất cứ lúc nào khi cần gỡ vướng bài học',
    icon: MessageCircle,
  },
]

export default function HomePage() {
  const [cart, setCart] = useState<number[]>([])
  useEffect(() => {
    const bannerTimeline = gsap.timeline()

    bannerTimeline.fromTo(
        '.banner-kicker',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      bannerTimeline.fromTo(
        '.banner-title',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      bannerTimeline.fromTo(
        '.banner-subtitle',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.35'
      )
      bannerTimeline.fromTo(
        '.banner-buttons',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.35'
      )
      bannerTimeline.fromTo(
        '.nav-item',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05 }
      )

    if (document.querySelector('.hero-kicker')) {
      const heroTimeline = gsap.timeline({ delay: 0.1 })

      heroTimeline.fromTo(
        '.hero-kicker',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      heroTimeline.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      heroTimeline.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      heroTimeline.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      heroTimeline.fromTo(
        '.hero-stats',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out' },
        '-=0.4'
      )
    }

    gsap.to('.hero-float', {
      y: -12,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('.hero-glow', {
      opacity: 0.7,
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const items = target.querySelectorAll('.reveal-item')
            if (items.length > 0) {
              gsap.fromTo(
                items,
                { opacity: 0, y: 36, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: 'power3.out',
                  stagger: 0.12,
                }
              )
            } else {
              gsap.fromTo(
                target,
                { opacity: 0, y: 36, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
              )
            }
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const revealGroups = document.querySelectorAll('[data-animate="stagger"], .reveal-once')
    revealGroups.forEach((group) => observer.observe(group))

    return () => observer.disconnect()
  }, [])

  const addToCart = (courseId: number) => {
    setCart([...cart, courseId])
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner Section */}
      <section className="relative h-[450px] overflow-hidden border-b border-border flex items-end xl:items-center">
        <div className="absolute inset-0 relative">
          <Image
            src="/images/banner.webp"
            alt="Học online cùng video bài giảng"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pb-20 pt-28 sm:px-6 lg:px-8 xl:pt-20 xl:pb-24 2xl:pt-16">
          <div className="w-full text-white text-left">
            <p className="banner-kicker text-sm uppercase tracking-[0.2em] text-white/70">Series mới mỗi tuần</p>
            <h2 className="banner-title mt-5 text-5xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-7xl ml-0">
              Học tiếng Anh theo video ngắn, dễ hiểu, thực tế
            </h2>

            <p className="banner-subtitle mt-5 text-lg sm:text-xl text-white/80 max-w-3xl ml-0">
              Hệ thống bài học do một người tự quay và giảng dạy, tập trung vào lỗi thường gặp.
            </p>
            
            <div className="banner-buttons mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="px-7">
                Khám Phá Khóa Học
              </Button>
              <Button size="lg" variant="outline" className="px-7 bg-transparent text-white border-white/40 hover:border-white">
                Xem Lộ Trình
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 min-h-[600px] flex items-center">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full">
          <div>
            <div className="hero-kicker inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent"></span>
              Nền tảng học tiếng Anh do một người trực tiếp xây dựng
            </div>
            <h1 className="hero-title mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-balance leading-tight">
              Nói Tiếng Anh <span className="text-primary">Tự Tin</span> & Lưu Loát
            </h1>
            <p className="hero-subtitle mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Mình tự quay video, tự dạy và tự xây lộ trình học. Bạn học ngữ pháp, giao tiếp, viết và luyện thi theo cách dễ hiểu, gọn và thực tế.
            </p>
            <div className="hero-buttons mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="px-8">
                Bắt Đầu Học Ngay
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Xem Khóa Học
              </Button>
            </div>
            <div className="hero-stats mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Người Học Đã Theo</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.8★</p>
                <p className="text-sm text-muted-foreground mt-1">Đánh Giá Thật</p>
              </div>
            </div>
          </div>
          <div className="hero-stats relative">
            <div className="hero-float relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1758874384070-d8f494b5abcf?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000"
                alt="Lớp học trực tuyến với giáo viên qua video"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="hero-glow absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Rocket className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Học trực tuyến cùng người dạy</p>
                    <p className="text-xs text-muted-foreground">Mình trực tiếp phản hồi & cập nhật bài mới</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-muted/30 border-t border-border" data-animate="stagger">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 reveal-item">
            <h2 className="text-3xl font-bold">Khóa Học Mình Tự Làm</h2>
            <p className="text-muted-foreground mt-2">Nội dung tự quay – tự dạy, tập trung vào hiệu quả thực tế</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mockCourses.map((course) => (
              <Card
                key={course.id}
                className="course-card reveal-item group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-0 gap-0 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(0,0,0,0.5)]"
              >
                <div className="relative">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden rounded-t-2xl">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
                  <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
                    {course.category}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {course.rating}
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{course.students.toLocaleString()} học viên</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60"></span>
                    <span>Chứng chỉ hoàn thành</span>
                  </div>
                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/60">
                    <span className="text-lg font-bold text-primary">₫{course.price.toLocaleString('vi-VN')}</span>
                    <span className="text-xs text-muted-foreground">/khóa</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Button asChild className="flex-1 rounded-full">
                      <Link href={`/courses/${course.id}`}>Xem Chi Tiết</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="group rounded-full bg-background hover:bg-background hover:text-foreground hover:border-primary/60"
                      onClick={() => addToCart(course.id)}
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Shining English */}
      <section className="border-t border-border" data-animate="stagger">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center reveal-item">
            <h2 className="text-3xl font-bold mb-4">Vì Sao Nên Học Ở Đây?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Một người làm – một phong cách dạy, nhất quán và dễ theo</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="course-card reveal-item p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 border-t border-border" data-animate="stagger">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center reveal-item">
            <h2 className="text-3xl font-bold mb-4">Học Kiểu Thực Tế</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Chọn khóa, học theo video, luyện tập và nhận phản hồi</p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="course-card reveal-item text-center">
              <div className="text-5xl font-bold text-primary mb-4">1</div>
              <h3 className="font-semibold mb-2">Chọn Khóa Học</h3>
              <p className="text-sm text-muted-foreground">Lựa chọn khóa học phù hợp với mục tiêu và trình độ của bạn</p>
            </div>
            <div className="course-card reveal-item text-center">
              <div className="text-5xl font-bold text-primary mb-4">2</div>
              <h3 className="font-semibold mb-2">Học & Thực Hành</h3>
              <p className="text-sm text-muted-foreground">Xem video, làm bài tập và luyện nói theo bài</p>
            </div>
            <div className="course-card reveal-item text-center">
              <div className="text-5xl font-bold text-primary mb-4">3</div>
              <h3 className="font-semibold mb-2">Nhận Phản Hồi</h3>
              <p className="text-sm text-muted-foreground">Gửi bài, mình xem và góp ý cách học nhanh hơn</p>
            </div>
            <div className="course-card reveal-item text-center">
              <div className="text-5xl font-bold text-primary mb-4">4</div>
              <h3 className="font-semibold mb-2">Ghi Nhận Tiến Bộ</h3>
              <p className="text-sm text-muted-foreground">Theo dõi kỹ năng bạn cải thiện mỗi tuần</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border" data-animate="stagger">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center reveal-item">
            <h2 className="text-3xl font-bold mb-4">Người Học Nói Gì?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Những phản hồi thật từ người học sau khi theo lộ trình</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="course-card reveal-item p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Quick Stats */}
      <section className="bg-primary text-primary-foreground border-t border-border" data-animate="stagger">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div className="reveal-item">
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-primary-foreground/80">Người Học Đang Theo</p>
            </div>
            <div className="reveal-item">
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-primary-foreground/80">Video & Bài Luyện</p>
            </div>
            <div className="reveal-item">
              <p className="text-4xl font-bold mb-2">4.8★</p>
              <p className="text-primary-foreground/80">Đánh Giá Thật</p>
            </div>
            <div className="reveal-item">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-primary-foreground/80">Phản Hồi Linh Hoạt</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border" data-animate="stagger">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 reveal-item">Sẵn Sàng Học Theo Cách Dễ Hiểu?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto reveal-item">Tự học nhưng không cô đơn — mình sẽ theo sát từng bước</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="px-8 reveal-item">
              Khám Phá Khóa Học
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent reveal-item">
              Xem Câu Hỏi Thường Gặp
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
