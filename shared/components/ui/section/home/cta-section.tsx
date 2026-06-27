import Link from "next/link";
import { HomeCtaSectionModel } from "@/data/models/home.model";
import { AppButton } from "@/shared/components/ui/app-button";
import { Button } from "@/shared/components/ui/button";

type CTASectionProps = {
    cta: HomeCtaSectionModel;
}

export const CTASection = ({ cta }: CTASectionProps) => {
    return (
        <section className="border-t border-border bg-[radial-gradient(120%_120%_at_20%_0%,var(--sky-60)_0%,var(--white)_60%,var(--sky-90)_100%)]" data-animate="stagger">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold mb-4 reveal-item">{cta.title}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto reveal-item">{cta.description}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                    {cta.actionButtons.map((button) =>
                        button.type === "primary" ? (
                            <AppButton key={`${button.type}-${button.title}`} asChild size="lg" className="px-8 reveal-item w-full md:w-fit">
                                <Link href={button.action}>{button.title}</Link>
                            </AppButton>
                        ) : (
                            <Button key={`${button.type}-${button.title}`} asChild size="lg" variant="outline" className="px-8 bg-transparent reveal-item w-full md:w-fit">
                                <Link href={button.action}>{button.title}</Link>
                            </Button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
