# Client Guidelines

## Architecture

**React 18 + TypeScript** with functional components and hooks.

### Directory Structure
```
src/
├── components/     # React components
│   ├── ui/        # Base shadcn/ui components
│   ├── layout/    # App shell (Header, Layout)
│   ├── products/  # Product feature components
│   └── inventory/ # Inventory feature components
├── hooks/         # Custom React hooks
├── lib/           # Utilities (API client, utils)
├── pages/         # Page components
├── schemas/       # Yup validation schemas
├── stores/        # Zustand stores
├── types/         # TypeScript types/interfaces
└── main.tsx       # App entry point
```

## State Management Strategy

### Server State (TanStack Query)
- Products list
- Current inventory from server
- Automatic caching and refetching
- Cache invalidation on mutations

**When to use:**
- Data from API
- Needs caching
- Needs background updates

### Client State (Zustand)
- Local UI state before saving
- Temporary edits (e.g., inventory editing)
- Simple, global state

**When to use:**
- Local-only state
- Shared across components
- Not persisted to server immediately

### Form State (React Hook Form)
- Individual form inputs
- Validation errors
- Submission handling

**When to use:**
- Form inputs
- Field-level validation
- Form submission

## Component Patterns

### Feature Components
- Group by feature (products/, inventory/)
- Keep related components together
- Export from index for clean imports

### Composition
- Build complex UIs from small components
- Use children prop for flexibility
- Prefer composition over prop drilling

### TypeScript
- Define interfaces for all props
- Use type inference where obvious
- Avoid `any` - use `unknown` if needed

## Data Fetching

### TanStack Query Patterns
```typescript
// Queries
const { data, isLoading, error } = useQuery({
  queryKey: ['resource'],
  queryFn: fetchFunction
});

// Mutations
const mutation = useMutation({
  mutationFn: updateFunction,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['resource'] });
  }
});
```

### Error Handling
- Display user-friendly error messages
- Use toast notifications for feedback
- Handle loading and error states in UI

## Forms

### React Hook Form + Yup
- Define Yup schemas matching backend validation
- Use `@hookform/resolvers/yup`
- Handle submission errors gracefully

### Validation Rules
- Product name: 1-100 characters, required
- Quantity: Positive integers only
- Match server-side validation exactly

## Styling

### Tailwind CSS + shadcn/ui
- Use Tailwind utility classes
- Customize via CSS variables in `index.css`
- Use shadcn/ui components as base

### Theme
- Warm, earthy color palette
- Colors defined in CSS variables
- Responsive design (mobile-first)

### Component Styling
- Use `cn()` utility for conditional classes
- Keep styles close to components
- Use semantic class names

## Routing

### React Router
- Define routes in `main.tsx`
- Use `<Link>` for navigation
- Page components in `pages/`

## API Integration

### Axios Client
- Centralized in `lib/api.ts`
- Base URL configured
- Response/error interceptors
- Proper error extraction

### API Endpoints

#### Products
- `GET /product/all` - Get all products
  - Response: `Array<{ name: string }>`
- `PUT /product` - Create product
  - Request: `{ name: string }`
  - Response: `Array<{ name: string }>`
- `PATCH /product/:name` - Update product name
  - Request: `{ name: string }`
  - Response: `{ name: string }`
- `DELETE /product/:name` - Delete product
  - Response: `{ message: string }`

#### Inventory
- `GET /inventory` - Get current inventory
  - Response: `Array<{ name: string, quantity: number }>`
- `POST /inventory` - Save/replace entire inventory
  - Request: `Array<{ name: string, quantity: number }>`
  - Response: `Array<{ name: string, quantity: number }>`
- `POST /inventory/reset` - Clear all inventory
  - Response: `[]`

## Testing

### Component Tests
- Test user interactions
- Test props and rendering
- Mock API calls
- Use React Testing Library

### Coverage Requirements
- Maintain >70% coverage on critical paths
- Focus on user workflows
- Test error states

### Test Files Location
- Colocate with components: `Component.test.tsx`
- Or in `__tests__/` directory

## Performance

### Optimization Strategies
- React Hook Form minimizes re-renders
- Zustand updates only subscribed components
- TanStack Query caches responses (30s stale time)
- Vite code splitting

### Best Practices
- Use `React.memo()` sparingly (only when measured)
- Avoid inline function definitions in JSX props
- Use `useCallback` for callbacks passed to children
- Use `useMemo` for expensive computations

## Development

### Running the Client
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing
```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # With coverage report
```

### Linting
```bash
npm run lint         # Run ESLint
```

## TypeScript

### Conventions
- Use `interface` for object shapes
- Use `type` for unions, intersections, utilities
- Export types from component files or `types/`
- Avoid type assertions unless necessary

### Common Types
- `Product`: Product data structure
- `InventoryItem`: Product with quantity
- API response types as needed

## Accessibility

- Use semantic HTML
- Include ARIA labels where needed
- Keyboard navigation support
- Focus management in modals
- shadcn/ui components are accessible by default
