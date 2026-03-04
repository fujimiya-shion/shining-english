import { HeroAbstract } from "@/shared/components/ui/hero/hero-abstract";
import { AppButton } from "@/shared/components/ui/app-button";
import { Button } from "@/shared/components/ui/button";
import { Rocket } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 min-h-150 flex items-center">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full">
                <div className="text-center lg:text-left w-full">
                    <div className="hero-kicker inline-flex items-center gap-2 rounded-full border border-(--brand-700) bg-(--brand-900)/85 px-4 py-1 text-xs font-medium text-(--sky-200) shadow-sm mx-auto lg:mx-0">
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                        More Than English
                    </div>
                    <h1 className="hero-title mt-4 text-[30px] sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-88 sm:max-w-none mx-auto lg:mx-0">
                        More Than English. <span className="text-primary">Find Your Shine.</span>
                    </h1>
                    <p className="hero-subtitle mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Thay đổi cách bạn nhìn về tiếng Anh — và về chính mình.
                    </p>
                    <div className="hero-buttons mt-10 grid w-full gap-4 lg:flex lg:flex-wrap lg:justify-start">
                        <AppButton size="lg" className="px-8 w-full sm:w-auto">
                            Trải nghiệm miễn phí
                        </AppButton>
                        <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto bg-transparent">
                            Khám phá khóa học
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
                    <div className="hero-float relative aspect-4/3 overflow-hidden rounded-2xl border border-(--brand-900)/25 bg-white shadow-[0_24px_55px_-26px_rgba(15,23,42,0.65)]">
                        <HeroAbstract />
                        <div className="hero-glow absolute inset-0 bg-linear-to-tr from-(--brand-950)/45 via-transparent to-transparent"></div>
                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-(--brand-900) shadow-sm">
                            15 phút/bài
                        </div>
                        <div className="absolute right-4 top-6 rounded-2xl bg-(--primary)/90 px-3 py-1 text-xs font-semibold text-white shadow-sm">
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
    );
}
