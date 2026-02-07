'use client'

import Link from 'next/link'
import { AppButton } from '@/components/ui/app-button'
import {
  BookOpen,
  Home,
  Info,
  Map,
  NotebookPen,
  Phone,
  ShoppingBag,
  Users2,
  LogIn,
  Menu,
  X,
} from 'lucide-react'

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  href?: string
  showFrom?: 'lg' | 'xl'
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', icon: Home, href: '/' },
  { label: 'Giới thiệu', icon: Info, href: '/about' },
  { label: 'Khóa học', icon: BookOpen, href: '/courses' },
  { label: 'Miễn phí', icon: NotebookPen, href: '/free' },
  { label: 'Liên hệ', icon: Phone, href: '/contact' },
]

type SiteHeaderProps = {
  cartCount?: number
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const closeMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.closest('details')
    if (details) {
      details.removeAttribute('open')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-[color:var(--brand-900)] via-[color:var(--brand-800)] via-[60%] to-primary bg-clip-text text-transparent"
        >
          Shining English
        </Link>
        <div className="flex items-center justify-center gap-3 lg:gap-6">
          <div className="hidden items-center gap-3 md:flex lg:gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const responsiveClass =
                item.showFrom === 'xl'
                  ? 'hidden xl:inline-flex'
                  : item.showFrom === 'lg'
                    ? 'hidden lg:inline-flex'
                    : 'inline-flex'
              const content = (
                <>
                  <Icon
                    className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden={true}
                  />
                  <span>{item.label}</span>
                </>
              )
              return item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-item group items-center gap-2 px-2 py-1 text-sm transition-colors hover:text-primary ${responsiveClass}`}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={item.label}
                  className={`nav-item group items-center gap-2 px-2 py-1 text-sm transition-colors hover:text-primary ${responsiveClass}`}
                >
                  {content}
                </button>
              )
            })}
          </div>

          <div className="md:hidden" />
        </div>
        <div className="flex items-center justify-end gap-3 lg:gap-6">
          <AppButton asChild size="sm" className="gap-2 hidden md:inline-flex">
            <Link href="/login">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Đăng Nhập
            </Link>
          </AppButton>

          <div className="relative hidden md:block">
            <Link href="/cart" className="relative" aria-label="Giỏ hàng">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:border-primary/40 hover:text-primary">
                <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <details className="relative md:hidden group">
            <summary className="list-none">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
                <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
              </span>
            </summary>
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-background p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Menu</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {navItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"
                      onClick={closeMobileMenu}
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden={true} />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"
                      onClick={closeMobileMenu}
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden={true} />
                      {item.label}
                    </button>
                  )
                )}
                <div className="mt-2 flex items-center gap-3">
                  <AppButton asChild size="sm" className="flex-1 gap-2">
                    <Link href="/login" onClick={closeMobileMenu}>
                      <LogIn className="h-4 w-4" aria-hidden="true" />
                      Đăng Nhập
                    </Link>
                  </AppButton>
                  <Link
                    href="/cart"
                    className="relative"
                    aria-label="Giỏ hàng"
                    onClick={closeMobileMenu}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                      <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
