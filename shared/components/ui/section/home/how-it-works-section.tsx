"use client";

import { HomeProcessSectionModel } from "@/data/models/home.model";
import { resolveHomeIcon } from "@/shared/components/ui/section/home/home-section-icon";

type HowItWorksSectionProps = {
  process: HomeProcessSectionModel;
}

export const HowItWorksSection = ({ process }: HowItWorksSectionProps) => {
  const accents = [
    "from-[color:var(--brand-800)] to-[color:var(--chart-2)]",
    "from-[color:var(--primary)] to-[color:var(--chart-5)]",
    "from-[color:var(--brand-700)] to-[color:var(--chart-2)]",
    "from-[color:var(--brand-900)] to-[color:var(--chart-4)]",
  ]

  return (
    <section
      className="relative border-t border-border bg-[linear-gradient(120deg,var(--brand-950)_0%,var(--brand-900)_55%,var(--brand-800)_100%)] text-white"
      data-animate="stagger"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center reveal-item">
          <h2 className="text-3xl font-bold mb-4">{process.title}</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {process.description}
          </p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-12 hidden h-0 w-[85%] -translate-x-1/2 border-t-2 border-dashed border-white/40 lg:block"></div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, index) => {
              const IconComponent = resolveHomeIcon(step.iconType)

              return (
                <div
                  key={`${step.label}-${step.title}`}
                  className="course-card reveal-item relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_18px_45px_-32px_rgba(6,16,32,0.8)] backdrop-blur"
                >
                  <div className="absolute left-1/2 top-2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--primary)] shadow-[0_0_0_6px_rgba(242,169,0,0.22)] lg:block"></div>
                  <div className="relative mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <span
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accents[index % accents.length]} opacity-30`}
                    ></span>
                    <IconComponent className="relative h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/20 px-3 py-1 text-xs font-semibold text-white">
                    {step.label || `Bước ${index + 1}`}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-white/70">{step.description}</p>
                </div>
              );
            })}
          </div>
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
            {process.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
