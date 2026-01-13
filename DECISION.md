# Technical Decisions & Rationale

This document explains the key technical decisions made during development of the Inquiry Kanban Board.

## 🎯 Drag-and-Drop Library Choice

### Decision: @dnd-kit

I chose **@dnd-kit** over alternatives like react-beautiful-dnd and react-dnd.

### Reasoning

#### Why @dnd-kit?

1. **Modern & Actively Maintained**

   - Released in 2020, actively developed
   - Built with modern React patterns (hooks-first)
   - Regular updates and bug fixes
   - Strong community support

2. **Accessibility First**

   - Built-in keyboard navigation (ARIA compliant)
   - Screen reader support out of the box
   - Focus management handled automatically
   - Meets WCAG 2.1 standards

3. **Performance**

   - Uses CSS transforms instead of repositioning
   - Minimal re-renders during drag operations
   - No layout thrashing
   - Smooth 60fps animations even with many items

4. **Flexibility**

   - Modular architecture - only import what you need
   - Works with any component structure
   - No forced styling or markup
   - Easy to customize behavior

5. **TypeScript Support**

   - Written in TypeScript
   - Excellent type definitions
   - Better IDE autocomplete and error checking

6. **Bundle Size**
   - Core: ~13KB gzipped
   - Tree-shakeable - unused code is eliminated
   - Smaller than react-beautiful-dnd (~32KB)

## 🏪 State Management Choice

### Decision: Zustand

### Reasoning

1. **Simplicity**

   - Minimal boilerplate compared to Redux
   - No provider wrappers needed
   - Just a hook-based API

2. **TypeScript Support**

   - Excellent type inference
   - Easy to type complex state shapes

3. **Performance**

   - Selective subscriptions prevent unnecessary re-renders
   - No context provider overhead
   - Fast updates

4. **Developer Experience**
   - DevTools integration
   - Easy to debug
   - Small learning curve

## 🎨 UI Component Library

### Decision: shadcn/ui

### Reasoning

1. **Copy-Paste Approach**

   - Components live in your codebase
   - Full customization without forking
   - No runtime dependency overhead

2. **Built on Radix UI**

   - Accessible by default
   - Unstyled primitives
   - Handles complex interactions

3. **Tailwind Integration**

   - Perfect integration with our styling approach
   - Consistent design tokens
   - Easy to customize

4. **Type Safety**
   - Full TypeScript support
   - Proper prop types

## 📅 Date Handling

### Decision: date-fns

### Reasoning

1. **Tree-Shakeable**

   - Only import functions you use
   - Much smaller than moment.js

2. **Immutable**

   - Functions return new dates
   - Prevents bugs from mutation

3. **Functional API**

   - Compose functions easily
   - Clean, readable code

4. **TypeScript Support**
   - Excellent types
   - Good IDE support

## 🗄 Database & ORM

### Decision: Prisma

### Reasoning

1. **Type Safety**

   - Generated types from schema
   - Catch errors at compile time
   - Better autocomplete

2. **Developer Experience**

   - Intuitive query API
   - Great error messages
   - Easy migrations

3. **Performance**
   - Efficient queries
   - Connection pooling
   - Query optimization

## 🎯 API Design

### Decision: Next.js API Routes

### Reasoning

1. **Colocation**

   - API and UI in same codebase
   - Shared types between frontend/backend
   - Faster development

2. **Server Components**

   - Can fetch data on server
   - Better performance
   - SEO-friendly if needed later

3. **Type Safety**
   - End-to-end TypeScript
   - Shared interfaces

## 🎭 Filter Implementation

### Decision: Debounced Search with URL Params

### Reasoning

1. **Debouncing (500ms)**

   ```typescript
   const debouncedSearch = debounce((value: string) => {
     setSearchText(value);
   }, 500);
   ```

   - Reduces API calls by ~90%
   - Better server performance
   - Smooth user experience

2. **URL Parameters** _(Future Enhancement)_

   - Shareable filtered views
   - Browser back/forward works
   - Preserves state on refresh

   Example: `/inquiries?client=Novartis&minValue=50000`

### Alternative Considered

- **Real-time search**: Too many API calls
- **Search button**: Worse UX, extra click required

---

## 🎨 Styling Approach

### Decision: Tailwind CSS

### Reasoning

1. **Utility-First**

   - Fast development
   - Consistent spacing/colors
   - No naming fatigue

2. **Performance**

   - Purges unused styles
   - Small production bundle
   - No runtime CSS-in-JS overhead

3. **Responsive Design**

   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
   ```

   - Mobile-first approach built in
   - Easy breakpoints

4. **Design Tokens**
   - Consistent design system
   - Easy to maintain
   - Theme customization

---
