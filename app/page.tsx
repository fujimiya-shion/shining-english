'use client'
import { 
    BannerSection,
    CTASection,
    FeaturedCoursesSection,
    HeroSection,
    HowItWorksSection,
    QuickStatsSection, 
    TestimonialsSection, 
    WhyChooseSection 
} from '@/shared/components/ui/section/home'
import { mockCourses } from '@/data/mock'
import gsap from 'gsap'
import { useEffect, useState } from 'react'

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
        // Header animation disabled per request

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
            <BannerSection />
            <HeroSection />
            <FeaturedCoursesSection courses={mockCourses} onAddToCart={addToCart} />
            <WhyChooseSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <QuickStatsSection />
            <CTASection />
        </div>
    )
}
