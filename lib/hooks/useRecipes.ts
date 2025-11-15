import { useQuery } from '@tanstack/react-query'
import { searchRecipes, getCategories, filterByCategory, getAreas, filterByArea } from '@/lib/api'
import { QUERY_STALE_TIME, CATEGORIES_STALE_TIME } from '@/lib/constants'

export function useSearchRecipes(searchTerm: string) {
  return useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => searchRecipes(searchTerm),
    staleTime: QUERY_STALE_TIME,
    retry: 1,
    enabled: searchTerm !== undefined,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: CATEGORIES_STALE_TIME,
    retry: 1,
  })
}

export function useFilteredRecipes(category: string | null) {
  return useQuery({
    queryKey: ['recipes', 'category', category],
    queryFn: () => filterByCategory(category!),
    staleTime: QUERY_STALE_TIME,
    retry: 1,
    enabled: !!category,
  })
}

export function useAreas() {
  return useQuery({
    queryKey: ['areas'],
    queryFn: getAreas,
    staleTime: CATEGORIES_STALE_TIME,
    retry: 1,
  })
}

export function useFilteredByArea(area: string | null) {
  return useQuery({
    queryKey: ['recipes', 'area', area],
    queryFn: () => filterByArea(area!),
    staleTime: QUERY_STALE_TIME,
    retry: 1,
    enabled: !!area,
  })
}
