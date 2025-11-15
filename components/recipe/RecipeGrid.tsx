'use client'

import { memo, useMemo } from 'react'
import { RecipeCard } from './RecipeCard'
import type { Recipe } from '@/types'

interface RecipeGridProps {
  recipes: Recipe[]
  bookmarkedIds: string[]
  onToggleBookmark: (id: string) => void
  onRecipeClick: (recipe: Recipe) => void
}

export const RecipeGrid = memo(function RecipeGrid({ recipes, bookmarkedIds, onToggleBookmark, onRecipeClick }: RecipeGridProps) {
  // Convert bookmarkedIds array to Set for O(1) lookup instead of O(n)
  const bookmarkedSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isBookmarked={bookmarkedSet.has(recipe.idMeal)}
          onBookmark={onToggleBookmark}
          onClick={() => onRecipeClick(recipe)}
        />
      ))}
    </div>
  )
})
