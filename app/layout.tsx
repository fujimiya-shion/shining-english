import "reflect-metadata"
import React from "react"
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Francois_One, Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/shared/components/ui/layout/site-header'
import { SiteFooter } from '@/shared/components/ui/layout/site-footer'
import { IoCBootstrapClient } from '@/shared/components/providers/ioc-bootstrap.client'
import { ensureServerBindings } from '@/shared/ioc/server-container'
import './globals.css'

const gilroy = localFont({
  src: [
    { path: '../public/fonts/SVN-Gilroy_Thin.otf', weight: '100', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Thin_Italic.otf', weight: '100', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_Xlight.otf', weight: '200', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Xlight_Italic.otf', weight: '200', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Light_Italic.otf', weight: '300', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Italic.otf', weight: '400', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Medium_Italic.otf', weight: '500', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_SemiBold_Italic.otf', weight: '600', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Bold_Italic.otf', weight: '700', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_XBold.otf', weight: '800', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_XBold_Italic.otf', weight: '800', style: 'italic' },
    { path: '../public/fonts/SVN-Gilroy_Black.otf', weight: '900', style: 'normal' },
    { path: '../public/fonts/SVN-Gilroy_Black_Italic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-gilroy',
  display: 'swap',
})

const robotoMono = Roboto_Mono({ subsets: ['vietnamese'], variable: '--font-roboto-mono' })
const francoisOne = Francois_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-francois-one',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'More Than English. Find Your Shine.',
  description: 'Nền tảng học tiếng Anh hiệu quả với các khóa học từ cơ bản đến nâng cao, luyện thi IELTS/TOEFL, và giao tiếp chuyên nghiệp',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  ensureServerBindings()

  return (
    <html lang="en">
      <body
        className={`${gilroy.variable} ${robotoMono.variable} ${francoisOne.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <IoCBootstrapClient />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
