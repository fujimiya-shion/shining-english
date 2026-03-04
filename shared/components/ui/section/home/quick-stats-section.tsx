"use client";

export const QuickStatsSection = () => {
    const titleColor = "text-white";
    const descColor = `${titleColor}/70`;
    return (
        <section className="relative border-t border-border bg-primary text-brand-900" data-animate="stagger">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.0)_40%,rgba(15,43,82,0.12)_100%)]"></div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4 text-center">
                    <div className="reveal-item">
                        <p className={`text-4xl font-bold mb-2 ${titleColor}`}>10K+</p>
                        <p className={descColor}>Người Học Đang Theo</p>
                    </div>
                    <div className="reveal-item">
                        <p className={`text-4xl font-bold mb-2 ${titleColor}`}>50+</p>
                        <p className={descColor}>Video & Bài Luyện</p>
                    </div>
                    <div className="reveal-item">
                        <p className={`text-4xl font-bold mb-2 ${titleColor}`}>4.8★</p>
                        <p className={descColor}>Đánh Giá Thật</p>
                    </div>
                    <div className="reveal-item">
                        <p className={`text-4xl font-bold mb-2 ${titleColor}`}>24/7</p>
                        <p className={descColor}>Phản Hồi Linh Hoạt</p>
                    </div>
                </div>
            </div>
        </section>
    );
}