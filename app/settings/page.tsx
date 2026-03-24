import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { Input } from '@/shared/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { requireAuthenticatedUser } from '@/shared/server/auth-redirect'

export default async function SettingsPage() {
  await requireAuthenticatedUser()

  return (
    <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
          <div className="pointer-events-none absolute -left-12 top-6 h-40 w-40 rounded-full bg-[color:var(--sky-300)]/40 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-0 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[color:var(--brand-900)]/10 blur-[140px]" />

          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Cập nhật hồ sơ</CardTitle>
              <CardDescription>
                Chỉnh sửa thông tin cá nhân và mục tiêu học để lộ trình phù hợp hơn.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                    Thông tin cá nhân
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="profile-name" className="text-sm font-medium">
                        Họ và tên
                      </label>
                      <Input id="profile-name" placeholder="Nguyễn Minh Anh" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profile-email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="profile-email" type="email" placeholder="you@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profile-phone" className="text-sm font-medium">
                        Số điện thoại
                      </label>
                      <Input id="profile-phone" placeholder="09xx xxx xxx" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profile-city" className="text-sm font-medium">
                        Thành phố
                      </label>
                      <Input id="profile-city" placeholder="Hồ Chí Minh" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                    Mục tiêu học
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="profile-level" className="text-sm font-medium">
                        Trình độ hiện tại
                      </label>
                      <Input id="profile-level" placeholder="Pre-intermediate" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profile-goal" className="text-sm font-medium">
                        Mục tiêu chính
                      </label>
                      <Input id="profile-goal" placeholder="Giao tiếp công việc" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profile-hours" className="text-sm font-medium">
                        Thời gian học/tuần
                      </label>
                      <Input id="profile-hours" placeholder="3 - 5 giờ" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profile-focus" className="text-sm font-medium">
                        Kỹ năng ưu tiên
                      </label>
                      <Input id="profile-focus" placeholder="Speaking + Writing" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-5">
                  <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                    Ảnh đại diện
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-xl font-semibold text-[color:var(--brand-900)] shadow-sm">
                      MA
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Tải ảnh để cá nhân hóa hồ sơ học viên.
                      </p>
                      <Button type="button" variant="outline" className="h-9 rounded-full">
                        Tải ảnh lên
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-5">
                  <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                    Trạng thái học tập
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                      <span>Số khóa đang học</span>
                      <span className="font-semibold text-[color:var(--brand-900)]">3</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                      <span>Chuỗi học liên tục</span>
                      <span className="font-semibold text-[color:var(--brand-900)]">7 ngày</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                      <span>Nhắc học</span>
                      <span className="font-semibold text-[color:var(--brand-900)]">Bật</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                    Bảo mật
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Đổi mật khẩu định kỳ để đảm bảo an toàn tài khoản.
                  </p>
                  <Button type="button" variant="outline" className="mt-4 h-10 rounded-full">
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:col-span-2">
                <AppButton type="button" className="h-11 rounded-full">
                  Lưu thay đổi
                </AppButton>
                <Button asChild variant="outline" className="h-11 rounded-full">
                  <Link href="/profile">Xem hồ sơ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
