# Recipe Discovery - Architecture Document

**Project:** Recipe Discovery  
**Author:** BMad  
**Date:** 2025-11-12  
**Version:** 1.0  
**Status:** Decision Architecture Complete

---

## Executive Summary

Recipe Discovery follows a modern React/Next.js architecture optimized for rapid development within a 2-hour constraint while maintaining production-quality patterns. The system uses Next.js 14 App Router with client-side React Query for MealDB API integration, localStorage for persistence (no backend required), and a component-driven architecture organized by feature domains.

**Key Architectural Principles:**
- **Feature-based organization** - Components grouped by domain (recipe, search, filters, etc.)
- **Server/client state separation** - React Query for API data, React hooks for UI state
- **Progressive enhancement** - Core features work first, polish layers added incrementally
- **AI agent consistency** - Strict implementation patterns prevent conflicts across stories

---

## Technology Stack

### Foundation (Existing)

| Technology | Version | Purpose | Status |
|------------|---------|---------|--------|
| **Next.js** | 14.2.5 | React framework with App Router | ✅ Installed |
| **React** | 18.3.1 | UI library | ✅ Installed |
| **TypeScript** | 5.5.4 | Type safety | ✅ Installed |
| **TailwindCSS** | 3.4.7 | Utility-first styling | ✅ Installed |
| **ESLint** | 8.57.0 | Linting | ✅ Installed |
| **Node.js** | 25.1.0 | Runtime (via Volta) | ✅ Installed |

### Required Additions

| Package | Version | Purpose | Installation Command |
|---------|---------|---------|---------------------|
| **@tanstack/react-query** | 5.x (latest) | Server state management, caching | `npm install @tanstack/react-query` |
| **next-themes** | 0.4.6 | Dark mode theming with no flash | `npm install next-themes` |
| **lucide-react** | latest | Tree-shakeable icon library | `npm install lucide-react` |
| **shadcn/ui** | latest | Copy-paste UI components | `npx shadcn@latest init` |

### shadcn/ui Components Required

```bash
npx shadcn@latest add button card dialog badge input
```

**Components needed:**
- `button` - Primary actions, theme toggle
- `card` - Recipe cards layout
- `dialog` - Recipe detail modal
- `badge` - Category/cuisine tags
- `input` - Search bar

---

## Project Structure & Epic Mapping

```
recipe-discovery/
├── app/
│   ├── layout.tsx                    # Root layout with providers (Epic 1)
│   ├── page.tsx                      # Main recipe discovery page (Epic 2)
│   ├── globals.css                   # Tailwind + theme CSS variables (Epic 1 & 5)
│   └── providers.tsx                 # Client-side providers wrapper (Epic 1)
│
├── components/
│   ├── ui/                           # shadcn/ui base components (Epic 1)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   └── input.tsx
│   │
│   ├── recipe/                       # Epic 2: Core Recipe Discovery
│   │   ├── RecipeCard.tsx            # Story 2.2: Individual recipe card
│   │   ├── RecipeGrid.tsx            # Story 2.2: Responsive grid layout
│   │   ├── RecipeModal.tsx           # Story 2.3: Detail modal with full recipe
│   │   └── RecipeImage.tsx           # Optimized Next.js Image wrapper
│   │
│   ├── search/                       # Epic 2: Story 2.1 - Search
│   │   ├── SearchBar.tsx             # Debounced search input
│   │   └── SearchResults.tsx         # Results container/wrapper
│   │
│   ├── filters/                      # Epic 3: Story 3.1 - Filtering
│   │   ├── CategoryFilters.tsx       # Category filter chip group
│   │   └── FilterChip.tsx            # Reusable filter chip component
│   │
│   ├── feedback/                     # Epic 3: Story 3.2 - States
│   │   ├── SkeletonCard.tsx          # Loading skeleton animation
│   │   ├── ErrorState.tsx            # Error display with retry
│   │   └── EmptyState.tsx            # No results messaging
│   │
│   ├── favorites/                    # Epic 4: Stories 4.1-4.2 - Bookmarks
│   │   ├── BookmarkButton.tsx        # Heart icon toggle button
│   │   └── FavoritesView.tsx         # Favorites-only filter view
│   │
│   ├── history/                      # Epic 4: Story 4.3 - History
│   │   ├── HistoryView.tsx           # Recently viewed section
│   │   └── HistoryCard.tsx           # History item with timestamp
│   │
│   └── theme/                        # Epic 5: Story 5.1 - Theming
│       └── ThemeToggle.tsx           # Sun/moon theme switcher
│
├── lib/
│   ├── api.ts                        # MealDB API client (Epic 1: Story 1.3)
│   ├── hooks/                        # Custom hooks (Epic 1: Story 1.4)
│   │   ├── useBookmarks.ts           # Bookmark management (Epic 4)
│   │   ├── useHistory.ts             # View history tracking (Epic 4)
│   │   ├── useDebounce.ts            # Search debouncing (Epic 2)
│   │   ├── usePersistent.ts          # localStorage abstraction
│   │   └── useRecipes.ts             # React Query wrapper for API
│   │
│   ├── utils.ts                      # Utility functions (cn, etc.)
│   └── constants.ts                  # App constants (API URL, limits)
│
├── types/
│   ├── recipe.ts                     # Recipe, Category, HistoryEntry
│   └── index.ts                      # Barrel exports
│
├── public/                           # Static assets
├── docs/                             # Documentation
│   ├── PRD.md
│   ├── epics.md
│   ├── architecture.md               # This document
│   └── research-domain-2025-11-11.md
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── eslint.config.mjs
└── README.md
```

---

## Data Architecture

### Data Models

**Recipe (from MealDB API)**
```typescript
interface Recipe {
  idMeal: string
  strMeal: string                    // Recipe title
  strCategory: string                // e.g., "Seafood", "Vegetarian"
  strArea: string                    // e.g., "Italian", "Chinese"
  strInstructions: string            // Cooking steps
  strMealThumb: string               // Image URL
  strTags: string | null             // Comma-separated tags
  strYoutube: string | null          // Video URL
  strIngredient1: string             // Up to strIngredient20
  strMeasure1: string                // Up to strMeasure20
}

interface ParsedRecipe extends Recipe {
  ingredients: Array<{
    ingredient: string
    measure: string
  }>
}
```

**Category**
```typescript
interface Category {
  strCategory: string                // Category name
}
```

**Bookmark Storage**
```typescript
// localStorage key: 'recipe-bookmarks'
type BookmarkStore = string[]        // Array of recipe IDs
```

**History Storage**
```typescript
// localStorage key: 'recipe-history'
interface HistoryEntry {
  recipe: {
    idMeal: string
    strMeal: string
    strMealThumb: string
    strCategory?: string
    strArea?: string
  }
  viewedAt: string                   // ISO 8601 timestamp
}

type HistoryStore = HistoryEntry[]   // Max 20 entries, newest first
```

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Action                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │   React Component    │
          └──────────┬───────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────┐         ┌──────────────┐
│  React Query  │         │  localStorage │
│ (Server State)│         │  (Client Data)│
└───────┬───────┘         └──────┬───────┘
        │                         │
        ▼                         ▼
┌───────────────┐         ┌──────────────┐
│  MealDB API   │         │  Bookmarks/  │
│   (External)  │         │   History    │
└───────────────┘         └──────────────┘
```

**State Management Strategy:**
- **Server State** (React Query) - Recipe data, categories from API
- **Local State** (useState) - UI state, modals, form inputs
- **Persistent State** (localStorage) - Bookmarks, history, theme
- **No Redux/Zustand** - App is simple enough for hooks-only approach

---

## API Integration

### MealDB API Endpoints

**Base URL:** `https://www.themealdb.com/api/json/v1/1`

| Endpoint | Method | Purpose | Epic/Story |
|----------|--------|---------|------------|
| `/search.php?s={query}` | GET | Search recipes by name | Epic 2, Story 2.1 |
| `/search.php?s=` | GET | Get all recipes (empty search) | Epic 2, Story 2.1 |
| `/lookup.php?i={id}` | GET | Get recipe details by ID | Epic 2, Story 2.3 |
| `/filter.php?c={category}` | GET | Filter by category | Epic 3, Story 3.1 |
| `/list.php?c=list` | GET | Get all categories | Epic 3, Story 3.1 |

### API Client Pattern

**Location:** `lib/api.ts`

```typescript
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`)
  if (!response.ok) throw new Error('Failed to fetch recipes')
  const data = await response.json()
  return data.meals || []
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/list.php?c=list`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  const data = await response.json()
  return data.meals || []
}

export async function filterByCategory(category: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`)
  if (!response.ok) throw new Error('Failed to fetch recipes')
  const data = await response.json()
  return data.meals || []
}

export async function getRecipeDetails(id: string): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`)
  if (!response.ok) throw new Error('Failed to fetch recipe')
  const data = await response.json()
  return data.meals?.[0] || null
}
```

### React Query Integration

**Location:** `lib/hooks/useRecipes.ts`

```typescript
import { useQuery } from '@tanstack/react-query'
import { searchRecipes, getCategories } from '@/lib/api'

export function useSearchRecipes(searchTerm: string) {
  return useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => searchRecipes(searchTerm),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    retry: 1,
    enabled: !!searchTerm || searchTerm === '' // Allow empty for "all"
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000  // 30 minutes (categories rarely change)
  })
}
```

---

## Implementation Patterns

### CRITICAL: All AI agents MUST follow these patterns exactly

### 1. Naming Conventions

**Files & Components:**
- ✅ **PascalCase** for React components: `RecipeCard.tsx`, `SearchBar.tsx`
- ✅ **camelCase** for utilities/hooks: `useBookmarks.ts`, `api.ts`, `utils.ts`
- ✅ **kebab-case** for CSS files: `globals.css`
- ✅ Component filename must match export name exactly

**Variables & Functions:**
- ✅ **camelCase** for variables/functions: `searchRecipes`, `recipeData`, `isLoading`
- ✅ **SCREAMING_SNAKE_CASE** for constants: `API_BASE_URL`, `MAX_HISTORY_ITEMS`
- ✅ Boolean prefixes: `is`, `has`, `should` → `isLoading`, `hasError`, `shouldFetch`

**React Query Keys:**
- ✅ **Array format**: `['recipes', searchTerm]`, `['recipe', id]`, `['categories']`
- ✅ Plural for collections, singular for single items
- ✅ Include all query parameters in key for proper cache invalidation

**localStorage Keys:**
- ✅ **kebab-case with prefix**: `recipe-bookmarks`, `recipe-history`, `recipe-theme`

### 2. Component Structure Pattern

```typescript
// REQUIRED ORDER - All agents MUST follow this structure:

// 1. Imports (grouped and ordered)
import { useState, useEffect } from 'react'              // React
import { useRouter } from 'next/navigation'              // Next.js
import { useQuery } from '@tanstack/react-query'         // Third-party
import { Heart, Search } from 'lucide-react'             // Icons
import { Button } from '@/components/ui/button'          // Internal UI
import { searchRecipes } from '@/lib/api'                // Internal lib
import { useBookmarks } from '@/lib/hooks/useBookmarks'  // Internal hooks
import type { Recipe } from '@/types'                    // Types

// 2. Types/Interfaces (component-specific, not exported)
interface RecipeCardProps {
  recipe: Recipe
  onBookmark: (id: string) => void
  isBookmarked: boolean
}

// 3. Component function (default export at bottom)
export function RecipeCard({ recipe, onBookmark, isBookmarked }: RecipeCardProps) {
  // Hooks first
  const [isHovered, setIsHovered] = useState(false)
  
  // Derived values
  const ingredients = parseIngredients(recipe)
  
  // Event handlers
  const handleClick = () => { /* ... */ }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 4. Helper functions (not exported unless needed elsewhere)
function parseIngredients(recipe: Recipe) { /* ... */ }
```

### 3. Custom Hooks Pattern

**All hooks MUST return an object with named properties:**

```typescript
// ✅ CORRECT - Named properties
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  return {
    bookmarks,           // data
    isBookmarked,        // computed/helpers
    toggleBookmark,      // actions
    clearBookmarks,      // actions
    isLoading,          // state
    error               // errors
  }
}

// ❌ WRONG - Tuple return
export function useBookmarks() {
  return [bookmarks, toggleBookmark]  // Don't do this!
}
```

### 4. Event Handling Pattern

**Nested clickables MUST stop propagation:**

```typescript
// Recipe card is clickable, bookmark button is also clickable
<Card onClick={openModal}>
  <CardContent>
    <h3>{recipe.strMeal}</h3>
    <Button 
      onClick={(e) => {
        e.stopPropagation()  // ← REQUIRED to prevent modal opening
        toggleBookmark(recipe.idMeal)
      }}
    >
      <Heart />
    </Button>
  </CardContent>
</Card>
```

### 5. Loading & Error States Pattern

**All data-fetching components MUST handle these states:**

```typescript
function RecipeGrid() {
  const { data, isLoading, error, refetch } = useSearchRecipes(searchTerm)
  
  // REQUIRED: Handle all states explicitly
  if (isLoading) return <SkeletonCard count={9} />
  if (error) return <ErrorState error={error} onRetry={refetch} />
  if (!data || data.length === 0) return <EmptyState query={searchTerm} />
  
  return <div className="grid">{data.map(recipe => ...)}</div>
}
```

### 6. React Query Configuration Pattern

**Standard configuration for all queries:**

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['recipes', searchTerm],           // Must include all params
  queryFn: () => searchRecipes(searchTerm),    // Arrow function wrapper
  staleTime: 5 * 60 * 1000,                    // 5 minutes default
  retry: 1,                                     // Retry once on failure
  enabled: !!searchTerm                         // Conditional fetching
})
```

### 7. localStorage Pattern

**All localStorage access MUST be wrapped in try/catch:**

```typescript
// ✅ CORRECT - Safe localStorage access
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recipe-bookmarks')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Validate structure
        if (Array.isArray(parsed)) {
          setBookmarks(parsed)
        }
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error)
      // Fallback to empty array
    }
  }, [])
  
  const saveBookmarks = (newBookmarks: string[]) => {
    try {
      localStorage.setItem('recipe-bookmarks', JSON.stringify(newBookmarks))
      setBookmarks(newBookmarks)
    } catch (error) {
      console.error('Failed to save bookmarks:', error)
    }
  }
  
  return { bookmarks, saveBookmarks }
}
```

### 8. Styling Pattern

**Use Tailwind classes with `cn()` utility for conditionals:**

```typescript
import { cn } from '@/lib/utils'

<div 
  className={cn(
    "rounded-lg border p-4",                    // Base classes
    isActive && "bg-blue-500 text-white",       // Conditional
    isDisabled && "opacity-50 cursor-not-allowed", // Conditional
    "dark:bg-gray-800 dark:border-gray-700"     // Dark mode
  )}
/>
```

**NO inline styles except for dynamic values:**
```typescript
// ❌ WRONG
<div style={{ padding: '16px', color: 'blue' }} />

// ✅ CORRECT
<div className="p-4 text-blue-500" />

// ✅ OK for dynamic values
<div style={{ transform: `translateX(${offset}px)` }} />
```

### 9. TypeScript Patterns

**Strict typing requirements:**

```typescript
// ✅ Use Interface for object shapes
interface RecipeCardProps {
  recipe: Recipe
  onBookmark: (id: string) => void
}

// ✅ Use Type for unions/primitives
type Theme = 'light' | 'dark' | 'system'
type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// ✅ Export types from types/ folder
export type { Recipe, Category, HistoryEntry } from '@/types'

// ❌ AVOID any (except for untyped third-party libs)
function handleData(data: any) { }  // Don't do this!
```

### 10. Accessibility Patterns

**Required ARIA attributes:**

```typescript
// Buttons without text content
<button aria-label="Bookmark recipe">
  <Heart />
</button>

// Images
<img src={recipe.strMealThumb} alt={recipe.strMeal} />

// Modals
<Dialog 
  aria-labelledby="recipe-title" 
  aria-describedby="recipe-description"
>
  <h2 id="recipe-title">{recipe.strMeal}</h2>
  <p id="recipe-description">{recipe.strInstructions}</p>
</Dialog>

// Search input
<input 
  type="search"
  aria-label="Search recipes"
  placeholder="Search recipes..."
/>
```

**Keyboard navigation requirements:**
- ✅ All clickable elements must use semantic HTML (`<button>`, not `<div onClick>`)
- ✅ Modals must trap focus and close on ESC
- ✅ Focus states must be visible (use `focus-visible:` Tailwind class)

---

## Theme Architecture

### CSS Variables Pattern

**Location:** `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
  }
}
```

### Theme Provider Setup

**Location:** `app/providers.tsx`

```typescript
'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  }))
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

**Location:** `app/layout.tsx`

```typescript
import { Providers } from './providers'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

---

## Performance Considerations

### Image Optimization

**Use Next.js Image component for all recipe images:**

```typescript
import Image from 'next/image'

<Image 
  src={recipe.strMealThumb}
  alt={recipe.strMeal}
  width={400}
  height={300}
  className="object-cover"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."
/>
```

### Debouncing Strategy

**Search input must debounce to reduce API calls:**

```typescript
// lib/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

// Usage in SearchBar
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearch = useDebounce(searchTerm, 300)
const { data } = useSearchRecipes(debouncedSearch)
```

### React Query Caching

**Configured to minimize redundant API calls:**
- `staleTime: 5 minutes` - Data considered fresh for 5 minutes
- `retry: 1` - Only retry failed requests once
- Automatic deduplication - Multiple components requesting same data only triggers one fetch

### Bundle Size Optimization

- **Lucide React** - Tree-shakeable, only import icons used
- **shadcn/ui** - Components copied into project, not npm package bloat
- **No moment.js** - Use native Intl API for dates
- **Tailwind** - PurgeCSS removes unused styles in production

---

## Security Considerations

### API Security

- ✅ MealDB is public API, no authentication needed
- ✅ No API keys exposed (free tier uses test key)
- ✅ CORS enabled by MealDB, no proxy needed
- ✅ Read-only operations, no mutations

### Client-Side Storage

- ✅ localStorage only stores non-sensitive data (recipe IDs, theme preference)
- ✅ No personal user information stored
- ✅ Data structure validation on read (prevent corruption)
- ✅ Try/catch wrapping prevents crashes from storage errors

### XSS Prevention

- ✅ React escapes content by default
- ✅ NO `dangerouslySetInnerHTML` usage
- ✅ Recipe instructions rendered as plain text (not HTML)

---

## Deployment Architecture

### Build Configuration

**No changes required to `next.config.js` for MVP**

Standard Next.js build:
```bash
npm run build    # Creates optimized production build
npm run start    # Starts production server
```

### Environment Variables

**None required for MVP** - MealDB uses public test API key

For production, optionally add:
```env
NEXT_PUBLIC_API_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

### Hosting Options

Recommended: **Vercel** (optimal for Next.js)
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments

Alternative: **Netlify, Cloudflare Pages, AWS Amplify**

---

## Development Workflow

### Installation Steps

```bash
# 1. Install existing dependencies
npm install

# 2. Add React Query
npm install @tanstack/react-query

# 3. Add theme management
npm install next-themes

# 4. Add icons
npm install lucide-react

# 5. Initialize shadcn/ui
npx shadcn@latest init
# Follow prompts:
# - TypeScript: yes
# - Style: Default
# - Base color: Slate
# - CSS variables: yes
# - Import alias: @/*

# 6. Add required shadcn components
npx shadcn@latest add button card dialog badge input

# 7. Start development server
npm run dev
```

### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Git Workflow

```bash
# Feature branch pattern
git checkout -b epic-1/story-1.1-foundation
git commit -m "feat(epic-1): setup project foundation with providers"
git push origin epic-1/story-1.1-foundation
```

---

## Testing Strategy

### Manual Testing Checklist

**Epic 1 - Foundation:**
- [ ] npm install completes without errors
- [ ] npm run dev starts without errors
- [ ] TypeScript compiles without errors
- [ ] ESLint passes

**Epic 2 - Core Discovery:**
- [ ] Search bar accepts input
- [ ] Recipes load and display in grid
- [ ] Recipe modal opens on click
- [ ] All recipe details render correctly

**Epic 3 - Filtering:**
- [ ] Category filters load
- [ ] Filter chips toggle correctly
- [ ] Filtered results display
- [ ] Loading states appear during fetch
- [ ] Error states display on failure

**Epic 4 - Bookmarks & History:**
- [ ] Heart icon toggles on/off
- [ ] Bookmarks persist after refresh
- [ ] Favorites view shows only bookmarked
- [ ] History tracks viewed recipes
- [ ] History persists after refresh

**Epic 5 - Theming:**
- [ ] Theme toggle switches light/dark
- [ ] Theme persists after refresh
- [ ] All components respect theme
- [ ] No flash on page load

### Accessibility Testing

Run with:
- **Lighthouse** - Accessibility score > 90
- **Keyboard only** - All features accessible via keyboard
- **VoiceOver** (macOS) or NVDA (Windows) - Screen reader compatibility

---

## Architecture Decision Records

### ADR-001: Use React Query for Server State

**Context:** Need to manage API data fetching, caching, and synchronization.

**Decision:** Use @tanstack/react-query v5 for all MealDB API interactions.

**Rationale:**
- Automatic caching reduces API calls (MealDB free tier has no rate limits but good practice)
- Built-in loading/error states reduce boilerplate
- Request deduplication prevents duplicate fetches
- Stale-while-revalidate pattern improves UX
- 13KB bundle size is acceptable for features provided

**Alternatives Considered:**
- Native fetch + manual caching → Too much boilerplate for 2-hour constraint
- SWR → Similar features but React Query has better TypeScript support

**Status:** Accepted

---

### ADR-002: Use next-themes for Dark Mode

**Context:** Need light/dark theme toggle with no flash on load.

**Decision:** Use next-themes v0.4.6 with Tailwind's dark mode.

**Rationale:**
- Zero-flash implementation (injects script in <head>)
- 2.5KB bundle size
- localStorage persistence built-in
- System preference detection with prefers-color-scheme
- Works seamlessly with Tailwind's dark: classes

**Alternatives Considered:**
- Manual CSS variables + localStorage → Requires custom flash prevention script
- Theme UI → Too heavy for simple light/dark toggle

**Status:** Accepted

---

### ADR-003: Use Lucide React for Icons

**Context:** Need icons for UI (heart, search, sun/moon, etc.).

**Decision:** Use lucide-react for all icon needs.

**Rationale:**
- Tree-shakeable (only bundle icons actually used)
- Consistent design language
- React components (not SVG imports)
- Actively maintained
- 1-2KB per icon (very lightweight)

**Alternatives Considered:**
- Heroicons → Good but less comprehensive
- React Icons → Comprehensive but larger bundle (all icons included)
- Font Awesome → Too heavy, not tree-shakeable

**Status:** Accepted

---

### ADR-004: Use shadcn/ui for Component Library

**Context:** Need accessible, themeable UI components quickly.

**Decision:** Use shadcn/ui copy-paste components.

**Rationale:**
- NOT a dependency (components copied into codebase = full control)
- Built on Radix UI primitives (excellent accessibility)
- Tailwind-styled (matches our styling approach)
- Dark mode support built-in
- Can customize without fighting framework

**Alternatives Considered:**
- Headless UI → Requires more styling work
- Radix UI directly → Lower level, more setup
- Material UI / Chakra UI → Too opinionated, harder to customize

**Status:** Accepted

---

### ADR-005: No Backend - localStorage Only

**Context:** Need to persist bookmarks and history.

**Decision:** Use localStorage for all client-side persistence.

**Rationale:**
- 2-hour constraint makes backend infeasible
- No user accounts needed for MVP
- ~5-10MB storage per origin (plenty for recipe IDs)
- Synchronous API (no async complexity)
- Works offline

**Limitations:**
- Data not synced across devices
- Cleared when user clears browser data
- Not shareable with other users

**Future Enhancement:** Add backend + auth for production version

**Status:** Accepted

---

## Epic-to-Architecture Mapping

| Epic | Components | Hooks | API Methods | Notes |
|------|-----------|-------|-------------|-------|
| **Epic 1: Foundation** | `providers.tsx`, `ui/*` | `useDebounce`, `usePersistent` | `searchRecipes`, `getCategories`, `filterByCategory`, `getRecipeDetails` | Setup only, no user-facing features |
| **Epic 2: Core Discovery** | `recipe/*`, `search/*` | `useRecipes`, `useDebounce` | `searchRecipes`, `getRecipeDetails` | Primary user flow |
| **Epic 3: Filtering & Feedback** | `filters/*`, `feedback/*` | `useCategories` | `getCategories`, `filterByCategory` | Enhances discovery |
| **Epic 4: Bookmarks & History** | `favorites/*`, `history/*` | `useBookmarks`, `useHistory` | None (localStorage only) | Personalization features |
| **Epic 5: Theming & Polish** | `theme/*` | Built-in `useTheme` from next-themes | None | UX polish |

---

## Implementation Priority

**Based on Epic order from epics.md:**

1. **Epic 1: Foundation** (Stories 1.1-1.4) - FIRST
   - Install dependencies
   - Set up providers
   - Create API client
   - Build custom hooks

2. **Epic 2: Core Discovery** (Stories 2.1-2.3) - SECOND
   - Search bar with debounce
   - Recipe grid with cards
   - Recipe detail modal

3. **Epic 3: Filtering & Feedback** (Stories 3.1-3.3) - THIRD
   - Category filters
   - Loading/error/empty states
   - Responsive polish

4. **Epic 4: Bookmarks & History** (Stories 4.1-4.4) - FOURTH
   - Bookmark toggle
   - Favorites view
   - History tracking
   - Data management

5. **Epic 5: Theming & Polish** (Stories 5.1-5.4) - FIFTH
   - Theme toggle
   - Accessibility audit
   - Performance optimization
   - Documentation

---

## Validation Checklist

### Architectural Completeness

- ✅ All 5 epics mapped to architecture components
- ✅ All 20 stories have implementation guidance
- ✅ Technology stack fully defined with versions
- ✅ Project structure complete (no placeholders)
- ✅ Implementation patterns prevent agent conflicts
- ✅ Data models and flows documented
- ✅ API integration fully specified
- ✅ Theme architecture defined
- ✅ Performance considerations addressed
- ✅ Security considerations addressed
- ✅ Testing strategy outlined
- ✅ Deployment approach documented
- ✅ ADRs capture key decisions

### PRD Coverage

- ✅ All functional requirements (FR1-FR10) have architectural support
- ✅ All non-functional requirements addressed:
  - Performance: Image optimization, debouncing, React Query caching
  - Security: XSS prevention, safe localStorage, public API
  - Accessibility: ARIA patterns, keyboard navigation, semantic HTML
  - Scalability: Notes for future enhancement

---

## Next Steps

**After architecture approval:**

1. ✅ **Run installation commands** (see Development Workflow section)
2. ✅ **Verify all dependencies installed** successfully
3. ✅ **Begin Epic 1, Story 1.1** - Foundation setup
4. ✅ **Follow implementation patterns** strictly for consistency
5. ✅ **Test incrementally** as each story completes

**Development readiness confirmed.** AI agents can now implement stories with full architectural guidance.

---

**Architecture Document Version:** 1.0  
**Status:** Complete and validated  
**Last Updated:** 2025-11-12  
**Next Review:** After Epic 1 completion
