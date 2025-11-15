// API Configuration
export const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// localStorage Keys
export const STORAGE_KEYS = {
  BOOKMARKS: 'recipe-bookmarks',
  HISTORY: 'recipe-history',
  THEME: 'recipe-theme',
} as const

// App Constants
export const MAX_HISTORY_ITEMS = 20
export const SEARCH_DEBOUNCE_MS = 300
export const QUERY_STALE_TIME = 5 * 60 * 1000 // 5 minutes
export const CATEGORIES_STALE_TIME = 30 * 60 * 1000 // 30 minutes
