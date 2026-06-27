"use client";

import { HomeStatisticSectionModel } from "@/data/models/home.model";

type QuickStatsSectionProps = {
    statistics: HomeStatisticSectionModel;
}

export const QuickStatsSection = ({ statistics }: QuickStatsSectionProps) => {
    const titleColor = "text-white";
    const descColor = `${titleColor}/70`;

    return (
        <section className="relative border-t border-border bg-primary text-brand-900" data-animate="stagger">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.0)_40%,rgba(15,43,82,0.12)_100%)]"></div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4 text-center">
                    {statistics.items.map((item) => (
                        <div key={`${item.value}-${item.label}`} className="reveal-item">
                            <p className={`text-4xl font-bold mb-2 ${titleColor}`}>{item.value}</p>
                            <p className={descColor}>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
