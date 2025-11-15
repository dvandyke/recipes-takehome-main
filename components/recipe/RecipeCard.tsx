'use client'

import { memo } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Recipe } from '@/types'
import { cn } from '@/lib/utils'

interface RecipeCardProps {
  recipe: Recipe
  onBookmark: (id: string) => void
  isBookmarked: boolean
  onClick: () => void
}

export const RecipeCard = memo(function RecipeCard({ recipe, onBookmark, isBookmarked, onClick }: RecipeCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full bg-muted">
        {recipe.strMealThumb ? (
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">
            {recipe.strMeal}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              onBookmark(recipe.idMeal)
            }}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Heart 
              className={cn(
                "h-5 w-5",
                isBookmarked ? "fill-red-500 text-red-500" : "text-gray-400"
              )} 
            />
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {recipe.strCategory && (
            <Badge variant="secondary" className="text-xs">
              {recipe.strCategory}
            </Badge>
          )}
          {recipe.strArea && (
            <Badge variant="outline" className="text-xs">
              {recipe.strArea}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
})
