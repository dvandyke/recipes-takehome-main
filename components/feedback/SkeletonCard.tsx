'use client'

import { Card, CardContent } from '@/components/ui/card'

interface SkeletonCardProps {
  count?: number
}

export function SkeletonCard({ count = 9 }: SkeletonCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-video w-full bg-muted animate-pulse" />
          <CardContent className="p-4 space-y-3">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-muted rounded animate-pulse" />
              <div className="h-5 w-20 bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
