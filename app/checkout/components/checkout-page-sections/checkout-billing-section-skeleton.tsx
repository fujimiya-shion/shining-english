'use client'

import { Card } from '@/shared/components/ui/card'

export const CheckoutBillingSectionSkeleton = () => {
    return (
        <Card className="space-y-6 border-border/70 bg-white/95 p-6">
            {/* Header Skeleton */}
            <div>
                <div className="h-3 w-20 animate-pulse rounded bg-muted"></div>
                <div className="mt-3 h-8 w-64 animate-pulse rounded-md bg-muted"></div>
            </div>

            {/* Inputs Skeleton */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <div className="mb-2 h-4 w-20 animate-pulse rounded bg-muted"></div>
                    <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                </div>
                <div>
                    <div className="mb-2 h-4 w-12 animate-pulse rounded bg-muted"></div>
                    <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                </div>
                <div>
                    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-muted"></div>
                    <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                </div>
            </div>

            {/* Payment Methods Skeleton */}
            <div className="space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-muted"></div>
                <div className="grid gap-3">
                    {/* Sinh sẵn 3 ô skeleton cho payment methods */}
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex items-start space-x-3 rounded-lg border border-border/50 p-4"
                        >
                            <div className="h-5 w-5 shrink-0 animate-pulse rounded-md bg-muted"></div>
                            <div className="space-y-2.5 w-full">
                                <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
                                <div className="h-3 w-2/3 animate-pulse rounded bg-muted"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-11 w-full animate-pulse rounded-full bg-muted"></div>
        </Card>
    )
}