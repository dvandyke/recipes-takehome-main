'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { X, Heart, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { parseIngredients, getRecipeDetails } from '@/lib/api'
import type { Recipe } from '@/types'
import { cn } from '@/lib/utils'

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
  onToggleBookmark: () => void
  isBookmarked: boolean
}

export function RecipeModal({ recipe, isOpen, onClose, onToggleBookmark, isBookmarked }: RecipeModalProps) {
  // Fetch full recipe details if we only have minimal data (from filter endpoints)
  const needsFullData = recipe && !recipe.strInstructions
  
  const { data: fullRecipe, isLoading } = useQuery({
    queryKey: ['recipe-details', recipe?.idMeal],
    queryFn: () => getRecipeDetails(recipe!.idMeal),
    enabled: isOpen && !!needsFullData,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  // Use full recipe data if available, otherwise use the provided recipe
  const displayRecipe = (fullRecipe || recipe) as Recipe
  
  if (!recipe) return null

  const ingredients = displayRecipe ? parseIngredients(displayRecipe) : []

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 flex flex-col">
        <div className="overflow-y-auto p-6">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
            <div className="aspect-video bg-muted animate-pulse rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded" />
              <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
              <div className="h-4 bg-muted animate-pulse rounded w-4/6" />
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-2xl font-bold pr-8">
                  {displayRecipe.strMeal}
                </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              className="shrink-0"
            >
              <Heart 
                className={cn(
                  "h-5 w-5",
                  isBookmarked ? "fill-red-500 text-red-500" : "text-gray-400"
                )} 
              />
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap pt-2 pb-2">
            {displayRecipe.strCategory && (
              <Badge variant="secondary">{displayRecipe.strCategory}</Badge>
            )}
            {displayRecipe.strArea && (
              <Badge variant="outline">{displayRecipe.strArea}</Badge>
            )}
            {displayRecipe.strTags?.split(',').map((tag) => (
              <Badge key={tag.trim()} variant="outline" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted pb-4">
          {displayRecipe.strMealThumb ? (
            <Image
              src={displayRecipe.strMealThumb}
              alt={displayRecipe.strMeal}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="font-medium">{item.measure}</span>
                  <span>{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {displayRecipe.strInstructions ? (
                displayRecipe.strInstructions.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  )
                ))
              ) : (
                <p className="text-muted-foreground">No instructions available.</p>
              )}
            </div>
          </div>

          {displayRecipe.strYoutube && (
            <div>
              <a
                href={displayRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Watch Video Tutorial
              </a>
            </div>
          )}
        </div>
          </>
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
