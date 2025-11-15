# Recipe Discovery

A modern recipe discovery application built with Next.js 14, TypeScript, and TailwindCSS. This app helps hobbyist cooks discover new recipes, save favorites, and track their cooking journey.

## ✨ Features

### Core Discovery
- **Smart Search** - Debounced search with instant results from TheMealDB API
- **Category Filtering** - Browse recipes by cuisine type (Italian, Mexican, Thai, etc.)
- **Recipe Details** - Full ingredient lists, instructions, and cooking videos
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### Personalization
- **Favorites** - Bookmark recipes with persistent localStorage storage
- **View History** - Automatically tracks last 50 viewed recipes with timestamps
- **Three View Modes** - Switch between Discover, Favorites, and History

### User Experience
- **Dark Mode** - Toggle between light/dark themes with system preference detection
- **Loading States** - Skeleton cards and smooth image loading
- **Error Handling** - Graceful error states with retry functionality
- **Empty States** - Helpful messages when no results are found
- **Keyboard Navigation** - Full keyboard and screen reader support

## Use of AI tools

- Feel free to leverage Google and AI tools in this exercise, **and please submit alongside your code a short description of the outside resources you used, and how**
- Feel to also ask us any questions you need — we're here to help!

## Timing and Accommodations

You should aim to take **2 hours** working on this exercise challenge. Please also do not hesitate to reach out to discuss any Accommodations you may need.

## Searching recipes

In order to query and render recipes in our application, we'll use the MealDB API.

### Docs

See docs for the API here: [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php).

### Base URL

```
https://www.themealdb.com/api/json/v1/1
```

### Endpoints

- Search recipes by name: `GET /search.php?s={query}`
- Get all recipes (empty search): `GET /search.php?s=`
- Get recipe by ID: `GET /lookup.php?i={id}`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (using Volta with Node 25.1.0)

### Installation

```bash
# Install dependencies
npm install install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.5
- **Styling**: TailwindCSS 3.4
- **State Management**: React Query (@tanstack/react-query)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react
- **Theming**: next-themes

### Project Structure
```
app/                    # Next.js app router pages
  layout.tsx           # Root layout with providers
  page.tsx             # Main application page
  providers.tsx        # React Query + Theme providers
components/
  favorites/           # Favorites view
  feedback/            # Loading, error, empty states
  filters/             # Category filters
  history/             # View history
  navigation/          # View switcher
  recipe/              # Recipe card, grid, modal
  search/              # Search bar
  theme/               # Theme toggle
  ui/                  # shadcn/ui components
lib/
  api.ts              # MealDB API client
  constants.ts        # App constants
  hooks/              # Custom React hooks
  utils.ts            # Utility functions
types/
  recipe.ts           # TypeScript interfaces
```

## 📖 API Reference

### TheMealDB API
Base URL: `https://www.themealdb.com/api/json/v1/1`

**Endpoints:**
- Search recipes: `GET /search.php?s={query}`
- Get categories: `GET /categories.php`
- Filter by category: `GET /filter.php?c={category}`
- Get recipe by ID: `GET /lookup.php?i={id}`

## 🧪 Testing Checklist

### Functional Tests
- [ ] Search returns relevant recipes
- [ ] Category filters update results
- [ ] Recipe modal opens with full details
- [ ] Bookmarks persist across page refreshes
- [ ] History tracks viewed recipes (max 50)
- [ ] Clear history removes all entries
- [ ] Theme toggle switches between light/dark
- [ ] All views (Discover/Favorites/History) work correctly

### Performance
- [ ] Images lazy load properly
- [ ] Search is debounced (300ms)
- [ ] No unnecessary re-renders
- [ ] Fast initial page load (<2s LCP target)

### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Screen reader labels on all interactive elements
- [ ] Focus visible on all controls
- [ ] Modal traps focus when open
- [ ] Color contrast meets WCAG AA standards

### Responsive Design
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scroll on any viewport

## 🛠️ Development Tools Used

### AI Assistance
This project was built with assistance from **GitHub Copilot with Claude Sonnet 4** following the **[BMad (Breakthrough Method for Agile Ai Driven Development)](https://github.com/bmad-code-org/BMAD-METHOD)** workflow:
1. **Discovery Phase**: Analyzed PRD requirements
2. **Planning Phase**: Created epic breakdown (5 epics, 20 stories)
3. **Architecture Phase**: Defined tech stack and patterns
4. **Implementation Phase**: Built features iteratively

### Key Tools
- **shadcn/ui CLI** for component scaffolding
- **React Query DevTools** for state debugging
- **Lighthouse** for performance/accessibility audits

## 📝 Implementation Notes

### Design Decisions
- **localStorage over backend**: Faster prototype, works offline
- **React Query**: Server state caching reduces API calls
- **shadcn/ui**: Accessible components without heavy dependencies

### Trade-offs
- No server-side filtering (limited by free API)
- No image optimization CDN (using Next.js built-in)
- Max 50 history entries (localStorage size limit)
- No user accounts (localStorage is device-specific)

### Future Enhancements
- Server-side search/filter with better performance
- Recipe ratings and reviews
- Meal planning calendar
- Shopping list generation
- Social sharing features

## 📄 License

MIT

