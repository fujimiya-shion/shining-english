'use client'

import { useEffect, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import gsap from 'gsap'
import {
  BannerSection,
  CTASection,
  FeaturedCoursesSection,
  HeroSection,
  HowItWorksSection,
  QuickStatsSection,
  TestimonialsSection,
  WhyChooseSection,
} from '@/shared/components/ui/section/home'
import { useHomeStore } from '@/app/home/stores/home.store'
import { AppStatus } from '@/shared/enums/app-status'

export function HomePageClient() {
  const hasAnimatedRef = useRef(false)
  const status = useHomeStore((state) => state.status)
  const actionStatus = useHomeStore((state) => state.actionStatus)
  const homePage = useHomeStore((state) => state.homePage)
  const errorMessage = useHomeStore((state) => state.errorMessage)
  const actionMessage = useHomeStore((state) => state.actionMessage)
  const initial = useHomeStore((state) => state.initial)
  const fetchHomeData = useHomeStore((state) => state.fetchHomeData)
  const addCourseToCart = useHomeStore((state) => state.addCourseToCart)
  const clearActionFeedback = useHomeStore((state) => state.clearActionFeedback)

  useEffect(() => {
    if (status === AppStatus.initial) {
      void initial()
    }
  }, [initial, status])

  useEffect(() => {
    if (!homePage || hasAnimatedRef.current) {
      return
    }

    hasAnimatedRef.current = true

    let observer: IntersectionObserver | null = null
    let animationFrameId = window.requestAnimationFrame(() => {
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

      observer = new IntersectionObserver(
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
              observer?.unobserve(target)
            }
          })
        },
        { threshold: 0.15 }
      )

      const revealGroups = document.querySelectorAll('[data-animate="stagger"], .reveal-once')
      revealGroups.forEach((group) => observer?.observe(group))
    })

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      observer?.disconnect()
    }
  }, [homePage])

  useEffect(() => {
    if (status === AppStatus.error && errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage, status])

  useEffect(() => {
    if (!actionMessage) {
      return
    }

    if (actionStatus === AppStatus.success) {
      toast.success(actionMessage)
      clearActionFeedback()
      return
    }

    if (actionStatus === AppStatus.error) {
      toast.error(actionMessage)
      clearActionFeedback()
    }
  }, [actionMessage, actionStatus, clearActionFeedback])

  if (!homePage && status !== AppStatus.error) {
    return (
      <main className="min-h-screen bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-100)_0%,var(--sky-80)_55%,var(--white)_100%)] px-4 py-24">
        <Toaster position="top-right" />
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-96 rounded-3xl bg-[color:var(--brand-950)]/10" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-80 rounded-3xl bg-[color:var(--brand-900)]/8" />
            <div className="h-80 rounded-3xl bg-[color:var(--brand-900)]/8" />
          </div>
        </div>
      </main>
    )
  }

  if (!homePage) {
    return (
      <main className="min-h-screen bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-100)_0%,var(--sky-80)_55%,var(--white)_100%)] px-4 py-24">
        <Toaster position="top-right" />
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-white/90 p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[color:var(--brand-900)]">Không thể tải trang chủ</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Dữ liệu home hiện chưa sẵn sàng. Vui lòng thử tải lại.
          </p>
          <button
            type="button"
            onClick={() => void fetchHomeData()}
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
          >
            Tải lại
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-100)_0%,var(--sky-80)_55%,var(--white)_100%)]">
      <Toaster position="top-right" />
      <BannerSection banner={homePage.banner} />
      <HeroSection hero={homePage.hero} />
      <FeaturedCoursesSection
        title={homePage.courseListing.title}
        description={homePage.courseListing.description}
        courses={homePage.courseListing.courses}
        onAddToCart={addCourseToCart}
      />
      <WhyChooseSection feature={homePage.feature} />
      <HowItWorksSection process={homePage.process} />
      <TestimonialsSection testimonials={homePage.testimonials} />
      <QuickStatsSection statistics={homePage.statistics} />
      <CTASection cta={homePage.cta} />
    </main>
  )
}
