'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { CategoryFilters } from '@/components/filters/CategoryFilters'
import { AreaFilters } from '@/components/filters/AreaFilters'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { RecipeModal } from '@/components/recipe/RecipeModal'
import { SkeletonCard } from '@/components/feedback/SkeletonCard'
import { ErrorState } from '@/components/feedback/ErrorState'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ViewSwitcher } from '@/components/navigation/ViewSwitcher'
import { FavoritesView } from '@/components/favorites/FavoritesView'
import { HistoryView } from '@/components/history/HistoryView'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useSearchRecipes, useFilteredRecipes, useFilteredByArea } from '@/lib/hooks/useRecipes'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import { useHistory } from '@/lib/hooks/useHistory'
import { Recipe } from '@/types/recipe'

type ViewMode = 'discover' | 'favorites' | 'history'

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('discover')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { bookmarkedIds, toggleBookmark, isBookmarked } = useBookmarks()
  const { history, addToHistory, clearHistory } = useHistory()

  // Fetch recipes based on search, category, or area
  const searchQuery = useSearchRecipes(debouncedSearchTerm)
  const categoryQuery = useFilteredRecipes(selectedCategory)
  const areaQuery = useFilteredByArea(selectedArea)

  // Determine which query to use (priority: area > category > search)
  const activeQuery = selectedArea ? areaQuery : selectedCategory ? categoryQuery : searchQuery
  const { data: recipes, isLoading, error, refetch } = activeQuery

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    addToHistory(recipe.idMeal, recipe.strMeal)
  }

  const handleCloseModal = () => {
    setSelectedRecipe(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Recipe Discovery</h1>
              <p className="text-muted-foreground">
                Discover delicious recipes from around the world
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="space-y-6">
          <ViewSwitcher
            currentView={viewMode}
            onViewChange={setViewMode}
            favoritesCount={bookmarkedIds.length}
            historyCount={history.length}
          />

          {viewMode === 'discover' && (
            <>
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Filter by Category</h3>
                  <CategoryFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={(cat) => {
                      setSelectedCategory(cat)
                      setSelectedArea(null) // Clear area when selecting category
                    }}
                  />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Filter by Area</h3>
                  <AreaFilters
                    selectedArea={selectedArea}
                    onAreaChange={(area) => {
                      setSelectedArea(area)
                      setSelectedCategory(null) // Clear category when selecting area
                    }}
                  />
                </div>
              </div>

              {isLoading && <SkeletonCard count={9} />}

              {error && (
                <ErrorState
                  error={error instanceof Error ? error : new Error('Failed to load recipes')}
                  onRetry={() => refetch()}
                />
              )}

              {!isLoading && !error && (!recipes || recipes.length === 0) && (
                <EmptyState query={debouncedSearchTerm} />
              )}

              {!isLoading && !error && recipes && recipes.length > 0 && (
                <RecipeGrid
                  recipes={recipes}
                  onRecipeClick={handleRecipeClick}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={toggleBookmark}
                />
              )}
            </>
          )}

          {viewMode === 'favorites' && (
            <FavoritesView
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
              onRecipeClick={handleRecipeClick}
            />
          )}

          {viewMode === 'history' && (
            <HistoryView
              history={history}
              onRecipeClick={handleRecipeClick}
              onClearHistory={clearHistory}
            />
          )}
        </main>

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            isOpen={!!selectedRecipe}
            onClose={handleCloseModal}
            isBookmarked={isBookmarked(selectedRecipe.idMeal)}
            onToggleBookmark={() => toggleBookmark(selectedRecipe.idMeal)}
          />
        )}
      </div>
    </div>
  )
}