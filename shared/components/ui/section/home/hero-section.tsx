import Link from "next/link";
import { HomeHeroSectionModel } from "@/data/models/home.model";
import { AppButton } from "@/shared/components/ui/app-button";
import { Button } from "@/shared/components/ui/button";
import { HeroAbstract } from "@/shared/components/ui/hero/hero-abstract";
import { resolveHomeIcon } from "@/shared/components/ui/section/home/home-section-icon";

type HeroSectionProps = {
    hero: HomeHeroSectionModel;
}

export const HeroSection = ({ hero }: HeroSectionProps) => {
    const ImageCtaIcon = resolveHomeIcon(hero.imageCta.icon)

    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 min-h-150 flex items-center">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full">
                <div className="text-center lg:text-left w-full">
                    <div className="hero-kicker inline-flex items-center gap-2 rounded-full border border-(--brand-700) bg-(--brand-900)/85 px-4 py-1 text-xs font-medium text-(--sky-200) shadow-sm mx-auto lg:mx-0">
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                        More Than English
                    </div>
                    {hero.htmlTitle ? (
                        <h1
                            className="hero-title mt-4 text-[30px] sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-88 sm:max-w-none mx-auto lg:mx-0 [&_span]:text-primary"
                            dangerouslySetInnerHTML={{ __html: hero.htmlTitle }}
                        />
                    ) : (
                        <h1 className="hero-title mt-4 text-[30px] sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-88 sm:max-w-none mx-auto lg:mx-0">
                            {hero.title}
                        </h1>
                    )}
                    <p className="hero-subtitle mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {hero.description}
                    </p>
                    <div className="hero-buttons mt-10 grid w-full gap-4 lg:flex lg:flex-wrap lg:justify-start">
                        {hero.actions.map((action) =>
                            action.type === "primary" ? (
                                <AppButton key={`${action.type}-${action.title}`} asChild size="lg" className="px-8 w-full sm:w-auto">
                                    <Link href={action.action}>{action.title}</Link>
                                </AppButton>
                            ) : (
                                <Button key={`${action.type}-${action.title}`} asChild size="lg" variant="outline" className="px-8 w-full sm:w-auto bg-transparent">
                                    <Link href={action.action}>{action.title}</Link>
                                </Button>
                            )
                        )}
                    </div>
                    <div className="hero-stats mt-12 flex gap-8 justify-center lg:justify-start">
                        {hero.ctas.map((cta) => (
                            <div key={`${cta.title}-${cta.description}`}>
                                <p className="text-3xl font-bold text-primary">{cta.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{cta.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero-stats relative">
                    <div className="hero-float relative aspect-4/3 overflow-hidden rounded-2xl border border-(--brand-900)/25 bg-white shadow-[0_24px_55px_-26px_rgba(15,23,42,0.65)]">
                        <HeroAbstract />
                        <div className="hero-glow absolute inset-0 bg-linear-to-tr from-(--brand-950)/45 via-transparent to-transparent"></div>
                        {hero.imageTags[0] ? (
                            <div
                                className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                                style={{ backgroundColor: hero.imageTags[0].hexBgColor, color: hero.imageTags[0].hexTextColor }}
                            >
                                {hero.imageTags[0].text}
                            </div>
                        ) : null}
                        {hero.imageTags[1] ? (
                            <div
                                className="absolute right-4 top-6 rounded-2xl px-3 py-1 text-xs font-semibold shadow-sm"
                                style={{ backgroundColor: hero.imageTags[1].hexBgColor, color: hero.imageTags[1].hexTextColor }}
                            >
                                {hero.imageTags[1].text}
                            </div>
                        ) : null}
                        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 p-4 shadow-lg backdrop-blur">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <ImageCtaIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{hero.imageCta.title}</p>
                                    <p className="text-xs text-muted-foreground">{hero.imageCta.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
