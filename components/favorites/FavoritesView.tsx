'use client'

import { useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { SkeletonCard } from '@/components/feedback/SkeletonCard'
import { ErrorState } from '@/components/feedback/ErrorState'
import { EmptyState } from '@/components/feedback/EmptyState'
import { Recipe } from '@/types/recipe'

interface FavoritesViewProps {
  bookmarkedIds: string[]
  onToggleBookmark: (id: string) => void
  onRecipeClick: (recipe: Recipe) => void
}

export function FavoritesView({
  bookmarkedIds,
  onToggleBookmark,
  onRecipeClick,
}: FavoritesViewProps) {
  const { data: recipes, isLoading, error, refetch } = useQuery({
    queryKey: ['favorites', bookmarkedIds],
    queryFn: async () => {
      if (bookmarkedIds.length === 0) return []
      
      // Fetch each bookmarked recipe by ID
      const recipePromises = bookmarkedIds.map(async (id) => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        const data = await response.json()
        return data.meals?.[0] || null
      })
      
      const results = await Promise.all(recipePromises)
      return results.filter((recipe): recipe is Recipe => recipe !== null)
    },
    enabled: bookmarkedIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (bookmarkedIds.length === 0) {
    return <EmptyState type="favorites" />
  }

  if (isLoading) {
    return <SkeletonCard count={bookmarkedIds.length} />
  }

  if (error) {
    return (
      <ErrorState
        error={error instanceof Error ? error : new Error('Failed to load favorites')}
        onRetry={() => refetch()}
      />
    )
  }

  if (!recipes || recipes.length === 0) {
    return <EmptyState type="favorites" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
        <h2 className="text-2xl font-bold">My Favorites</h2>
        <span className="text-muted-foreground text-sm">
          ({recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'})
        </span>
      </div>
      <RecipeGrid
        recipes={recipes}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={onToggleBookmark}
        onRecipeClick={onRecipeClick}
      />
    </div>
  )
}
