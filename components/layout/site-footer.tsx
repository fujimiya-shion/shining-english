import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground/95 text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="sr-only">Shining English</span>
              <span className="font-bold">Shining English</span>
            </div>
            <p className="text-sm text-background/70">
              Nơi mình chia sẻ toàn bộ khóa học tiếng Anh tự quay và giảng dạy
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sản Phẩm</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Khóa Học</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Lộ Trình</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Tính Năng</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Pháp Lý</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/privacy" className="hover:text-background transition-colors">Bảo Mật</Link></li>
              <li><Link href="/terms" className="hover:text-background transition-colors">Điều Khoản</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">Cookie</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col gap-3 text-sm text-background/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2025 Shining English. Tất cả quyền được bảo lưu.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-background transition-colors">Facebook</a>
            <a href="#" className="hover:text-background transition-colors">Instagram</a>
            <a href="#" className="hover:text-background transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
