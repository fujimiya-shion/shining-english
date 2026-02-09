"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { testimonials } from "@/data/mock";

export const TestimonialsSection = () => {
    return (
        <section
            className="border-t border-border bg-[radial-gradient(120%_120%_at_80%_0%,var(--sky-70)_0%,var(--white)_55%,var(--sky-90)_100%)]"
            data-animate="stagger"
        >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center reveal-item">
                    <h2 className="text-3xl font-bold mb-4">Người Học Nói Gì?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Những phản hồi thật từ người học sau khi theo lộ trình
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card
                            key={testimonial.id}
                            className="course-card reveal-item p-6 rounded-2xl border-(--border)/80 bg-white/95 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)]"
                        >
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
                            <div className="flex gap-1 mt-4 text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
