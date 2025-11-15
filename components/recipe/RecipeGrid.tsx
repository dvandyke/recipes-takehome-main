'use client'

import { RecipeCard } from './RecipeCard'
import type { Recipe } from '@/types'

interface RecipeGridProps {
  recipes: Recipe[]
  bookmarkedIds: string[]
  onToggleBookmark: (id: string) => void
  onRecipeClick: (recipe: Recipe) => void
}

export function RecipeGrid({ recipes, bookmarkedIds, onToggleBookmark, onRecipeClick }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isBookmarked={bookmarkedIds.includes(recipe.idMeal)}
          onBookmark={onToggleBookmark}
          onClick={() => onRecipeClick(recipe)}
        />
      ))}
    </div>
  )
}
