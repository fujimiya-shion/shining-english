'use client'

import { Button } from '@/components/ui/button'
import { AppButton } from '@/components/ui/app-button'
import { CourseCardItem } from '@/components/course/course-card-item'
import { BannerStarfield } from '@/components/banner/banner-starfield'
import { HeroAbstract } from '@/components/hero/hero-abstract'
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
} from 'lucide-react'
import { Card } from '@/components/ui/card'

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
  const featurePalettes = [
    {
      card: 'from-[color:var(--sky-60)] via-white to-[color:var(--sky-80)]',
      icon: 'from-[color:var(--primary)] to-[color:var(--chart-5)]',
      accent: 'bg-[color:var(--primary)]/15 text-[color:var(--brand-900)]',
    },
    {
      card: 'from-[color:var(--sky-70)] via-white to-[color:var(--sky-90)]',
      icon: 'from-[color:var(--chart-2)] to-[color:var(--sky-300)]',
      accent: 'bg-[color:var(--chart-2)]/18 text-[color:var(--brand-800)]',
    },
    {
      card: 'from-[color:var(--sky-60)] via-white to-[color:var(--sky-100)]',
      icon: 'from-[color:var(--chart-4)] to-[color:var(--chart-2)]',
      accent: 'bg-[color:var(--chart-4)]/18 text-[color:var(--brand-900)]',
    },
    {
      card: 'from-[color:var(--sky-80)] via-white to-[color:var(--sky-110)]',
      icon: 'from-[color:var(--chart-3)] to-[color:var(--chart-5)]',
      accent: 'bg-[color:var(--chart-3)]/18 text-[color:var(--brand-900)]',
    },
    {
      card: 'from-[color:var(--sky-70)] via-white to-[color:var(--sky-110)]',
      icon: 'from-[color:var(--chart-2)] to-[color:var(--chart-4)]',
      accent: 'bg-[color:var(--chart-2)]/16 text-[color:var(--brand-800)]',
    },
    {
      card: 'from-[color:var(--sky-80)] via-white to-[color:var(--sky-100)]',
      icon: 'from-[color:var(--chart-4)] to-[color:var(--chart-3)]',
      accent: 'bg-[color:var(--chart-4)]/16 text-[color:var(--brand-800)]',
    },
  ]
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
        '.banner-star',
        { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          stagger: { each: 0.03, from: 'random' },
        },
        '-=0.6'
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
    <div className="min-h-screen bg-background text-foreground bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-100)_0%,var(--sky-80)_55%,var(--white)_100%)]">
      {/* Banner Section */}
      <section className="relative h-[450px] overflow-hidden border-b border-border flex items-end md:items-center">
        <div className="absolute inset-0">
          <BannerStarfield />
          <div className="absolute inset-0 bg-linear-to-r from-[color:var(--brand-950)]/90 via-[color:var(--brand-925)]/60 to-transparent"></div>
          <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full border border-white/15 bg-white/5 blur-[1px]"></div>
          <div className="pointer-events-none absolute right-24 bottom-10 h-16 w-16 rounded-full border-2 border-dashed border-white/25"></div>
        </div>
        <div className="pointer-events-none absolute top-1/2 hidden w-full -translate-y-1/2 lg:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Image
              src="/images/app_logo.svg"
              alt="Shining English"
              width={220}
              height={220}
              className="h-40 w-auto -ml-4 origin-left drop-shadow-[0_14px_36px_rgba(0,0,0,0.5)] sm:-ml-2 sm:h-44 xl:h-48"
              style={{ transform: 'translateX(-16%) scale(1.12)' }}
            />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 xl:pt-20 xl:pb-24 2xl:pt-16">
          <div className="w-full text-white text-left lg:pl-40">
            <p className="banner-kicker text-xs uppercase tracking-[0.2em] text-[color:var(--sky-200)] sm:text-sm">
              Series mới mỗi tuần
            </p>
            <h2 className="banner-title mt-4 text-3xl font-bold leading-tight max-w-7xl ml-0 sm:mt-5 sm:text-4xl lg:text-6xl">
              Học tiếng Anh theo video ngắn, dễ hiểu, thực tế
            </h2>

            <p className="banner-subtitle mt-4 text-sm text-[color:var(--sky-220)] max-w-3xl ml-0 sm:mt-5 sm:text-lg lg:text-xl">
              Hệ thống bài học do một người tự quay và giảng dạy, tập trung vào lỗi thường gặp.
            </p>
            
            <div className="banner-buttons mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <AppButton size="lg" className="px-7 w-full sm:w-auto">
                Khám Phá Khóa Học
              </AppButton>
              <Button size="lg" variant="outline" className="px-7 w-full sm:w-auto bg-transparent text-white border-white/40 hover:border-white">
                Xem Lộ Trình
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-[color:var(--sky-200)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Lộ trình rõ ràng
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Học 10-15 phút/ngày
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <Award className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Theo dõi tiến bộ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 min-h-[600px] flex items-center">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full">
          <div className="text-center lg:text-left w-full">
            <div className="hero-kicker inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-700)] bg-[color:var(--brand-900)]/85 px-4 py-1 text-xs font-medium text-[color:var(--sky-200)] shadow-sm mx-auto lg:mx-0">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Nền tảng học tiếng Anh do một người trực tiếp xây dựng
            </div>
            <h1 className="hero-title mt-4 text-[30px] sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-[22rem] sm:max-w-none mx-auto lg:mx-0">
              Nói Tiếng Anh <span className="text-primary">Tự Tin</span> & Lưu Loát
            </h1>
            <p className="hero-subtitle mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Mình tự quay video, tự dạy và tự xây lộ trình học. Bạn học ngữ pháp, giao tiếp, viết và luyện thi theo cách dễ hiểu, gọn và thực tế.
            </p>
            <div className="hero-buttons mt-10 grid w-full gap-4 lg:flex lg:flex-wrap lg:justify-start">
              <AppButton size="lg" className="px-8 w-full sm:w-auto">
                Bắt Đầu Học Ngay
              </AppButton>
              <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto bg-transparent">
                Xem Khóa Học
              </Button>
            </div>
            <div className="hero-stats mt-12 flex gap-8 justify-center lg:justify-start">
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
            <div className="hero-float relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--brand-900)]/25 bg-white shadow-[0_24px_55px_-26px_rgba(15,23,42,0.65)]">
              <HeroAbstract />
              <div className="hero-glow absolute inset-0 bg-gradient-to-tr from-[color:var(--brand-950)]/45 via-transparent to-transparent"></div>
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--brand-900)] shadow-sm">
                15 phút/bài
              </div>
              <div className="absolute right-4 top-6 rounded-2xl bg-[color:var(--primary)]/90 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Bài mới hàng tuần
              </div>
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
      <section
        className="bg-[linear-gradient(135deg,var(--brand-925)_0%,var(--brand-850)_60%,var(--brand-750)_100%)] border-t border-border text-white"
        data-animate="stagger"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 reveal-item text-center lg:text-left">
            <h2 className="text-3xl font-bold">Khóa Học Mình Tự Làm</h2>
            <p className="mt-2 text-white/70">Nội dung tự quay – tự dạy, tập trung vào hiệu quả thực tế</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {mockCourses.map((course) => (
              <CourseCardItem
                key={course.id}
                title={course.title}
                image={course.image || "/placeholder.svg"}
                category={course.category}
                rating={course.rating}
                students={course.students}
                price={course.price}
                metaNote="Có phản hồi trực tiếp"
                href={`/courses/${course.id}`}
                actions={
                  <>
                    <AppButton asChild className="flex-1 rounded-full">
                      <Link href={`/courses/${course.id}`}>Xem Chi Tiết</Link>
                    </AppButton>
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
                  </>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Shining English */}
      <section className="relative overflow-hidden border-t border-border bg-[radial-gradient(120%_120%_at_20%_10%,var(--sky-60)_0%,var(--white)_55%,var(--sky-90)_100%)]" data-animate="stagger">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color:var(--primary)]/12 blur-3xl"></div>
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[color:var(--chart-2)]/16 blur-3xl"></div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center reveal-item">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-primary/10">
              Học theo phong cách dễ hiểu
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-3">Vì Sao Nên Học Ở Đây?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Một người làm – một phong cách dạy, nhất quán và dễ theo</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              const palette = featurePalettes[index % featurePalettes.length]
              return (
                <div
                  key={index}
                  className={`course-card reveal-item group relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br ${palette.card} p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-30px_rgba(15,23,42,0.55)]`}
                >
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm">
                    Nổi bật
                  </div>
                  <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${palette.icon}`}></div>
                    <IconComponent className="relative h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ring-slate-200">
                    <span className={`h-1.5 w-1.5 rounded-full ${palette.accent}`}></span>
                    <span className="text-slate-600">Dễ theo – thực tế</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="relative border-t border-border bg-[linear-gradient(120deg,var(--brand-950)_0%,var(--brand-900)_55%,var(--brand-800)_100%)] text-white"
        data-animate="stagger"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center reveal-item">
            <h2 className="text-3xl font-bold mb-4">Học Kiểu Thực Tế</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Chọn khóa, học theo video, luyện tập và nhận phản hồi</p>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-12 hidden h-0 w-[85%] -translate-x-1/2 border-t-2 border-dashed border-white/40 lg:block"></div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Chọn Khóa Học',
                  description: 'Lựa chọn khóa học phù hợp với mục tiêu và trình độ của bạn',
                  icon: BookOpen,
                  accent: 'from-[color:var(--brand-800)] to-[color:var(--chart-2)]',
                },
                {
                  title: 'Học & Thực Hành',
                  description: 'Xem video, làm bài tập và luyện nói theo bài',
                  icon: CheckCircle,
                  accent: 'from-[color:var(--primary)] to-[color:var(--chart-5)]',
                },
                {
                  title: 'Nhận Phản Hồi',
                  description: 'Gửi bài, mình xem và góp ý cách học nhanh hơn',
                  icon: MessageCircle,
                  accent: 'from-[color:var(--brand-700)] to-[color:var(--chart-2)]',
                },
                {
                  title: 'Ghi Nhận Tiến Bộ',
                  description: 'Theo dõi kỹ năng bạn cải thiện mỗi tuần',
                  icon: Award,
                  accent: 'from-[color:var(--brand-900)] to-[color:var(--chart-4)]',
                },
              ].map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={step.title}
                    className="course-card reveal-item relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_18px_45px_-32px_rgba(6,16,32,0.8)] backdrop-blur"
                  >
                    <div className="absolute left-1/2 top-2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--primary)] shadow-[0_0_0_6px_rgba(242,169,0,0.22)] lg:block"></div>
                    <div className="relative mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                      <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.accent} opacity-30`}></span>
                      <IconComponent className="relative h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/20 px-3 py-1 text-xs font-semibold text-white">
                      Bước {index + 1}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-white/70">{step.description}</p>
                  </div>
                )
              })}
            </div>
            <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Học linh hoạt mỗi ngày</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Bài tập vui, dễ nhớ</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Theo dõi tiến bộ rõ ràng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-[radial-gradient(120%_120%_at_80%_0%,var(--sky-70)_0%,var(--white)_55%,var(--sky-90)_100%)]" data-animate="stagger">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center reveal-item">
            <h2 className="text-3xl font-bold mb-4">Người Học Nói Gì?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Những phản hồi thật từ người học sau khi theo lộ trình</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="course-card reveal-item p-6 rounded-2xl border-[color:var(--border)]/80 bg-white/95 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)]">
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
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex gap-1 mt-4 text-[color:var(--primary)]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Quick Stats */}
      <section className="relative border-t border-border bg-[linear-gradient(120deg,var(--brand-950)_0%,var(--brand-900)_45%,var(--primary)_80%,var(--chart-5)_100%)] text-primary-foreground" data-animate="stagger">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35)_0,transparent_40%),radial-gradient(circle_at_85%_10%,rgba(242,169,0,0.4)_0,transparent_45%)]"></div>
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
      <section className="border-t border-border bg-[radial-gradient(120%_120%_at_20%_0%,var(--sky-60)_0%,var(--white)_60%,var(--sky-90)_100%)]" data-animate="stagger">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 reveal-item">Sẵn Sàng Học Theo Cách Dễ Hiểu?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto reveal-item">Tự học nhưng không cô đơn — mình sẽ theo sát từng bước</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <AppButton size="lg" className="px-8 reveal-item">
              Khám Phá Khóa Học
            </AppButton>
            <Button size="lg" variant="outline" className="px-8 bg-transparent reveal-item">
              Xem Câu Hỏi Thường Gặp
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
