'use client'

import { useState } from 'react'
import { AppUtils } from '@/shared/utils/app-utils'
import { ShoppingBag } from 'lucide-react'

interface CourseThumbnailProps {
  thumbnail?: string | null
  alt?: string
  className?: string
  size?: 'sm' | 'md'
}

export function CourseThumbnail({ thumbnail, alt = 'Khóa học', className = '', size = 'sm' }: CourseThumbnailProps) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = AppUtils.getStorageUrl(thumbnail ?? undefined)
  const showImage = !!imageUrl && !imgError

  const sizeClasses = size === 'sm'
    ? 'h-12 w-12 min-h-12 min-w-12'
    : 'h-16 w-16 min-h-16 min-w-16'

  const iconSize = size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'

  return (
    <div className={`${sizeClasses} overflow-hidden rounded-xl bg-linear-to-br from-(--sky-100) to-(--sky-200) ${className}`}>
      {showImage ? (
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ShoppingBag className={`${iconSize} text-(--sky-400)`} />
        </div>
      )}
    </div>
  )
}
