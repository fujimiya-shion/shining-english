import Link from 'next/link'
import Image from 'next/image'
import { AppButton } from '@/components/ui/app-button'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Rocket,
  Sparkles,
  Users,
  Video,
  BookOpen,
  ArrowRight,
  Bookmark,
  Calendar,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1400px_circle_at_top_left,var(--sky-110)_0%,var(--sky-70)_45%,var(--white)_100%)]">

      {/* Hero */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Về Shining English
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[color:var(--brand-900)] sm:text-5xl">
              Cách Shining English xây dựng nội dung học
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Đây là phần giải thích về triết lý, cấu trúc và tiêu chuẩn nội dung — để bạn
              hiểu rõ vì sao bài học ngắn mà vẫn đi đúng trọng tâm.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppButton asChild className="rounded-full">
                <Link href="/notes">
                  Xem đề cương mẫu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AppButton>
              <AppButton asChild variant="outline" className="rounded-full">
                <Link href="/blog">Đọc bài viết nền tảng</Link>
              </AppButton>
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-2">
            {[
              {
                title: 'Triết lý nội dung',
                desc: 'Tập trung vào phản xạ và tính ứng dụng trước khi mở rộng lý thuyết.',
                icon: Users,
              },
              {
                title: 'Thiết kế bài học',
                desc: 'Mỗi bài có mục tiêu rõ, ví dụ ngắn, bài tập gợi nhớ.',
                icon: Video,
              },
              {
                title: 'Ngôn ngữ & ví dụ',
                desc: 'Ví dụ sát ngữ cảnh đời thật để bạn áp dụng ngay.',
                icon: BookOpen,
              },
              {
                title: 'Vòng lặp phản hồi',
                desc: 'Cập nhật dựa trên câu hỏi thật từ học viên.',
                icon: Rocket,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-[color:var(--sky-70)] text-[color:var(--brand-900)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--brand-900)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border bg-white/80">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Câu chuyện</p>
              <h2 className="mt-3 text-3xl font-semibold text-[color:var(--brand-900)]">
                Từ một góc bàn nhỏ đến hàng ngàn học viên
              </h2>
              <p className="mt-4 text-muted-foreground">
                Shining English bắt đầu từ một mục tiêu rất giản dị: làm ra một lộ trình
                tự học tiếng Anh đủ rõ ràng để ai cũng có thể đi đến cùng. Không giáo trình
                phức tạp, không lan man — chỉ những bài học ngắn, thực tế và có hệ thống.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: '2023 — Bắt đầu quay video',
                    desc: 'Tự quay, tự sửa và thử nghiệm nội dung trên nhóm nhỏ học viên.',
                    tone: 'from-[#FFE6A7]/70 via-white to-white',
                    badge: 'bg-[#FFE8B5] text-[#8A5A00] border-[#F9D27A]',
                    icon: Bookmark,
                  },
                  {
                    title: '2024 — Hoàn thiện lộ trình 12 tuần',
                    desc: 'Xây khung học rõ ràng, mỗi tuần một mục tiêu, kèm bài tập thực hành.',
                    tone: 'from-[#DDEBFF]/80 via-white to-white',
                    badge: 'bg-[#E1EEFF] text-[#1F4A7A] border-[#B9D6FF]',
                    icon: Calendar,
                  },
                  {
                    title: '2025 — Cộng đồng phát triển',
                    desc: 'Hàng ngàn học viên theo học đều đặn, phản hồi tích cực về hiệu quả.',
                    tone: 'from-[#DFF7E7]/80 via-white to-white',
                    badge: 'bg-[#DFF7E7] text-[#0F5132] border-[#B7E8C7]',
                    icon: Sparkles,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-2xl border border-border/70 bg-gradient-to-br ${item.tone} p-4`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${item.badge}`}
                      >
                        <item.icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-[0_20px_60px_-40px_rgba(15,43,82,0.5)]">
                <Image
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=1200"
                  alt="Góc bàn làm việc Shining English"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <Card className="border-border/70 bg-white/95 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Lời chia sẻ
                </p>
                <h3 className="mt-3 text-lg font-semibold text-[color:var(--brand-900)]">
                  “Mục tiêu là giúp bạn nói tự tin chỉ với 20 phút mỗi ngày.”
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Mình tập trung vào việc xây lộ trình rõ ràng để người bận rộn vẫn học đều,
                  vẫn tiến bộ, và biết chính xác hôm nay cần học gì.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    SE
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--brand-900)]">Shining English</p>
                    <p className="text-xs text-muted-foreground">Founder & Instructor</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Câu hỏi thường gặp
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--brand-900)]">
              Những thắc mắc phổ biến trước khi học
            </h2>
            <p className="mt-2 text-muted-foreground">
              Trả lời nhanh những điều bạn cần biết trước khi bắt đầu.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-border/70 bg-white/95 px-6 py-4 shadow-[0_20px_60px_-45px_rgba(15,43,82,0.35)]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Không có nền tảng thì học được không?
                </AccordionTrigger>
                <AccordionContent>
                  Hoàn toàn được. Lộ trình bắt đầu từ nền tảng cơ bản, mỗi tuần đều có
                  gợi ý học cụ thể để bạn theo kịp và không bị ngợp.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Mỗi ngày cần học bao lâu?</AccordionTrigger>
                <AccordionContent>
                  Khoảng 20 phút/ngày là đủ nếu bạn học đều và làm bài tập ngắn sau mỗi
                  video. Điều quan trọng là duy trì nhịp học ổn định.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Có bài tập và phản hồi không?</AccordionTrigger>
                <AccordionContent>
                  Có. Bạn có thể gửi bài nói/viết để nhận góp ý, sửa nhanh và cập nhật
                  hướng cải thiện phù hợp.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Mình bận thì học trễ có sao không?</AccordionTrigger>
                <AccordionContent>
                  Không sao. Bạn có thể học theo tốc độ riêng, tua lại bài học và xem lại
                  bất cứ lúc nào.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-[color:var(--sky-70)] px-3 py-1">
                Phản hồi trong 24h
              </span>
              <span className="rounded-full border border-border/70 bg-[color:var(--sky-70)] px-3 py-1">
                Tư vấn lộ trình miễn phí
              </span>
              <span className="rounded-full border border-border/70 bg-[color:var(--sky-70)] px-3 py-1">
                Không spam email
              </span>
            </div>
            <AppButton asChild className="rounded-full">
              <Link href="/contact">Gửi câu hỏi mới</Link>
            </AppButton>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Trước khi bắt đầu
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--brand-900)]">
              Bạn có gặp những tình huống này?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Nếu có, lộ trình của Shining English được thiết kế để giải quyết từng điểm.
            </p>
          </div>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-px bg-[color:var(--sky-200)] md:block" />
            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  title: 'Học không đều',
                  desc: 'Không biết bắt đầu từ đâu, dễ bị ngắt quãng.',
                  tone: 'from-[#E8F0FF] via-white to-[#F8FBFF]',
                },
                {
                  title: 'Nghe hiểu nhưng ngại nói',
                  desc: 'Thiếu phản xạ khi gặp tình huống thật.',
                  tone: 'from-[#FFF0E0] via-white to-[#FFF8F0]',
                },
                {
                  title: 'Học nhiều nhưng không nhớ',
                  desc: 'Không có hệ thống ôn tập rõ ràng.',
                  tone: 'from-[#E7FAF3] via-white to-[#F3FFFB]',
                },
                {
                  title: 'Thiếu người góp ý',
                  desc: 'Không biết sai ở đâu để sửa kịp thời.',
                  tone: 'from-[#F3ECFF] via-white to-[#FAF7FF]',
                },
              ].map((item) => (
                <div key={item.title} className="flex justify-center">
                  <div className="relative">
                    <div
                      className={`h-40 w-40 rotate-45 rounded-3xl border border-border/70 bg-gradient-to-br ${item.tone} shadow-[0_16px_40px_-30px_rgba(15,43,82,0.45)]`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                          {item.title}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-border/70 bg-[linear-gradient(135deg,var(--brand-925)_0%,var(--brand-850)_60%,var(--brand-750)_100%)] p-10 text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold">Sẵn sàng bứt tốc với Shining English?</h2>
              <p className="mt-2 text-white/70">
                Chọn khóa phù hợp và bắt đầu lịch học ngay hôm nay.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AppButton asChild className="rounded-full">
                <Link href="/courses">Chọn khóa học</Link>
              </AppButton>
              <AppButton asChild variant="outline" className="rounded-full bg-transparent text-white border-white/40 hover:border-white">
                <Link href="/contact">Liên hệ tư vấn</Link>
              </AppButton>
            </div>
          </div>
        </Card>
      </section>

    </main>
  )
}
