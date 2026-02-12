"use client";

import { BannerStarfield } from "@/components/banner/banner-starfield";
import { AppButton } from "@/components/ui/app-button";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Clock } from "lucide-react";
import Image from "next/image";

export const BannerSection = () => {
    return (
        <section className="relative h-112.5 overflow-hidden border-b border-border flex items-end md:items-center">
            <div className="absolute inset-0">
                <BannerStarfield />
                <div className="absolute inset-0 bg-linear-to-r from-(--brand-950)/90 via-(--brand-925)/60 to-transparent"></div>
                <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full border border-white/15 bg-white/5 blur-[1px]"></div>
                <div className="pointer-events-none absolute right-24 bottom-10 h-16 w-16 rounded-full border-2 border-dashed border-white/25"></div>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-6 z-0 sm:hidden">
                <Image
                    src="/images/app_logo.svg"
                    alt=""
                    width={420}
                    height={420}
                    aria-hidden="true"
                    className="h-80 w-80 opacity-35 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 xl:pt-20 xl:pb-24 2xl:pt-16">
                <div className="flex flex-col gap-10 md:flex-row md:items-center">
                    <div className="hidden md:flex md:shrink-0 md:items-center">
                        <Image
                            src="/images/app_logo.svg"
                            alt="Shining English"
                            width={220}
                            height={220}
                            className="h-36 w-auto drop-shadow-[0_14px_36px_rgba(0,0,0,0.5)] md:h-40 xl:h-48"
                        />
                    </div>
                    <div className="w-full text-white text-left">
                        <p className="banner-kicker text-xs uppercase tracking-[0.2em] text-(--sky-200) sm:text-sm">
                            Series mới mỗi tuần
                        </p>
                        <h2 className="banner-title mt-4 text-3xl font-bold leading-tight max-w-7xl ml-0 sm:mt-5 sm:text-4xl lg:text-6xl">
                            Học tiếng Anh theo video ngắn, dễ hiểu, thực tế
                        </h2>

                        <p className="banner-subtitle mt-4 text-sm text-(--sky-220) max-w-3xl ml-0 sm:mt-5 sm:text-lg lg:text-xl">
                            Hệ thống bài học do một người tự quay và giảng dạy, tập trung vào lỗi thường gặp.
                        </p>

                        <div className="banner-buttons mt-8 grid gap-3 sm:flex sm:flex-wrap">
                            <AppButton size="lg" variant="fillGradient" className="px-7 w-full sm:w-auto">
                                Khám Phá Khóa Học
                            </AppButton>
                            <Button size="lg" variant="outline" className="px-7 w-full sm:w-auto bg-transparent text-white border-white/40 hover:border-white">
                                Xem Lộ Trình
                            </Button>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3 text-xs text-(--sky-200)">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                                <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                Lộ trình rõ ràng
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                                <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                Học 10-15 phút/ngày
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                                <Award className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                Theo dõi tiến bộ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
