'use client'

import Image from 'next/image'
import { BookOpen, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AppUtils } from '@/shared/utils/app-utils'

export function CourseLearningPlayerLockedHero({
  title,
  subtitle,
  lessonTitle,
  totalLessons,
  totalHours,
  authenticated,
  thumbnail,
}: {
  title: string
  subtitle: string
  lessonTitle?: string
  totalLessons: number
  totalHours: number
  authenticated: boolean
  thumbnail?: string
}) {
  const imageUrl = AppUtils.getStorageUrl(thumbnail)
  const isExternalRemote = !!imageUrl && /^https?:\/\//i.test(imageUrl) && !imageUrl.includes('localhost')
  const isLocalImage =
    !!imageUrl && (imageUrl.startsWith('http://localhost') || imageUrl.startsWith('https://localhost'))
  const [imageReady, setImageReady] = useState(Boolean(imageUrl))

  useEffect(() => {
    setImageReady(Boolean(imageUrl))
  }, [imageUrl])

  const showImage = Boolean(imageUrl) && imageReady

  return (
    <div className={`overflow-hidden rounded-3xl border border-border/60 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] ${
      showImage
        ? 'bg-[#0F2248]'
        : 'bg-[linear-gradient(135deg,rgba(12,32,72,0.96),rgba(26,63,125,0.92),rgba(245,166,35,0.9))]'
    }`}>
      <div className="relative aspect-video overflow-hidden">
        {showImage
          ? (
            isExternalRemote ? (
              <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImageReady(false)}
              />
            ) : (
              <Image
                src={imageUrl}
                alt={title}
                fill
                unoptimized={isLocalImage}
                sizes="100vw"
                className="object-cover"
                onError={() => setImageReady(false)}
              />
            )
          )
          : null}
        {!showImage ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_30%)]" />
        ) : null}
        <div className={`absolute inset-0 ${showImage ? 'bg-black/28' : 'bg-black/18'}`} />
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          <Lock className="h-3.5 w-3.5" />
          Xem thử nội dung khóa học
        </div>
        <div className={`absolute inset-x-6 bottom-6 rounded-3xl border p-6 ${
          showImage
            ? 'border-white/24 bg-black/34 backdrop-blur-xs'
            : 'border-white/16 bg-white/12 backdrop-blur-md'
        }`}>
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              <BookOpen className="h-3.5 w-3.5" />
              {authenticated ? 'Course locked' : 'Preview'}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              <p className="line-clamp-5 max-w-xl text-sm leading-6 text-white/82 sm:text-base">{subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/78">
              <span>{totalLessons} bài học</span>
              {totalHours > 0 ? <span>{totalHours} giờ nội dung</span> : null}
              {lessonTitle ? <span className="line-clamp-1 max-w-full">Bài mở đầu: {lessonTitle}</span> : null}
            </div>
            <p className="text-sm text-white/78">
              {authenticated
                ? 'Bạn đã đăng nhập nhưng chưa sở hữu khóa học này. Hoàn tất thanh toán để mở video và tài liệu.'
                : 'Đăng nhập để mua khóa học, lưu vào giỏ hàng và mở toàn bộ video bài học.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
