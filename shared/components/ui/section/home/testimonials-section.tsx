"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HomeTestimonialItemModel, HomeTestimonialSectionModel } from "@/data/models/home.model";
import { Card } from "@/shared/components/ui/card";
import { AppUtils } from "@/shared/utils/app-utils";

type TestimonialsSectionProps = {
    testimonials: HomeTestimonialSectionModel;
}

function buildInitials(name?: string): string {
    if (!name) {
        return "SE";
    }

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}

function renderStars(item: HomeTestimonialItemModel) {
    const totalStars = Math.max(1, Math.min(5, Math.round(item.rating ?? 5)))

    return [...Array(totalStars)].map((_, index) => <span key={index}>★</span>)
}

function TestimonialAvatar({ item }: { item: HomeTestimonialItemModel }) {
    if (!item.user?.avatar) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[color:var(--sky-70)] text-sm font-semibold text-[color:var(--brand-900)]">
                {buildInitials(item.user?.name)}
            </div>
        )
    }

    return (
        <img
            src={AppUtils.getHostUrl(item.user.avatar)}
            alt={item.user.name ?? "Học viên"}
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
        />
    )
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onEmblaSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onEmblaSelect();
        emblaApi.on("reInit", onEmblaSelect);
        emblaApi.on("select", onEmblaSelect);
        return () => {
            emblaApi.off("reInit", onEmblaSelect);
            emblaApi.off("select", onEmblaSelect);
        };
    }, [emblaApi, onEmblaSelect]);

    useEffect(() => {
        if (!emblaApi) return;
        const interval = window.setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 4200);
        return () => window.clearInterval(interval);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <section
            className="border-t border-border bg-[radial-gradient(120%_120%_at_80%_0%,var(--sky-70)_0%,var(--white)_55%,var(--sky-90)_100%)]"
            data-animate="stagger"
        >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center reveal-item">
                    <h2 className="text-3xl font-bold mb-4">{testimonials.title}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {testimonials.description}
                    </p>
                </div>
                <div className="space-y-6">
                    <div className="overflow-hidden md:hidden" ref={emblaRef}>
                        <div className="flex gap-4">
                            {testimonials.items.map((testimonial) => (
                                <div key={testimonial.id ?? `${testimonial.user?.name}-${testimonial.content}`} className="min-w-0 shrink-0 basis-full">
                                    <Card className="course-card reveal-item p-6 rounded-2xl border-(--border)/80 bg-white/95 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)]">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
                                                <TestimonialAvatar item={testimonial} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{testimonial.user?.name ?? "Học viên"}</h3>
                                                <p className="text-xs text-muted-foreground">{testimonial.course?.name ?? "Shining English"}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>
                                        <div className="flex gap-1 mt-4 text-primary">
                                            {renderStars(testimonial)}
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden gap-8 md:grid md:grid-cols-3">
                        {testimonials.items.map((testimonial) => (
                            <Card
                                key={testimonial.id ?? `${testimonial.user?.name}-${testimonial.content}`}
                                className="course-card reveal-item p-6 rounded-2xl border-(--border)/80 bg-white/95 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)]"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
                                        <TestimonialAvatar item={testimonial} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{testimonial.user?.name ?? "Học viên"}</h3>
                                        <p className="text-xs text-muted-foreground">{testimonial.course?.name ?? "Shining English"}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                    &ldquo;{testimonial.content}&rdquo;
                                </p>
                                <div className="flex gap-1 mt-4 text-primary">
                                    {renderStars(testimonial)}
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-3 md:hidden">
                        <button
                            type="button"
                            className="rounded-full border border-border/70 bg-white/80 px-3 py-2 text-sm text-(--brand-900) shadow-sm transition hover:bg-white"
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            aria-label="Trượt về trước"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="rounded-full border border-border/70 bg-white/80 px-3 py-2 text-sm text-(--brand-900) shadow-sm transition hover:bg-white"
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            aria-label="Trượt tiếp theo"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
