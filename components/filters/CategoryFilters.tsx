'use client'

import { memo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/lib/api'
import { FilterChip } from './FilterChip'

interface CategoryFiltersProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export const CategoryFilters = memo(function CategoryFilters({ selectedCategory, onCategoryChange }: CategoryFiltersProps) {
  const handleAllClick = useCallback(() => {
    onCategoryChange(null)
  }, [onCategoryChange])

  const handleCategoryClick = useCallback((category: string) => {
    return () => {
      onCategoryChange(selectedCategory === category ? null : category)
    }
  }, [selectedCategory, onCategoryChange])
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-muted animate-pulse rounded-full" />
        ))}
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <FilterChip
        key="all-categories"
        label="All"
        active={selectedCategory === null}
        onClick={handleAllClick}
      />
      {categories.map((category) => (
        <FilterChip
          key={category.strCategory}
          label={category.strCategory}
          active={selectedCategory === category.strCategory}
          onClick={handleCategoryClick(category.strCategory)}
        />
      ))}
    </div>
  )
})
