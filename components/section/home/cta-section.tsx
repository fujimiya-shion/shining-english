import { AppButton } from "@/components/ui/app-button";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
    return (
        <section className="border-t border-border bg-[radial-gradient(120%_120%_at_20%_0%,var(--sky-60)_0%,var(--white)_60%,var(--sky-90)_100%)]" data-animate="stagger">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold mb-4 reveal-item">Sẵn Sàng Học Theo Cách Dễ Hiểu?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto reveal-item">Tự học nhưng không cô đơn — mình sẽ theo sát từng bước</p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <AppButton size="lg" className="px-8 reveal-item">
                        Khám Phá Khóa Học
                    </AppButton>
                    <Button size="lg" variant="outline" className="px-8 bg-transparent reveal-item">
                        Xem Câu Hỏi Thường Gặp
                    </Button>
                </div>
            </div>
        </section>
    );
}