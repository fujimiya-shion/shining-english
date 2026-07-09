"use client";

import { HomeFeatureSectionModel } from "@/data/models/home.model";
import { resolveHomeIcon } from "@/shared/components/ui/section/home/home-section-icon";

const palette = {
    tone: "text-[color:var(--primary)]",
    soft: "bg-[color:var(--primary)]/12",
    ring: "ring-[color:var(--primary)]/25",
    dot: "bg-[color:var(--primary)]",
};

type WhyChooseSectionProps = {
    feature: HomeFeatureSectionModel;
}

export const WhyChooseSection = ({ feature }: WhyChooseSectionProps) => {
    return (
        <section
            className="relative overflow-hidden border-t border-border bg-[radial-gradient(120%_120%_at_20%_10%,var(--sky-60)_0%,var(--white)_55%,var(--sky-90)_100%)]"
            data-animate="stagger"
        >
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-(--primary)/12 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-(--chart-2)/16 blur-3xl"></div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center reveal-item">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-primary/10">
                        {feature.eyebrow}
                    </span>
                    <h2 className="text-3xl font-bold mt-4 mb-3">{feature.title}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {feature.description}
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {feature.items.map((item) => {
                        const IconComponent = resolveHomeIcon(item.iconType);

                        return (
                            <div
                                key={item.title}
                                className="course-card reveal-item group relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-30px_rgba(15,23,42,0.55)]"
                            >
                                <div
                                    className={`absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold shadow-sm ring-1 ${palette.ring} ${palette.tone}`}
                                >
                                    {item.badgeText ?? "Nổi bật"}
                                </div>
                                <div
                                    className={`relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${palette.soft} shadow-md`}
                                >
                                    <IconComponent className={`h-6 w-6 ${palette.tone}`} strokeWidth={2} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.description}</p>
                                <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ring-slate-200">
                                    <span className={`h-1.5 w-1.5 rounded-full ${palette.dot}`}></span>
                                    <span className="text-slate-600">{item.tagText ?? "Dễ theo – thực tế"}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
