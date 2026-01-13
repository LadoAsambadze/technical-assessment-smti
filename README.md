# Inquiry Kanban Board - ERP System

A modern, full-stack Kanban board for managing B2B event inquiries through multiple workflow phases.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup Instructions

# 1. Clone the repository

git clone <repository-url>
cd technical-assessment

# 2. Install dependencies

npm install

# 3. Run the application (this will automatically set up the database, seed it, build, and start the server)

npm run start:full
The npm run start:full command will:

✅ Generate Prisma Client

✅ Push database schema (creates the database if it doesn’t exist)

✅ Seed with sample inquiries

✅ Build the Next.js application

✅ Start the production server

Visit http://localhost:3000 to see the application.

### Useful Commands

# View database in Prisma Studio

npm run db:studio

# Reset database (clear all data and reseed)

npm run db:reset

# Build for production

npm run build

# Start production server

npm start

## 📁 Project Structure

technical-assessment/
├── app/
│ ├── api/
│ │ └── inquiries/
│ │ ├── route.ts # GET all inquiries with filters
│ │ └── [id]/
│ │ └── route.ts # GET, PATCH individual inquiry
│ ├── layout.tsx # Root layout
│ └── page.tsx # Main page with Kanban board
├── components/
│ ├── inquiry/
│ │ ├── inquiry/
│ │ │ ├── inquiry-card.tsx # Individual inquiry card
│ │ │ ├── inquiry-detail-modal.tsx # Detail view modal
│ │ │ └── inquiry-filters.tsx # Filter panel
│ │ ├── kanban/
│ │ │ ├── kanban-board.tsx # Main board container
│ │ │ └── kanban-column.tsx # Individual column
│ │ └── ui-states/
│ │ ├── loading-state.tsx # Loading skeleton
│ │ ├── error-state.tsx # Error display
│ │ └── no-result-state.tsx # Empty state
│ └── layout/
│ ├── page-container.tsx # Main page wrapper
│ ├── page-header.tsx # Header component
│ └── page-footer.tsx # Footer component
├── lib/
│ ├── constants/
│ │ └── inquiry.constants.ts # Phase config, thresholds
│ ├── services/
│ │ └── inquiry.service.ts # API client functions
│ ├── types/
│ │ └── inquiry.types.ts # TypeScript interfaces
│ ├── utils/
│ │ ├── formatter.ts # Date/currency formatters
│ │ └── utils.ts # Utility functions
│ └── prisma.ts # Prisma client singleton
├── store/
│ └── inquiry.store.ts # Zustand state management
└── prisma/
└── schema.prisma # Database schema

## 🛠 Technology Stack

### Core Framework

- **Next.js 16** (App Router) - React framework with server/client components
- **React 19** - UI library
- **TypeScript** - Type safety

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Icon library

### Drag & Drop

- **@dnd-kit** - Modern, accessible drag-and-drop toolkit
  - `@dnd-kit/core` - Core drag-and-drop functionality
  - `@dnd-kit/sortable` - Sortable list utilities
  - `@dnd-kit/utilities` - Helper functions

### State Management

- **Zustand** - Lightweight state management
  - Chosen for simplicity and minimal boilerplate
  - No provider wrapper needed
  - Built-in DevTools support

### Database

- **Prisma** - Next-generation ORM
- **SQLite** - Relational database

### Utilities

- **date-fns** - Date manipulation and formatting
- **clsx** - Conditional className utility

## 🎯 Key Features

### 1. Kanban Board

- **4 workflow phases**: New → Sent to Hotels → Offers Received → Completed
- **Drag-and-drop** between columns with smooth animations
- **Column totals**: Count of inquiries and sum of potential values
- **Responsive design**: Works on mobile, tablet, and desktop

### 2. Inquiry Cards

- Compact view with essential information
- Visual indicator for high-value inquiries (>50K CHF)
- Relative date formatting ("2 days ago")
- Click to open detailed view

### 3. Advanced Filtering

- **Client name search** with 500ms debouncing
- **Date range picker** for event dates
- **Minimum value filter** for potential value
- **Active filter count** badge
- **Clear all** filters button

### 4. Detail Modal

- Full inquiry information display
- List of associated hotels
- Notes section
- Phase change dropdown (alternative to drag)
- Created/updated timestamps with relative dates
- Keyboard shortcut support (ESC to close)

### 5. State Management

- Centralized Zustand store
- Optimistic UI updates on phase changes
- Automatic refetch after updates
- Loading and error state handling

## 🔧 State Management Architecture

### Data Flow

1. User interacts with UI (drag card, change filter)
2. Action dispatched to Zustand store
3. Optimistic UI update (immediate feedback)
4. API call to backend
5. Success: Store updated with server response
6. Error: Rollback + error message displayed

## 🎨 UX Decisions

### Drag & Drop Experience

- **Visual feedback**: Cards have drag overlay, columns highlight on hover
- **Smooth animations**: 200ms transition for natural feel
- **Touch support**: Works on mobile devices
- **Keyboard accessible**: Tab navigation and Enter to interact

### Performance Optimizations

- **Debounced search**: 500ms delay prevents excessive API calls
- **Optimistic updates**: UI responds immediately while API processes
- **Selective re-renders**: Zustand subscriptions prevent unnecessary renders

### Responsive Behavior

- **Mobile**: Single column, stacked cards
- **Tablet**: 2-column grid
- **Desktop**: 4-column Kanban layout
- **Modal**: Scrollable on small screens

### Error Handling

- Network errors show user-friendly messages
- Failed updates automatically rollback
- Empty states guide users on next actions

## 📊 API Routes

### GET `/api/inquiries`

Fetch inquiries with optional filters

**Query Parameters:**

- `clientName` - Search by client or contact person (case-insensitive)
- `dateFrom` - Filter events after this date (ISO format)
- `dateTo` - Filter events before this date (ISO format)
- `minValue` - Filter inquiries with value >= this amount

**Response:**

```json
{
  "inquiries": [...],
  "total": 42
}
```

### PATCH `/api/inquiries/:id`

Update inquiry phase

**Body:**

```json
{
  "phase": "offers_received"
}
```

**Response:**

```json
{
  "inquiry": {...},
  "success": true
}
```

## 🚧 What I Would Improve With More Time

### Features

1. **Bulk operations**: Select multiple inquiries and move them together
2. **Real-time updates**: WebSocket support for multi-user collaboration
3. **Advanced search**: Full-text search with fuzzy matching
4. **Export functionality**: Export filtered results to CSV/Excel
5. **Undo/Redo**: Action history with keyboard shortcuts
6. **Comments system**: Add comments/notes to inquiries
7. **Email integration**: Send inquiry details directly to hotels

### Technical Improvements

1. **Testing**: Unit tests (Jest), integration tests (Playwright)
2. **Performance**: Virtual scrolling for large datasets
3. **Caching**: React Query for better cache management
4. **Optimistic locking**: Handle concurrent updates
5. **Database indexes**: Optimize query performance
6. **API pagination**: Handle 1000+ inquiries efficiently
7. **Error boundary**: Graceful error recovery

### UX Enhancements

1. **Keyboard shortcuts**: Quick actions (J/K navigation, CMD+K search)
2. **Animations**: More polished micro-interactions
3. **Themes**: Dark mode support
4. **Customization**: User preferences for column order, default filters
5. **Tour/onboarding**: First-time user guide

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Drag inquiry between all phases
- [ ] Filter by client name
- [ ] Filter by date range
- [ ] Filter by minimum value
- [ ] Combine multiple filters
- [ ] Clear all filters
- [ ] Open inquiry detail modal
- [ ] Change phase via dropdown in modal
- [ ] Test on mobile device
- [ ] Test keyboard navigation

## 📝 Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/inquiry_db"
# or for SQLite
DATABASE_URL="file:./dev.db"
```

## 🤝 Contributing

This is a technical assessment project, but feedback is welcome!

## 📄 License

Private project for technical assessment purposes.

---

**Built with ❤️ for smti ERP System**
