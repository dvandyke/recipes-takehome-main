# Recipe Discovery - Implementation Writeup

**Developer:** Derek Van Dyke  
**Date:** November 14, 2025  
**Time Spent:** ~2 hours

---

## Feature Implementation Rationale

### Core Features Implemented

**1. Smart Search with Debouncing (300ms)**  
Implemented instant search using TheMealDB API with debounced input to reduce unnecessary API calls. The 300ms delay strikes a balance between responsiveness and API efficiency, allowing users to type full words before triggering searches. Combined with React Query for intelligent caching, this creates a snappy search experience that feels instant after the first query.

**2. Dual Filter System (Category + Area)**  
Beyond the basic requirements, I implemented both category (Seafood, Dessert, etc.) and geographic area filtering (Italian, Chinese, Canadian). This dual approach addresses two different user mental models: cooking by meal type vs. exploring cuisine styles. The filters use mutual exclusion to keep the UX simple: users pick one lens at a time. Visual FilterChip components with active states provide clear feedback.

**3. Lazy-Loading Recipe Details**  
The MealDB API returns different data structures depending on the endpoint: search gives full recipes, but filters return minimal stubs. Rather than fetching all details upfront (slow), the RecipeModal detects missing data and lazy-loads complete details only when needed. This pattern keeps the initial browse experience fast while ensuring recipe modals always display complete information.

**4. Persistent Bookmarks & View History**  
Bookmarks use localStorage with a one-click heart icon toggle, persisting across sessions without requiring authentication. The viewing history feature goes further by auto-tracking the last 50 viewed recipes with timestamps, solving the common problem of "I saw a great recipe yesterday but forgot to save it." History entries show relative time ("5m ago") and deduplicate by bubbling re-viewed recipes to the top.

**5. Three-View Navigation System**  
Implemented a tabbed interface switching between Discover (browse/search), Favorites (bookmarked recipes), and History (recently viewed). Badge counts update dynamically based on localStorage state, with proper hydration guards to prevent SSR mismatches. This structure makes saved content easily accessible without cluttering the main discovery flow.

**6. Nuanced Dark Mode Theme**  
Upgraded from stark black/white to a more subtle slate-blue dark theme using HSL color variables. The background uses  blue tint (222° hue, 47% saturation, 11% lightness) with elevated cards (14% lightness) for depth perception. Softer off-white text (98% lightness) reduces eye strain. The theme system uses next-themes with localStorage persistence and smooth CSS transitions.

### Design Decisions

**Why Modal Instead of Routing?**  
Modal overlays for recipe details feel faster than full-page navigation and maintain browse context. Users can quickly scan multiple recipes without losing their place in the grid. ESC key and click-outside handlers provide intuitive exit paths.

**Why Skeleton Loading Over Spinners?**  
Skeleton cards with animations create perceived performance by showing content structure immediately. The grid layout remains stable during loading, preventing jarring layout shifts. This pattern feels more premium than generic spinners.

**Why React Query Over Fetch?**  
React Query (@tanstack/react-query) provides intelligent caching (5min stale time), automatic retries, and loading/error states with minimal boilerplate. The devtools helped debug API responses during development. For a 2-hour challenge, this library saved significant time versus manual cache management.

**Why shadcn/ui Over Component Library?**  
shadcn/ui's copy-paste approach means owning the component code rather than fighting framework abstractions. Components use Radix UI primitives for accessibility while being fully customizable with Tailwind. Setup took ~10 minutes versus hours of customization with typical component libraries.

---

## Outside Resources & AI Tools

### AI Tools Used

**Primary: GitHub Copilot with Claude Sonnet 4**  
Used throughout the entire development process following the BMad (Breakthrough Method for Agile Ai Driven Development) workflow. Rather than ad-hoc assistance, I used a structured approach:

1. **Discovery Phase**: Analyzed the PRD requirements and user stories
2. **Planning Phase**: Generated epic breakdown (5 epics, 20 user stories) with BDD acceptance criteria
3. **Architecture Phase**: Created comprehensive architecture document covering tech stack decisions, implementation patterns, and ADRs
4. **Implementation Phase**: Built features iteratively, epic by epic

**Why This Approach?**  
The BMad workflow transformed what could have been chaotic feature-adding into systematic delivery. Each epic had clear acceptance criteria and dependencies. The architecture document captured decisions (why React Query over Redux, why localStorage over backend, why modal over routing) that would otherwise be lost. This structure also made debugging systematic - when issues arose, I could trace back through acceptance criteria to validate expected behavior.

**How Claude Was Used:**
- **Code Generation**: Scaffolded components following established patterns (RecipeCard, FilterChips, RecipeModal)
- **Problem Solving**: Debugged hydration errors, modal scrolling issues, API data structure inconsistencies
- **Bug Fixes**: Identified and resolved console warnings, TypeScript errors, and UX issues
- **Feature Additions**: Implemented Area filtering (beyond requirements) when I saw the API supported it

**Specific Examples:**
- **Hydration Error**: ViewSwitcher badge counts differed between SSR (0) and client (localStorage values). Claude diagnosed the issue and suggested a `mounted` state guard to defer client-only rendering.
- **Lazy Recipe Loading**: When category filters returned minimal data (no instructions), Claude designed the lazy-loading pattern in RecipeModal using conditional React Query fetching.

### Development Tools

**React Query DevTools**  
Inspected cache state, query invalidation, and stale time during development. Critical for debugging why certain API calls weren't triggering.

**Chrome DevTools**  
- Device emulation for responsive testing
- Network throttling (Slow 3G) to validate loading states
- Console for debugging hydration warnings and React key errors

**Lighthouse**  
Ran accessibility audits to validate WCAG AA compliance and identify contrast issues in dark mode.

### Learning Resources

**Next.js 14 Documentation**  
Referenced App Router patterns, particularly around `suppressHydrationWarning` for theme providers and proper Client Component boundaries.

**shadcn/ui Component Docs**  
Consulted component APIs for Dialog (modal), Badge (category chips), and Button variants. The "New York" style documentation provided theming guidance.

**TheMealDB API Docs**  
Discovered undocumented behavior: `filter.php` endpoints return minimal recipe stubs (id, name, thumbnail) requiring subsequent `lookup.php` calls for full details. This shaped the lazy-loading architecture.

**TailwindCSS Dark Mode Guide**  
Learned HSL color system for CSS variables and how `dark:` prefix propagates through component trees.

---

## Implementation Process

### Time Breakdown (Approximate)

- **Setup & Planning** (20 min): BMM workflow execution, dependency installation, shadcn/ui setup
- **Epic 1 - Foundation** (15 min): API client, types, providers, layout, hooks
- **Epic 2 - Core Discovery** (25 min): SearchBar, RecipeCard, RecipeGrid, RecipeModal
- **Epic 3 - Filtering** (20 min): CategoryFilters, AreaFilters, loading/error states
- **Epic 4 - Bookmarks/History** (20 min): useBookmarks, useHistory, FavoritesView, HistoryView
- **Epic 5 - Theme/Polish** (15 min): ThemeToggle, React.memo, accessibility, README
- **Bug Fixes** (20 min): Hydration, lazy loading, modal scroll, skeleton sizing, key props
- **Final Polish** (15 min): Dark theme refinement, .gitignore, writeup

### Key Challenges & Solutions

**Challenge 1: Filter Endpoints Return Incomplete Data**  
MealDB's `filter.php?c={category}` returns only `idMeal`, `strMeal`, `strMealThumb` - missing instructions, ingredients, and tags. 

*Solution:* Implemented conditional fetching in RecipeModal. When `strInstructions` is undefined, trigger a secondary `useQuery` to fetch full details via `lookup.php?i={id}`. Display loading skeleton during fetch. This approach keeps the filter experience fast while ensuring modals have complete data.

**Challenge 2: Hydration Mismatch on Badge Counts**  
ViewSwitcher displayed bookmark/history counts that differed between server (0) and client (localStorage values), triggering React hydration errors.

*Solution:* Added `mounted` state guard. Badge counts only render after `useEffect` sets `mounted=true`, ensuring SSR outputs no counts and client-side matches. Trade-off: slight flicker on first load, but eliminates console errors.

**Challenge 3: Modal Content Overflow**  
Long ingredient lists and instructions extended beyond viewport with no scrolling in Dialog component.

*Solution:* Changed DialogContent padding to `p-0` and wrapped content in `<div className="overflow-y-auto p-6">`. The inner div becomes the scroll container while DialogContent remains fixed height.

**Challenge 4: Skeleton Cards Misaligned**  
SkeletonCard rendered individual cards without the grid wrapper, causing vertical stacking instead of responsive columns.

*Solution:* Wrapped skeleton cards in the same grid layout as RecipeGrid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Now loading states match final layout.

---

## Outcomes

### Requirements Met

✅ **All 10 Functional Requirements** implemented and tested  
✅ **Non-Functional Requirements** achieved (performance, scalability, accessibility, responsiveness)  
✅ **Zero console errors** after bug fixes  
✅ **Production build successful** (`npm run build` exits cleanly)  
✅ **Dark theme** with nuanced slate-blue palette  
✅ **Accessibility** - keyboard navigation, ARIA labels, focus management  

### Beyond Requirements

- **Area filtering** (Canadian, Italian, American, etc.) - original PRD only specified category filtering
- **Lazy-loading optimization** for minimal API data
- **Viewing history deduplication** - bumps re-viewed recipes to top
- **React.memo optimizations** on expensive components
- **Comprehensive error handling** with retry functionality
- **Professional documentation** (README, architecture doc, implementation summary)

### Final Statistics

- **25+ Components** built in 2 hours
- **6 Custom Hooks** for reusable logic
- **5 shadcn/ui Components** integrated and customized
- **7 API Endpoints** consumed from MealDB
- **~2000 lines** of TypeScript code
- **0 TypeScript errors** in strict mode
- **0 Console warnings** in production build

---

## Reflection

The BMM workflow proved invaluable for staying focused under time pressure. Rather than jumping between features randomly, the epic structure ensured I built foundation → core features → polish in a logical sequence. The architecture document captured decisions that would normally be forgotten (why React Query? why modal over routing?), making this writeup easier to compile.

Using AI as a structured partner rather than ad-hoc assistant elevated the quality. Claude didn't just generate code, it reasoned through architecture trade-offs, debugged subtle issues (hydration, lazy loading), and suggested improvements (Area filtering, React.memo). The key was maintaining context through the BMad workflow rather than isolated one-off prompts and giving clear communication, guidance, and guardrails around what needed to be accomplished.

If I had more time, I'd add: ingredient-based filtering, recipe ratings, mutual search and filter functionality, and performance optimizations.
