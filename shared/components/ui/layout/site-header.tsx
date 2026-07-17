'use client'

import { AppButton } from '@/shared/components/ui/app-button'
import { AppConfirmModal } from '@/shared/components/ui/app-confirm-modal'
import { AppStatus } from '@/shared/enums/app-status'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useCartStore } from '@/shared/stores/cart.store'
import { useStarStore } from '@/shared/stores/star.store'
import {
  Bell,
  BookOpen,
  CircleUserRound,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  LucideCircleDollarSign,
  Menu,
  Newspaper,
  Phone,
  ShoppingBag,
  Sparkles,
  User,
  X
} from 'lucide-react'
import { NotificationBell } from '@/shared/components/ui/notification/notification-bell'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  href?: string
  showFrom?: 'lg' | 'xl'
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', icon: Home, href: '/' },
  { label: 'Giới thiệu', icon: Info, href: '/about', showFrom: 'lg' },
  { label: 'Khóa học', icon: BookOpen, href: '/courses' },
  { label: 'Miễn phí', icon: LucideCircleDollarSign, href: '/courses/free' },
  { label: 'Blog', icon: Newspaper, href: '/blogs' },
  { label: 'Liên hệ', icon: Phone, href: '/contact', showFrom: 'lg' },
]

function CartCountBadge({ count }: { count: number }) {
  return (
    <span className="absolute right-0 top-0 md:-top-2.5 inline-flex h-5 min-w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-(--brand-900) px-0 text-[10px] font-semibold leading-none tabular-nums text-white shadow-sm">
      {count > 99 ? '99+' : count}
    </span>
  )
}

export function SiteHeader() {
  const authenticated = useAuthStore((state) => state.authenticated)
  const currentUserName = useAuthStore((state) => state.currentUser?.name ?? null)
  const logout = useAuthStore((state) => state.logout)
  const cartCount = useCartStore((state) => state.quantityCount)
  const countStatus = useCartStore((state) => state.countStatus)
  const fetchCartCount = useCartStore((state) => state.fetchCount)
  const resetCart = useCartStore((state) => state.reset)
  const starBalance = useStarStore((state) => state.balance)
  const starStatus = useStarStore((state) => state.status)
  const fetchStarBalance = useStarStore((state) => state.initial)
  const resetStars = useStarStore((state) => state.reset)

  useEffect(() => {
    if (!authenticated) {
      resetCart()
      resetStars()
      return
    }

    if (countStatus === AppStatus.initial) {
      void fetchCartCount()
    }

    if (starStatus === AppStatus.initial) {
      void fetchStarBalance()
    }
  }, [
    authenticated,
    countStatus,
    fetchCartCount,
    fetchStarBalance,
    resetCart,
    resetStars,
    starStatus,
  ])

  const closeMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.closest('details')
    if (details) {
      details.removeAttribute('open')
    }
  }

  const accountLabel = currentUserName?.trim() || 'Tài khoản'
  const [accountOpen, setAccountOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!accountOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [accountOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/header_logo.svg"
            alt="Shining English"
            width={120}
            height={64}
            className="h-16 w-auto"
            priority
          />
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
        <div className="flex items-center justify-end gap-2 lg:gap-3">
          <div className="hidden lg:block">
            {authenticated ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                  onClick={() => setAccountOpen((v) => !v)}
                >
                  <CircleUserRound className="h-4 w-4" aria-hidden="true" />
                  <span>{accountLabel}</span>
                </button>
                {accountOpen ? (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-background p-2 shadow-lg">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                      onClick={() => setAccountOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                      onClick={() => setAccountOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                      onClick={() => setAccountOpen(false)}
                    >
                      <Bell className="h-4 w-4" />
                      Thông báo
                    </Link>
                    <hr className="my-1 border-border/70" />
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                      onClick={() => { setAccountOpen(false); setLogoutConfirmOpen(true) }}
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <AppButton asChild size="sm" className="gap-2">
                <Link href="/login" className="inline-flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  <span>Đăng Nhập</span>
                </Link>
              </AppButton>
            )}
          </div>

          {authenticated ? (
            <div className="hidden md:block lg:block">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-[color:var(--brand-900)] shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Số sao hiện có"
              >
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{typeof starBalance === 'number' ? `${starBalance} sao` : '...'}</span>
              </Link>
            </div>
          ) : null}

          <div className="hidden md:block lg:block">
            <NotificationBell />
          </div>

          <div className="relative hidden md:block lg:block">
            <Link href="/cart" className="relative" aria-label="Giỏ hàng">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:border-primary/40 hover:text-primary">
                <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              {cartCount > 0 ? <CartCountBadge count={cartCount} /> : null}
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
                <div className="mt-3 space-y-3 border-t border-border/70 pt-3">
                  {authenticated ? (
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                        onClick={closeMobileMenu}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                        onClick={closeMobileMenu}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/notifications"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                        onClick={closeMobileMenu}
                      >
                        <Bell className="h-4 w-4" />
                        Thông báo
                      </Link>
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary/5 hover:text-[color:var(--brand-900)]"
                        onClick={() => setLogoutConfirmOpen(true)}
                      >
                        <LogOut className="h-4 w-4" />
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <AppButton asChild size="sm" className="w-full gap-2">
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="inline-flex w-full items-center justify-center gap-2"
                      >
                        <LogIn className="h-4 w-4" aria-hidden="true" />
                        Đăng Nhập
                      </Link>
                    </AppButton>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    {authenticated ? (
                      <Link
                        href="/blogs"
                        className="inline-flex min-w-0 items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-[color:var(--brand-900)] shadow-sm"
                        onClick={closeMobileMenu}
                      >
                        <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="leading-tight">
                          {typeof starBalance === 'number' ? `${starBalance} sao` : '...'}
                        </span>
                      </Link>
                    ) : (
                      <div />
                    )}
                    <div className="shrink-0">
                      <NotificationBell />
                    </div>
                    <Link
                      href="/cart"
                      className="relative shrink-0"
                      aria-label="Giỏ hàng"
                      onClick={closeMobileMenu}
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                        <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      {cartCount > 0 ? <CartCountBadge count={cartCount} /> : null}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
      <AppConfirmModal
        open={logoutConfirmOpen}
        title="Đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản hiện tại?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        onConfirm={() => {
          setLogoutConfirmOpen(false)
          void logout()
        }}
        onCancal={() => setLogoutConfirmOpen(false)}
      />
    </header>
  )
}
