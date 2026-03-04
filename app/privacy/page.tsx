import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AppButton } from '@/shared/components/ui/app-button'

export default function PrivacyPage() {
  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Chính sách bảo mật</CardTitle>
            <CardDescription>Cập nhật lần cuối: 02/02/2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">1. Thông tin thu thập</h2>
              <p>
                Chúng tôi có thể thu thập họ tên, email, số điện thoại, thông tin thanh toán,
                tiến độ học tập, bài nộp và các dữ liệu liên quan đến quá trình sử dụng dịch vụ.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">2. Mục đích sử dụng</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Cung cấp nội dung học tập, theo dõi tiến độ và cá nhân hóa lộ trình.</li>
                <li>Gửi thông báo học tập, cập nhật khóa học, phản hồi bài tập.</li>
                <li>Hỗ trợ thanh toán và chăm sóc khách hàng.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">3. Chia sẻ dữ liệu</h2>
              <p>
                Shining English không bán hoặc trao đổi dữ liệu cá nhân. Chỉ chia sẻ với bên
                thứ ba khi cần thiết để cung cấp dịch vụ (ví dụ: cổng thanh toán PayOS) hoặc
                khi có yêu cầu hợp pháp từ cơ quan chức năng.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">4. Lưu trữ và bảo mật</h2>
              <p>
                Dữ liệu được lưu trữ an toàn theo các tiêu chuẩn bảo mật phù hợp. Chúng tôi
                áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ thông tin khỏi truy cập
                trái phép hoặc rò rỉ.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">5. Quyền của người dùng</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân.</li>
                <li>Từ chối nhận email marketing bất kỳ lúc nào.</li>
                <li>Yêu cầu hỗ trợ nếu có nghi ngờ dữ liệu bị sử dụng sai mục đích.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">6. Cookie</h2>
              <p>
                Chúng tôi có thể sử dụng cookie để cải thiện trải nghiệm người dùng, ghi nhớ
                đăng nhập và đo lường hiệu quả nội dung. Bạn có thể quản lý cookie trong
                cài đặt trình duyệt.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-[color:var(--brand-900)]">7. Liên hệ</h2>
              <p>
                Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ qua trang{' '}
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
