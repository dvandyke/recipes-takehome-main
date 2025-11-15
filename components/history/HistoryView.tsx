'use client'

import { useQuery } from '@tanstack/react-query'
import { Clock, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { HistoryEntry, Recipe } from '@/types/recipe'
import Image from 'next/image'

interface HistoryViewProps {
  history: HistoryEntry[]
  onRecipeClick: (recipe: Recipe) => void
  onClearHistory: () => void
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

export function HistoryView({ history, onRecipeClick, onClearHistory }: HistoryViewProps) {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['history', history.map(h => h.recipeId)],
    queryFn: async () => {
      if (history.length === 0) return []
      
      // Fetch each recipe by ID
      const recipePromises = history.map(async (entry) => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${entry.recipeId}`
        )
        const data = await response.json()
        return {
          recipe: data.meals?.[0] || null,
          timestamp: entry.timestamp,
        }
      })
      
      const results = await Promise.all(recipePromises)
      return results.filter((item): item is { recipe: Recipe; timestamp: number } => 
        item.recipe !== null
      )
    },
    enabled: history.length > 0,
    staleTime: 5 * 60 * 1000,
  })

  if (history.length === 0) {
    return <EmptyState type="history" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
          <span className="text-muted-foreground text-sm">
            ({history.length} {history.length === 1 ? 'recipe' : 'recipes'})
          </span>
        </div>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear History
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: Math.min(history.length, 5) }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 bg-muted animate-pulse rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : recipes && recipes.length > 0 ? (
        <div className="space-y-2">
          {recipes.map(({ recipe, timestamp }) => (
            <Card
              key={`${recipe.idMeal}-${timestamp}`}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onRecipeClick(recipe)}
            >
              <div className="flex gap-4 p-4">
                <div className="relative w-24 h-24 rounded overflow-hidden shrink-0 bg-muted">
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                    {recipe.strMeal}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {recipe.strCategory && <span>{recipe.strCategory}</span>}
                    {recipe.strCategory && recipe.strArea && <span>•</span>}
                    {recipe.strArea && <span>{recipe.strArea}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Viewed {formatTimestamp(timestamp)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState type="history" />
      )}
    </div>
  )
}
