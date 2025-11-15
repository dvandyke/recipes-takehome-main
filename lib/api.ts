import { API_BASE_URL } from './constants'
import type { Recipe, Category, Area } from '@/types'

// MealDB API Client

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  const data = await response.json()
  return data.meals || []
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/list.php?c=list`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  const data = await response.json()
  return data.meals || []
}

export async function getAreas(): Promise<Area[]> {
  const response = await fetch(`${API_BASE_URL}/list.php?a=list`)
  if (!response.ok) {
    throw new Error('Failed to fetch areas')
  }
  const data = await response.json()
  return data.meals || []
}

export async function filterByCategory(category: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  const data = await response.json()
  return data.meals || []
}

export async function filterByArea(area: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?a=${area}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  const data = await response.json()
  return data.meals || []
}

export async function getRecipeDetails(id: string): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }
  const data = await response.json()
  return data.meals?.[0] || null
}

// Utility: Parse ingredients from Recipe object
export function parseIngredients(recipe: Recipe) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe]
    const measure = recipe[`strMeasure${i}` as keyof Recipe]

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || '',
      })
    }
  }
  return ingredients
}
