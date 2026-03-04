import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AppButton } from '@/shared/components/ui/app-button'

export default function TermsPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Điều khoản sử dụng</CardTitle>
            <CardDescription>Cập nhật lần cuối: 02/02/2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">1. Giới thiệu</h2>
              <p>
                Shining English là nền tảng học tiếng Anh online qua video, cung cấp nội dung
                bài học, tài liệu đi kèm và dịch vụ hỗ trợ học viên. Khi truy cập và sử dụng
                nền tảng, bạn đồng ý tuân thủ các điều khoản dưới đây.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">2. Tài khoản & bảo mật</h2>
              <p>
                Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động phát sinh
                từ tài khoản của mình. Không chia sẻ tài khoản cho bên thứ ba khi chưa được
                sự cho phép bằng văn bản từ Shining English.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">3. Quyền sở hữu nội dung</h2>
              <p>
                Toàn bộ video, bài giảng, tài liệu và nội dung liên quan thuộc quyền sở hữu
                của Shining English. Bạn được cấp quyền sử dụng cá nhân, không độc quyền,
                không chuyển nhượng cho mục đích học tập. Mọi hành vi sao chép, phát tán,
                chia sẻ lại hoặc thương mại hóa khi chưa có sự cho phép đều bị nghiêm cấm.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">4. Quyền và nghĩa vụ của học viên</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Tuân thủ quy định, không sử dụng nội dung sai mục đích.</li>
                <li>Không đăng tải nội dung vi phạm pháp luật, xúc phạm hoặc gây hại người khác.</li>
                <li>Chịu trách nhiệm về dữ liệu cá nhân cung cấp trên nền tảng.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">5. Thanh toán & hoàn tiền</h2>
              <p>
                Thanh toán được thực hiện qua PayOS hoặc các phương thức được công bố.
                Chính sách hoàn tiền (nếu có) sẽ được công bố theo từng chương trình và
                chỉ áp dụng khi thỏa điều kiện cụ thể.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">6. Giới hạn trách nhiệm</h2>
              <p>
                Shining English nỗ lực đảm bảo chất lượng nội dung và dịch vụ. Tuy nhiên,
                kết quả học tập còn phụ thuộc vào sự chủ động và thời gian học của bạn.
                Nền tảng không chịu trách nhiệm cho các thiệt hại gián tiếp phát sinh từ
                việc sử dụng hoặc không thể sử dụng dịch vụ.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">7. Thay đổi điều khoản</h2>
              <p>
                Shining English có thể cập nhật điều khoản theo thời gian. Việc tiếp tục
                sử dụng dịch vụ sau khi điều khoản được cập nhật đồng nghĩa bạn chấp nhận
                các thay đổi đó.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">8. Liên hệ</h2>
              <p>
                Mọi thắc mắc liên quan điều khoản sử dụng, vui lòng liên hệ qua trang{' '}
                <Link href="/contact" className="text-primary hover:underline">Liên hệ</Link>.
              </p>
            </section>

            <div className="pt-2">
              <AppButton asChild className="rounded-full">
                <Link href="/contact">Liên hệ hỗ trợ</Link>
              </AppButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
