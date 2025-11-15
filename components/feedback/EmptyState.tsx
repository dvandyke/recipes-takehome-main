'use client'

import { Search, ChefHat } from 'lucide-react'

interface EmptyStateProps {
  query?: string
  type?: 'search' | 'favorites' | 'history'
}

export function EmptyState({ query, type = 'search' }: EmptyStateProps) {
  const getContent = () => {
    switch (type) {
      case 'favorites':
        return {
          icon: <ChefHat className="h-12 w-12 text-muted-foreground" />,
          title: 'No favorites yet',
          description: 'Start bookmarking recipes you love by clicking the heart icon on any recipe card.',
        }
      case 'history':
        return {
          icon: <Search className="h-12 w-12 text-muted-foreground" />,
          title: 'No recipes viewed yet',
          description: 'Start exploring recipes to see them appear here.',
        }
      default:
        return {
          icon: <Search className="h-12 w-12 text-muted-foreground" />,
          title: query ? `No recipes found for "${query}"` : 'No recipes found',
          description: 'Try searching for something else or browse all recipes.',
        }
    }
  }

  const content = getContent()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {content.icon}
      <h3 className="text-lg font-semibold mt-4 mb-2">{content.title}</h3>
      <p className="text-muted-foreground text-center max-w-md">
        {content.description}
      </p>
    </div>
  )
}
