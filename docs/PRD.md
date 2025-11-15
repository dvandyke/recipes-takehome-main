# Recipe Discovery - Product Requirements Document

**Author:** BMad
**Date:** 2025-11-12
**Version:** 1.0

---

## Executive Summary

Recipe Discovery is a clean, fast web application designed for hobbyist cooks who are experimenting with new cuisines and building their weeknight cooking repertoire. Built as a 2-hour take-home challenge, this application demonstrates product thinking, technical execution, and UX awareness through a focused feature set that prioritizes user value over feature breadth.

The application connects to TheMealDB API to provide access to thousands of international recipes, enabling users to search, browse, discover, and save recipes with minimal friction. Unlike cluttered recipe sites with heavy ads and complex navigation, Recipe Discovery focuses on what matters: beautiful food photography, clear instructions, and effortless bookmarking.

### What Makes This Special

✨ **"Effortless recipe memory"** - The magic of Recipe Discovery lies in three interconnected experiences:

1. **Visual Discovery** - Clean, image-forward interface where recipes shine without distraction
2. **Frictionless Saving** - One-click bookmarking without accounts, emails, or friction
3. **Intelligent History** - Viewing history that surfaces forgotten recipe gems, reminding users of recipes they explored but forgot to save

This viewing history feature goes beyond basic requirements, demonstrating thoughtful product design that solves a real user pain point: "I saw the perfect recipe yesterday but can't remember what it was called."

---

## Project Classification

**Technical Type:** Web Application (Consumer-facing)
**Domain:** Food/Recipe Discovery
**Complexity:** Moderate (API integration, state management, localStorage persistence)
**Approach:** Greenfield with Next.js 14 scaffold
**Constraint:** 2-hour implementation window

**Tech Stack:**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Components:** shadcn/ui (lightweight, themeable, accessible)
- **API:** TheMealDB (free tier)
- **Storage:** localStorage (bookmarks + history)

**Why This Stack:**
- Next.js 14 provides modern React patterns, image optimization, and fast performance
- TailwindCSS enables rapid UI development with utility classes
- shadcn/ui provides accessible components with easy theming and native dark mode support
- TypeScript ensures type safety and better developer experience
- localStorage avoids backend complexity while enabling persistence

---

## Success Criteria

### Challenge Success Metrics

**Functional Completeness:**
- ✅ Core discovery loop works: Search/Browse → Detail → Bookmark → History
- ✅ Recipe data displays correctly from MealDB API
- ✅ Bookmarks persist across sessions
- ✅ Viewing history tracks and displays recently viewed recipes
- ✅ Responsive design works on mobile, tablet, desktop

**Visual Quality:**
- ✅ Clean, inviting interface that showcases food photography
- ✅ Smooth loading states and transitions
- ✅ Professional visual hierarchy and typography
- ✅ Light/dark theme toggle with proper theming

**Technical Execution:**
- ✅ No console errors or warnings
- ✅ Proper TypeScript types throughout
- ✅ Clean component architecture
- ✅ Performant API calls (debounced search, lazy loading)

**Product Thinking:**
- ✅ Viewing history demonstrates going beyond basic requirements
- ✅ Feature prioritization shows understanding of user value
- ✅ UX choices align with hobbyist cook persona

### User Success

**For "The Experimenter" (Primary Persona):**
- Can browse international cuisines visually and discover new recipes
- Finds inspiration quickly without overwhelming options
- Bookmarks interesting recipes for weekend meal planning

**For "The Routine Builder" (Secondary Persona):**
- Can search for specific recipes by name
- Accesses saved favorites quickly for weeknight reference
- Reviews recent history when they forgot to bookmark something

---

## Product Scope

### MVP - Minimum Viable Product (2-hour target)

**Phase 1: Core Discovery (45 min) - P0**
1. **Search Functionality**
   - Search bar with debounced input (300ms delay)
   - Search recipes by name via MealDB API
   - Empty search shows all available recipes
   - Clear search button to reset

2. **Recipe Browse Grid**
   - Responsive card grid (1/2/3 columns by viewport)
   - Recipe cards display: image, title, category, cuisine
   - Lazy loaded images with Next.js Image component
   - Hover effects for visual feedback

3. **Recipe Detail View**
   - Modal overlay for recipe details (faster than routing)
   - Full recipe information: image, title, category, cuisine, ingredients, instructions
   - YouTube video link (if available)
   - Close button + ESC keyboard support

**Phase 2: Filtering & Polish (30 min) - P1**
4. **Category Filtering**
   - Visual filter chips for recipe categories
   - Single-select category filter
   - Clear filter button
   - Filter + search combination support

5. **Loading & Error States**
   - Skeleton loading cards during API fetch
   - Error messages for failed API calls
   - Empty state for "no recipes found"
   - Graceful degradation

**Phase 3: Bookmarks & History (30 min) - P1**
6. **Bookmark System**
   - Heart icon toggle on recipe cards
   - localStorage persistence (survives page refresh)
   - "My Favorites" filter view
   - Bookmark count badge
   - Empty favorites state with CTA

7. **Viewing History** ⭐ (Unique Feature)
   - Track last 10-20 viewed recipes
   - "Recently Viewed" section/tab
   - localStorage persistence
   - Chronological order (newest first)
   - Quick re-access to forgotten recipes

**Phase 4: Theming & Final Polish (15 min) - P1**
8. **Light/Dark Theme**
   - Theme toggle button (sun/moon icon)
   - localStorage theme preference
   - Smooth theme transitions
   - All components respect theme (via Tailwind dark: classes)

9. **Responsive & Accessibility**
   - Mobile-first responsive breakpoints
   - Keyboard navigation support
   - ARIA labels for screen readers
   - Focus states for interactive elements

### Growth Features (Post-MVP)

**If Time Permits (Priority Order):**

**P2 - Nice-to-Have (10-15 min each):**
- **Cuisine/Area Filter** - Filter by geographic cuisine (Italian, Chinese, etc.)
- **Random Recipe Button** - "Feeling adventurous?" CTA for discovery
- **Recipe Count Badge** - "Showing 24 recipes" for context
- **Smooth Animations** - Card entrance animations with Framer Motion

**P3 - Future Enhancement:**
- **Search Suggestions** - Autocomplete for recipe names
- **Ingredient Filter** - Filter by main ingredient (chicken, pasta, etc.)
- **Sort Options** - Alphabetical, by category
- **Recipe Sharing** - Share button with URL copy
- **Print Recipe** - Print-friendly recipe format

### Vision (Future/Out of Scope)

**Beyond 2-Hour Challenge:**
- User accounts with cloud-synced favorites
- Meal planning calendar integration
- Shopping list generation from ingredients
- Recipe ratings and reviews
- User-submitted recipes
- Dietary restriction filtering (vegetarian, gluten-free, etc.)
- Nutritional information display
- Multi-ingredient advanced search
- Recipe collections/boards
- Social sharing to Pinterest, Instagram

---

## User Experience Principles

### Design Philosophy

**Visual Language:**
- **Clean & Minimal** - Food photography is the hero, everything else supports it
- **Inviting & Warm** - Colors and spacing that feel welcoming, not clinical
- **Fast & Responsive** - Every interaction feels instant and smooth
- **Accessible** - Works for everyone, keyboard navigable, screen reader friendly

**Interaction Patterns:**
- **Progressive Disclosure** - Show essentials (image, title), reveal details on demand
- **One-Click Actions** - Bookmark with single click, no confirmation dialogs
- **Visual Feedback** - Hover states, transitions, loading indicators
- **Forgiving** - Easy to undo (unbookmark), clear navigation, no dead ends

### Key Interactions

**1. Recipe Discovery Flow**
```
Homepage → [Browse Grid or Search] → Spot Recipe → Click Card → Modal Opens
         → View Details → [Bookmark or Close] → Continue Browsing
```

**2. Bookmark Flow**
```
See Recipe → Click Heart Icon → Heart Fills (visual feedback) → Saved to Favorites
           → Access via "My Favorites" filter
```

**3. History Flow**
```
View Recipe → Auto-tracked in History → Close Modal → Later: "Recently Viewed" 
           → See that recipe you forgot → Click to re-open
```

**4. Theme Toggle Flow**
```
Prefer Dark Mode → Click Moon Icon → Theme Switches (smooth transition)
                 → Preference Saved → Persists on reload
```

### Component Library Strategy

**shadcn/ui + TailwindCSS:**
- **Theming:** CSS variables in `globals.css` for easy color customization
- **Dark Mode:** Tailwind's `dark:` class system with `next-themes` provider
- **Components Needed:**
  - Button (primary, secondary, icon variants)
  - Card (recipe cards)
  - Dialog/Modal (recipe details)
  - Badge (category, cuisine tags)
  - Input (search bar)
  - Toggle (theme switcher)
  
**Setup Time:** ~10 minutes
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog badge input
```

---

## Functional Requirements

### FR1: Recipe Search

**Priority:** P0 (Must-Have)
**User Story:** As a user, I want to search for recipes by name so I can find specific dishes I'm interested in cooking.

**Acceptance Criteria:**
- Search input at top of page (prominent, hero position)
- Placeholder text: "Search recipes... (try 'pasta', 'chicken', 'curry')"
- Real-time search with 300ms debounce (reduce API calls)
- Empty query shows all available recipes (browse mode)
- Clear button (X icon) to reset search
- Search query persists in URL params (nice-to-have)

**Technical Details:**
- API: `GET /search.php?s={query}`
- Debounce hook: `useDebounce(query, 300)`
- Handle empty results gracefully

**MealDB API Notes:**
- Empty search (`s=`) returns limited results (~100 recipes)
- No fuzzy matching - exact substring match on recipe name
- No pagination - all results returned at once

---

### FR2: Recipe Browse Grid

**Priority:** P0 (Must-Have)
**User Story:** As a user, I want to browse recipes visually in a grid so I can quickly scan options and find inspiration.

**Acceptance Criteria:**
- Responsive grid layout:
  - Mobile (< 640px): 1 column
  - Tablet (640px - 1024px): 2 columns
  - Desktop (> 1024px): 3 columns
- Recipe cards display:
  - Hero image (16:9 aspect ratio, 300px height)
  - Recipe title (truncated to 2 lines)
  - Category badge (e.g., "Seafood", "Vegetarian")
  - Cuisine label (e.g., "Italian", "Chinese")
  - Bookmark heart icon
- Hover effects: shadow lift, subtle scale
- Click card → open detail modal
- Lazy loading for images (Next.js Image component)

**Technical Details:**
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Cards map over `recipes` state array
- Click handler: `setSelectedRecipe(recipe)` → opens modal

---

### FR3: Recipe Detail View

**Priority:** P0 (Must-Have)
**User Story:** As a user, I want to view full recipe details including ingredients and instructions so I can decide if I want to cook it.

**Acceptance Criteria:**
- Modal overlay (backdrop blur, center alignment)
- Close button (top-right X) + ESC key support
- Click outside modal → close
- Recipe information displayed:
  - Large hero image at top
  - Recipe title (h2, prominent)
  - Category + Cuisine + Tags
  - **Ingredients Section:**
    - List format with measurements
    - Scannable (consider checkboxes for nice-to-have)
  - **Instructions Section:**
    - Step-by-step numbered list
    - Clear paragraph breaks
  - YouTube video link (if `strYoutube` exists)
  - Bookmark button (sticky top-right)
- Scrollable content for long recipes
- Mobile responsive (full-screen on small viewports)

**Technical Details:**
- Component: `<RecipeModal recipe={selected} onClose={...} />`
- Use shadcn/ui Dialog component
- API: Details already in search results, or fetch with `GET /lookup.php?i={id}`
- Parse ingredients: `strIngredient1` + `strMeasure1` → up to 20

---

### FR4: Category Filtering

**Priority:** P1 (Should-Have)
**User Story:** As a user, I want to filter recipes by category (e.g., Seafood, Dessert) so I can explore specific types of dishes.

**Acceptance Criteria:**
- Filter chips displayed below search bar
- Categories: Fetch from `GET /list.php?c=list` (12-14 categories)
- Visual design:
  - Unselected: Gray background, dark text
  - Selected: Blue/accent background, white text
  - Hover: Slightly darker
- Single-select behavior (clicking another clears previous)
- "All" or "Clear" button to reset filter
- Filter works in combination with search
- Category count badges (nice-to-have)

**Technical Details:**
- API: `GET /filter.php?c={category}` returns minimal data (id, name, thumb)
- Must fetch full details for each recipe (or accept minimal data)
- State: `selectedCategory` string

**Available Categories:**
- Beef, Breakfast, Chicken, Dessert, Goat, Lamb, Miscellaneous, Pasta, Pork, Seafood, Side, Starter, Vegan, Vegetarian

---

### FR5: Bookmark/Favorites System

**Priority:** P1 (Should-Have)
**User Story:** As a user, I want to bookmark my favorite recipes so I can quickly access them later without searching again.

**Acceptance Criteria:**
- Heart icon on every recipe card
- Toggle states:
  - Unfilled heart (🤍 or outline) = not bookmarked
  - Filled heart (❤️ or solid) = bookmarked
- Click heart → toggle bookmark (prevent card click event)
- Visual feedback: heart fills/unfills with smooth transition
- Bookmarks persist in localStorage
- "My Favorites" view:
  - Filter button/tab to show only bookmarked recipes
  - Empty state: "No favorites yet! Start bookmarking recipes you love."
  - Display count: "X favorites"
- Heart icon also in recipe detail modal
- Bookmark from detail modal syncs with card

**Technical Details:**
- localStorage key: `recipe-bookmarks`
- Data structure: Array of recipe IDs `["52772", "52871", ...]`
- Custom hook: `useBookmarks()` with `toggleBookmark(id)`, `isBookmarked(id)`
- Filter logic: `recipes.filter(r => bookmarks.includes(r.idMeal))`

**Implementation:**
```typescript
const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('recipe-bookmarks');
    if (stored) setBookmarks(JSON.parse(stored));
  }, []);
  
  const toggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem('recipe-bookmarks', JSON.stringify(updated));
  };
  
  return { bookmarks, toggleBookmark, isBookmarked: (id) => bookmarks.includes(id) };
};
```

---

### FR6: Viewing History ⭐ (Unique Feature)

**Priority:** P1 (Should-Have)
**User Story:** As a user, I want to see recipes I've recently viewed so I can revisit recipes I forgot to bookmark.

**Acceptance Criteria:**
- Automatically track when user opens recipe detail modal
- Store last 10-20 recipes (configurable)
- Display in "Recently Viewed" section/tab
- Order: Most recent first (chronological)
- Show: Recipe card with timestamp (e.g., "Viewed 5 min ago", "Yesterday")
- Persist in localStorage (survive page refresh)
- Clear history button (optional, nice-to-have)
- Don't duplicate: If recipe already in history, move to top
- History independent of bookmarks (can view unbookmarked recipes)

**Technical Details:**
- localStorage key: `recipe-history`
- Data structure:
```typescript
interface HistoryEntry {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
  };
  viewedAt: number; // timestamp
}
```
- Track on: Recipe modal open
- Display: Dedicated "Recently Viewed" tab or section
- Cleanup: Limit to 20 entries, remove oldest

**User Value:**
- **"I saw a great recipe yesterday but forgot to save it"** → Solved
- **Inspiration from serendipitous discoveries** → Surfaces forgotten gems
- **Zero effort** → Automatic, no user action required

---

### FR7: Loading & Error States

**Priority:** P1 (Should-Have)
**User Story:** As a user, I want to see clear feedback when recipes are loading or when something goes wrong so I understand what's happening.

**Acceptance Criteria:**
- **Loading State:**
  - Skeleton cards during initial load and search
  - 6-9 skeleton cards in grid
  - Shimmer animation effect
  - Search input disabled during load (optional)
  
- **Error State:**
  - User-friendly message: "Oops! Couldn't load recipes. Please try again."
  - Retry button
  - Error displayed where grid would be
  
- **Empty State:**
  - No search results: "No recipes found for '{query}'. Try searching for something else."
  - No favorites: "No favorites yet! Start bookmarking recipes you love." + browse CTA
  - No history: "No recipes viewed yet. Start exploring!"

**Technical Details:**
- States: `loading`, `error`, `recipes.length === 0`
- Skeleton component with Tailwind animations
- Error boundary for unexpected errors (optional)

---

### FR8: Light/Dark Theme Toggle

**Priority:** P1 (Should-Have)
**User Story:** As a user, I want to switch between light and dark themes so I can use the app comfortably in different lighting conditions.

**Acceptance Criteria:**
- Theme toggle button (sun ☀️ / moon 🌙 icon)
- Location: Top-right of header/nav
- Toggle switches between light and dark themes
- Smooth transition (fade, no flash)
- Theme preference persists in localStorage
- All components adapt to theme (text, backgrounds, borders)
- Proper contrast in both themes (WCAG AA)
- Recipe cards maintain readability in dark mode

**Technical Details:**
- Use `next-themes` library for theme management
- Tailwind config with `darkMode: 'class'`
- CSS variables in `globals.css` for theme colors
- All components use Tailwind `dark:` prefix
- shadcn/ui components handle dark mode automatically

**Theme Colors:**
```css
/* Light theme */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--card: 0 0% 100%;
--primary: 222.2 47.4% 11.2%;

/* Dark theme */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--card: 222.2 84% 4.9%;
--primary: 210 40% 98%;
```

---

### FR9: Responsive Design

**Priority:** P0 (Must-Have)
**User Story:** As a user, I want the app to work well on my phone, tablet, and desktop so I can access recipes on any device.

**Acceptance Criteria:**
- **Mobile (< 640px):**
  - Single column grid
  - Full-width search bar
  - Stacked filter chips (scrollable horizontal)
  - Recipe modal fills viewport
  - Larger touch targets (min 44x44px)
  
- **Tablet (640px - 1024px):**
  - 2-column grid
  - Side-by-side layout for some elements
  
- **Desktop (> 1024px):**
  - 3-column grid
  - Optimal reading width for recipe details
  
- All breakpoints maintain:
  - Readable font sizes
  - Proper spacing and padding
  - No horizontal scroll
  - Images scale appropriately

**Technical Details:**
- Tailwind responsive prefixes: `sm:`, `md:`, `lg:`
- Mobile-first approach (base styles = mobile)
- Test on Chrome DevTools device emulation

---

### FR10: Accessibility

**Priority:** P1 (Should-Have)
**User Story:** As a user with accessibility needs, I want to navigate and use the app with keyboard and screen readers.

**Acceptance Criteria:**
- **Keyboard Navigation:**
  - Tab through all interactive elements
  - Enter key opens recipe modal
  - ESC key closes modal
  - Focus visible on all elements (outline)
  
- **Screen Readers:**
  - ARIA labels on icon buttons
  - Alt text on all images
  - Semantic HTML (nav, main, section, article)
  - Heading hierarchy (h1, h2, h3)
  
- **Color Contrast:**
  - WCAG AA compliance (4.5:1 for text)
  - Test with Chrome DevTools Lighthouse
  
- **Focus Management:**
  - Modal traps focus while open
  - Focus returns to trigger element on close

**Technical Details:**
- Use semantic HTML elements
- Add `aria-label` to icon buttons
- Test with screen reader (VoiceOver on Mac)
- Run Lighthouse accessibility audit

---

## Non-Functional Requirements

### Performance

**Priority:** High (User-facing impact)

**Requirements:**
1. **Page Load Time:**
   - First Contentful Paint (FCP) < 1.5s
   - Largest Contentful Paint (LCP) < 2.5s
   - Time to Interactive (TTI) < 3.5s
   
2. **API Response Handling:**
   - Debounce search input (300ms) to reduce API calls
   - Show loading state immediately on search
   - Cache API responses (optional, nice-to-have)
   
3. **Image Optimization:**
   - Use Next.js Image component for automatic optimization
   - Lazy loading for off-screen images
   - WebP format with fallbacks
   - Responsive image sizes
   
4. **Bundle Size:**
   - Minimize JavaScript bundle
   - shadcn/ui imports only needed components
   - Avoid heavy libraries (moment.js, lodash, etc.)
   
5. **Smooth Interactions:**
   - 60fps animations (CSS transforms, opacity only)
   - No jank on scroll or hover
   - Debounced window resize handlers

**Why It Matters:**
- Fast load times create positive first impression
- Smooth interactions feel professional and polished
- Mobile users may have slower connections

**Measurement:**
- Run Lighthouse audit (target score > 90)
- Test on throttled network (Slow 3G)

---

### Security

**Priority:** Low (No sensitive data, client-side only)

**Requirements:**
1. **API Security:**
   - MealDB API is public, no authentication required
   - No API keys or secrets in client code
   
2. **localStorage Safety:**
   - Only store non-sensitive data (recipe IDs, theme preference)
   - No user personal information
   - Validate data structure on read (prevent corruption)
   
3. **XSS Prevention:**
   - React escapes content by default
   - Don't use `dangerouslySetInnerHTML` for user content
   - Sanitize recipe instructions if rendering as HTML (not needed for text)

**Why It Matters:**
- No user accounts = minimal security concerns
- Public API = no credential leakage risk
- Best practice: defensive coding even for simple apps

---

### Scalability

**Priority:** Low (Take-home challenge, not production)

**Considerations:**
1. **API Limits:**
   - MealDB free tier: No documented rate limits for test key
   - If production: Implement request caching, rate limiting
   
2. **localStorage Limits:**
   - Browsers typically allow 5-10MB per origin
   - Storing 1000 recipe IDs ~30KB (well within limit)
   - If hitting limits: Implement LRU cache for history
   
3. **Client-Side Rendering:**
   - All recipes rendered client-side (state management)
   - For production: Consider server-side rendering (SSR) or static generation (SSG)
   - For large recipe sets: Implement virtual scrolling/pagination

**Future Scaling:**
- Move to database for user-specific data
- Implement backend API to proxy MealDB requests
- Add caching layer (Redis, CDN)
- Implement infinite scroll for large result sets

---

### Accessibility

**Priority:** Medium (Broad audience, best practice)

**Target:** WCAG 2.1 Level AA compliance

**Requirements Detailed:**
1. **Perceivable:**
   - All images have meaningful alt text
   - Color contrast ratios meet AA standards (4.5:1 text, 3:1 UI)
   - Text can be resized up to 200% without loss of content
   
2. **Operable:**
   - All functionality available via keyboard
   - No keyboard traps (can exit modal with ESC/Tab)
   - Skip links for main content (optional)
   - Focus indicators clearly visible
   
3. **Understandable:**
   - Clear, simple language in UI text
   - Consistent navigation patterns
   - Error messages are helpful and specific
   
4. **Robust:**
   - Valid HTML5 markup
   - Compatible with assistive technologies
   - Semantic elements (not div soup)

**Testing:**
- Automated: Lighthouse accessibility score > 90
- Manual: Keyboard navigation test
- Manual: Screen reader test (VoiceOver)

---

## Technical Architecture Overview

### Frontend Architecture

**Framework:** Next.js 14 (App Router)
- App directory structure
- React Server Components where applicable
- Client components for interactivity

**State Management:**
- React hooks (`useState`, `useEffect`)
- Custom hooks: `useBookmarks()`, `useHistory()`, `useDebounce()`
- No Redux/Zustand needed (simple app state)

**Routing:**
- Single page application (no routing needed)
- Modal for recipe details (faster than navigation)
- URL query params for search (nice-to-have)

**Data Flow:**
```
User Input → API Call → State Update → Re-render
     ↓
localStorage (bookmarks, history, theme)
```

### Component Structure

```
app/
  page.tsx              # Main page with recipe grid
  layout.tsx            # Root layout with theme provider
  globals.css           # Tailwind + theme variables

components/
  RecipeCard.tsx        # Individual recipe card
  RecipeModal.tsx       # Recipe detail modal
  SearchBar.tsx         # Search input with debounce
  FilterChips.tsx       # Category filter buttons
  ThemeToggle.tsx       # Light/dark mode toggle
  SkeletonCard.tsx      # Loading skeleton
  EmptyState.tsx        # No results/favorites message

lib/
  api.ts               # MealDB API functions
  hooks.ts             # Custom hooks (useBookmarks, useHistory, useDebounce)
  types.ts             # TypeScript interfaces
  utils.ts             # Helper functions

types/
  recipe.ts            # Recipe interface
```

### API Integration Pattern

```typescript
// lib/api.ts
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchRecipes(query: string) {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  const data = await res.json();
  return data.meals || [];
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/list.php?c=list`);
  const data = await res.json();
  return data.meals || [];
}

export async function filterByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
}
```

### Styling Approach

**TailwindCSS Utility Classes:**
- Rapid development with utility-first approach
- Responsive prefixes: `md:`, `lg:`
- Dark mode: `dark:` prefix
- Custom theme in `tailwind.config.ts`

**shadcn/ui Components:**
- Copy components into project (not npm package)
- Customize via Tailwind classes
- Accessible by default (Radix UI primitives)

**No Custom CSS:**
- Avoid separate CSS files to save time
- Use Tailwind utilities for everything
- Inline styles only if absolutely necessary

---

## Development Workflow (2-Hour Plan)

### Setup (10 min)
- [x] Install dependencies: `npm install`
- [ ] Install shadcn/ui: `npx shadcn-ui@latest init`
- [ ] Add components: `npx shadcn-ui@latest add button card dialog badge input`
- [ ] Set up dark mode: Install `next-themes`, configure provider
- [ ] Create folder structure: `components/`, `lib/`, `types/`

### Phase 1: Core Discovery (45 min)
- [ ] API client (`lib/api.ts`): `searchRecipes()`, `getCategories()`
- [ ] Types (`types/recipe.ts`): Recipe interface
- [ ] SearchBar component with debounce
- [ ] RecipeCard component
- [ ] Recipe grid on main page
- [ ] RecipeModal component
- [ ] Click handler to open modal

### Phase 2: Filtering & Polish (30 min)
- [ ] FilterChips component
- [ ] Category filter logic
- [ ] SkeletonCard loading state
- [ ] Error handling + EmptyState component
- [ ] Responsive grid refinement

### Phase 3: Bookmarks & History (30 min)
- [ ] `useBookmarks()` hook with localStorage
- [ ] Heart icon on RecipeCard
- [ ] Bookmark toggle logic
- [ ] "My Favorites" filter view
- [ ] `useHistory()` hook with localStorage
- [ ] Track recipe views
- [ ] "Recently Viewed" section

### Phase 4: Theming & Final Polish (15 min)
- [ ] ThemeToggle component
- [ ] Theme provider setup
- [ ] Test dark mode across all components
- [ ] Final responsive checks
- [ ] Keyboard navigation test
- [ ] ARIA labels and accessibility

### Buffer (10 min)
- [ ] Bug fixes
- [ ] Quick wins if ahead (random recipe button, animations)

---

## Next Steps

### Immediate Next: Epic & Story Breakdown

**Run:** `workflow create-epics-and-stories` to decompose this PRD into:
- Epic 1: Recipe Discovery Core
- Epic 2: Bookmark System
- Epic 3: Viewing History
- Epic 4: Theming & Polish
- Individual user stories with acceptance criteria

### Then: UX Design (Optional but Recommended)

**Run:** `workflow create-design` to define:
- Visual design direction mockups
- Color theme with dark mode
- Component specifications
- User journey flows

### Finally: Architecture

**Run:** `workflow create-architecture` for:
- Technical architecture decisions
- Component diagram
- State management patterns
- API integration strategy

---

## References

- **Research Document:** `docs/research-domain-2025-11-11.md`
- **MealDB API:** https://www.themealdb.com/api.php
- **shadcn/ui:** https://ui.shadcn.com/
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Dark Mode:** https://tailwindcss.com/docs/dark-mode

---

## Appendix: MealDB API Quick Reference

**Base URL:** `https://www.themealdb.com/api/json/v1/1`

**Key Endpoints:**
```
GET /search.php?s={query}      # Search by name
GET /lookup.php?i={id}         # Get recipe details
GET /filter.php?c={category}   # Filter by category
GET /filter.php?a={area}       # Filter by cuisine
GET /list.php?c=list           # Get all categories
GET /random.php                # Random recipe
```

**Recipe Object Structure:**
```typescript
interface Recipe {
  idMeal: string;
  strMeal: string;              // Title
  strCategory: string;          // e.g., "Seafood"
  strArea: string;              // e.g., "Italian"
  strInstructions: string;      // Cooking steps
  strMealThumb: string;         // Image URL
  strTags: string | null;       // Comma-separated tags
  strYoutube: string | null;    // Video URL
  strIngredient1: string;       // Up to 20 ingredients
  strMeasure1: string;          // Measurements
  // ... strIngredient2-20, strMeasure2-20
}
```

---

_This PRD captures the essence of Recipe Discovery - effortless recipe memory through clean visual discovery, frictionless bookmarking, and intelligent viewing history that surfaces forgotten gems._

_Created through collaborative discovery between BMad and PM John._
