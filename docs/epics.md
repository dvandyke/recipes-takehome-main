# Recipe Discovery - Epic Breakdown

**Author:** BMad
**Date:** 2025-11-12
**Project Level:** MVP Implementation
**Target Scale:** 2-Hour Challenge Scope

---

## Overview

This document decomposes the Recipe Discovery PRD into actionable epics and stories sized for autonomous development sessions. The work is split into five epics that progress from foundational scaffolding to polish, ensuring every functional and non-functional requirement is covered while preserving the product's "effortless recipe memory" experience.

- **Epic 1** establishes a production-ready Next.js 14 foundation, UI toolkit, and API integrations so feature teams can move fast with confidence.
- **Epic 2** delivers the visual discovery loop (search, browse, detail) that anchors the user experience.
- **Epic 3** layers on filtering, loading feedback, and resilience so users maintain flow even under network variance.
- **Epic 4** unlocks personal value through bookmarks and viewing history, fulfilling the product's signature differentiator.
- **Epic 5** finalizes theming, accessibility, and performance guardrails to meet success metrics and NFRs.

---

## Epic 1: Foundation & Infrastructure Setup

Establish a stable, type-safe project baseline with shared tooling, UI primitives, and API utilities that support rapid feature development.

### Story 1.1: Establish project foundation and tooling

As a developer enabling the team,
I want to bootstrap the Next.js 14 project with TypeScript, linting, formatting, and CI-ready scripts,
So that every contributor can build and ship confidently on a consistent baseline.

**Acceptance Criteria:**
**Given** the existing repository skeleton,
**When** dependencies, scripts, and configuration for Next.js 14, TypeScript, ESLint, Prettier, Husky (or equivalent), and TailwindCSS are installed and wired into `package.json`,
**Then** `npm run lint`, `npm run build`, and `npm run test` execute without errors while enforcing the agreed code quality rules.

**And** project documentation in `README.md` (or contributing notes) outlines the local dev workflow.

**Prerequisites:** None

**Technical Notes:** Configure lint-staged for formatting on commit, ensure tsconfig aligns with Next.js defaults, and document the 2-hour challenge constraints for future reference.

### Story 1.2: Configure design system and theme primitives

As a developer responsible for UI consistency,
I want to install shadcn/ui components and Tailwind theme tokens,
So that designers and engineers share a cohesive, accessible component baseline.

**Acceptance Criteria:**
**Given** TailwindCSS and shadcn/ui are available,
**When** I scaffold the required components (button, card, dialog, badge, input) with shared color tokens and dark mode variables,
**Then** the app renders sample components in both light and dark themes without layout regressions.

**And** theme tokens reside in `globals.css` with clear naming and documentation for future additions.

**Prerequisites:** Story 1.1

**Technical Notes:** Use `next-themes` provider in `layout.tsx`, ensure Tailwind config enables `darkMode: 'class'`, and validate component imports stay tree-shakeable.

### Story 1.3: Implement MealDB API client and types

As a front-end developer,
I want a typed client library for MealDB plus shared recipe interfaces,
So that feature stories can consume data safely without duplicating fetch logic.

**Acceptance Criteria:**
**Given** the MealDB API contract from the PRD,
**When** I add `lib/api.ts` with `searchRecipes`, `getCategories`, `filterByCategory`, and `getRecipeDetails` functions and define `Recipe`/`Category` interfaces,
**Then** TypeScript consumers can import these helpers with IntelliSense and mocked tests can stub responses easily.

**And** the client gracefully handles empty responses (`meals: null`) by returning typed fallbacks.

**Prerequisites:** Story 1.1

**Technical Notes:** Centralize the API base URL, add lightweight error handling (throwing on non-200 responses), and export helper mappers for ingredient parsing to support later stories.

### Story 1.4: Set up shared state utilities and helper hooks

As a feature developer,
I want reusable hooks for debouncing and localStorage access patterns,
So that subsequent stories can focus on UX instead of wiring boilerplate.

**Acceptance Criteria:**
**Given** the need for debounced search and persisted preferences,
**When** I provide `useDebounce`, `usePersistentState`, and localStorage-safe utilities with TypeScript generics,
**Then** consuming components can integrate search debounce and persisted toggles without rewriting effect handlers.

**And** utilities protect against SSR mismatches by gating on `typeof window !== 'undefined'`.

**Prerequisites:** Stories 1.2 and 1.3

**Technical Notes:** Include unit tests or stories to validate hook behavior, and export helpers via an index barrel (`lib/hooks.ts`).

---

## Epic 2: Core Recipe Discovery Loop

Deliver the search → browse → detail flow that showcases recipes with minimal friction and responsive layouts.

### Story 2.1: Implement debounced recipe search

As a hobbyist cook exploring dinner ideas,
I want to search for recipes by name with instant feedback,
So that I can quickly find dishes that match my cravings.

**Acceptance Criteria:**
**Given** a search bar at the top of the page,
**When** I type "pasta" or any other query,
**Then** results update after a 300ms debounce using the MealDB search API and show all recipes when the input is cleared.

**And** a clear button resets the search state without requiring a page reload.

**Prerequisites:** Stories 1.3 and 1.4

**Technical Notes:** Persist the current query in component state (optionally URL params), surface loading status from the hook, and guard against cancelled requests.

### Story 2.2: Render responsive recipe browse grid

As a visually driven user,
I want a responsive grid of recipe cards that highlight imagery, category, and cuisine,
So that I can scan for inspiration across devices.

**Acceptance Criteria:**
**Given** search or default data is available,
**When** I view the home screen on mobile, tablet, or desktop,
**Then** the grid renders 1/2/3 columns respectively with accessible card layouts, lazy-loaded images, and bookmark icons.

**And** hovering or focusing a card provides visual feedback without jank.

**Prerequisites:** Story 2.1

**Technical Notes:** Use Next.js `Image` for optimization, apply Tailwind breakpoints, and ensure cards forward click handlers without triggering bookmark toggles.

### Story 2.3: Provide recipe detail modal experience

As a user evaluating a recipe,
I want a modal with full ingredients, instructions, and media,
So that I can decide whether to cook it without losing my place in the grid.

**Acceptance Criteria:**
**Given** I click any recipe card,
**When** the modal opens,
**Then** it displays the large hero image, category, cuisine, tags, ingredients list, instructions, and YouTube link (if present), while trapping focus and supporting ESC/overlay close.

**And** reopening the modal for the same recipe reflects bookmark state changes instantly.

**Prerequisites:** Story 2.2

**Technical Notes:** Build on shadcn Dialog or Headless UI, ensure ingredient parsing handles up to 20 entries, and manage `selectedRecipe` in state without causing unnecessary re-renders.

---

## Epic 3: Filtering, Feedback & Resilience

Enhance discoverability and trust by adding category filters, load states, and graceful error handling to keep the experience polished under real-world conditions.

### Story 3.1: Layer category filtering onto discovery loop

As an experimenter exploring cuisines,
I want filter chips for MealDB categories,
So that I can narrow results to dishes that match my mood.

**Acceptance Criteria:**
**Given** the category list fetch succeeds,
**When** I toggle "Seafood" or any category chip,
**Then** the grid refreshes with filtered recipes while combining with the current search term and offering a clear-all control.

**And** the active chip maintains visual state across re-renders.

**Prerequisites:** Story 2.1

**Technical Notes:** Cache category lookups, reconcile filter results that return minimal fields by hydrating details via lookup endpoint, and prevent race conditions between search and filter requests.

### Story 3.2: Implement loading, error, and empty states

As a user relying on the app,
I want clear feedback when data is loading, unavailable, or when no recipes match,
So that I always understand what to do next.

**Acceptance Criteria:**
**Given** I trigger search or filter changes,
**When** data is fetching,
**Then** skeleton cards appear in place of content until results arrive.

**And** failed requests surface a retryable error message, while zero matches show a friendly empty state referencing the current query or filter.

**Prerequisites:** Story 3.1

**Technical Notes:** Reuse shimmer skeleton components, centralize error states in a status enum, and instrument retry logic to reuse existing fetch helpers.

### Story 3.3: Ensure responsive layout resilience and scroll behavior

As a mobile-first user,
I want the layout to remain usable under different breakpoints and scroll positions,
So that I can browse recipes comfortably on any device.

**Acceptance Criteria:**
**Given** I resize the viewport or access the site on mobile,
**When** I scroll through search results or open/close the modal,
**Then** the layout maintains single-column flow, sticky search/filter controls behave correctly, and body scroll locking prevents background jumps.

**And** Lighthouse responsive audits pass without layout shift regressions.

**Prerequisites:** Story 2.3

**Technical Notes:** Apply `useLockBodyScroll` in modal, validate CSS gap tokens, and add viewport meta tags plus Tailwind classes that avoid cumulative layout shift.

---

## Epic 4: Personalized Memory & Persistence

Deliver the bookmarking and recently viewed capabilities that distinguish Recipe Discovery, leveraging localStorage for seamless persistence.

### Story 4.1: Build bookmark persistence hook and UI integration

As a planner saving favorites,
I want to toggle hearts on recipes and have them persist,
So that I can return to dishes I love without creating an account.

**Acceptance Criteria:**
**Given** I click the heart icon on any recipe card or modal,
**When** I toggle it on or off,
**Then** the visual state updates immediately, persists in localStorage under `recipe-bookmarks`, and syncs between grid and modal views.

**And** refreshing the page restores bookmark state without console errors.

**Prerequisites:** Story 2.3

**Technical Notes:** Extend the persistent hook from Story 1.4, store only necessary recipe metadata plus ID, and debounce writes to avoid thrashing.

### Story 4.2: Deliver favorites-focused discovery mode

As a routine builder revisiting reliable meals,
I want a dedicated favorites view or filter,
So that I can quickly access bookmarked recipes during meal prep.

**Acceptance Criteria:**
**Given** I have at least one bookmarked recipe,
**When** I activate the "My Favorites" control,
**Then** the grid shows only bookmarked items with an empty state prompting action when none exist, while retaining access to search and detail modal behavior.

**And** exiting favorites returns me to the prior search/filter context.

**Prerequisites:** Story 4.1

**Technical Notes:** Implement favorites as a toggleable filter in shared state, ensure empty state includes a CTA, and maintain Aria labels for tab or button controls.

### Story 4.3: Track and surface recently viewed recipes

As a curious explorer prone to forgetting,
I want the app to remember recently viewed recipes automatically,
So that I can rediscover hidden gems without manual effort.

**Acceptance Criteria:**
**Given** I open recipe modals throughout a session,
**When** I navigate to the "Recently Viewed" section,
**Then** I see the last 20 unique recipes ordered by most recent view with timestamps (e.g., "Viewed 5 minutes ago"), each reopening in the modal when selected.

**And** revisiting a recipe bumps it to the top instead of duplicating entries.

**Prerequisites:** Story 2.3

**Technical Notes:** Store history entries with ISO timestamps, compute human-readable labels, guard storage size, and expose a clear-history action for optional future work.

### Story 4.4: Provide persistence management and resilience safeguards

As a privacy-conscious user,
I want control over my saved data and assurance it remains consistent,
So that my device storage stays clean and synchronized.

**Acceptance Criteria:**
**Given** bookmarks and history are stored locally,
**When** I use a "Clear All Saved Data" control,
**Then** bookmarks and history reset gracefully, the UI updates immediately, and confirmation messaging prevents accidental data loss.

**And** corrupted storage entries are detected and self-healed on load without crashing the app.

**Prerequisites:** Stories 4.1 and 4.3

**Technical Notes:** Wrap storage access in try/catch, validate parsed payloads against TypeScript guards, and emit analytics events (console stubs) for telemetry readiness.

---

## Epic 5: Theming, Accessibility & Performance Polish

Finalize experience quality by meeting theming, accessibility, and performance success criteria outlined in the PRD.

### Story 5.1: Implement light/dark theme toggle with persistence

As a user cooking in different environments,
I want to switch between light and dark themes,
So that the interface remains comfortable regardless of lighting.

**Acceptance Criteria:**
**Given** the theme toggle in the header,
**When** I switch between sun and moon icons,
**Then** the entire UI updates instantly, persists my preference in localStorage, and respects system preference on first load.

**And** theme transitions avoid flashes of unstyled content.

**Prerequisites:** Story 1.2

**Technical Notes:** Use `next-themes` `ThemeProvider`, ensure Tailwind classes cover all components, and animate transitions with CSS variables for smoothness.

### Story 5.2: Achieve accessibility and keyboard compliance

As an accessibility-conscious user,
I want the app to be fully navigable via keyboard and screen readers,
So that everyone can discover recipes equitably.

**Acceptance Criteria:**
**Given** I navigate using only the keyboard or a screen reader,
**When** I tab through controls, open modals, toggle favorites, or clear filters,
**Then** focus states are visible, ARIA labels describe icons, modals trap focus, and ESC returns focus to the trigger element.

**And** a Lighthouse accessibility audit scores ≥90 with no critical issues.

**Prerequisites:** Stories 2.3 and 4.1

**Technical Notes:** Add semantic landmarks (`header`, `main`), ensure color contrast with Tailwind tokens, and test with VoiceOver on macOS.

### Story 5.3: Optimize perceived performance and stability

As a performance-minded product owner,
I want the experience to feel instantaneous and reliable,
So that users stay engaged and the app meets success metrics.

**Acceptance Criteria:**
**Given** the defined performance targets (FCP <1.5s, LCP <2.5s, TTI <3.5s),
**When** I run Lighthouse in performance mode and simulate Slow 3G,
**Then** the scores meet or exceed targets thanks to lazy loading, memoized components, and minimal bundle size.

**And** search requests are debounced, in-flight fetches are cancelled on new queries, and repeated API calls are cached for the session.

**Prerequisites:** Stories 2.1, 2.2, and 3.2

**Technical Notes:** Introduce `React.memo` where warranted, leverage Next.js image optimization, and consider SWR or React Query only if it reduces custom caching complexity.

### Story 5.4: Document release readiness and QA checklist

As the scrum master preparing for handoff,
I want comprehensive documentation of the feature set, manual test plan, and known trade-offs,
So that downstream stakeholders (architecture, QA, reviewers) can execute efficiently.

**Acceptance Criteria:**
**Given** all functionality is implemented,
**When** I update `README.md` (or a dedicated `docs/testing.md`) with manual test cases, performance benchmarks, and future enhancement notes,
**Then** the team has a clear understanding of what shipped, residual risks, and how to validate the experience.

**And** bug tickets or follow-up stories are logged for any deferred work.

**Prerequisites:** Stories 5.1, 5.2, and 5.3

**Technical Notes:** Summarize AI/tool usage per challenge instructions, attach Lighthouse reports/screenshots, and capture accessibility audit outcomes.

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._
