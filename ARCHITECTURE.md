# Architecture Documentation

## Overview

This is a monorepo-based full-stack application using npm workspaces. The architecture follows a clear separation between frontend and backend with well-defined layers.

## Design Decisions

### Monorepo Structure

**Decision**: Use npm workspaces instead of separate repositories

**Rationale**:
- Simplified development workflow (single `npm run dev` command)
- Shared tooling configuration
- Easier dependency management
- Better for small to medium-sized projects

### Backend Architecture

#### Technology Choices

**Node.js + Express (JavaScript, not TypeScript)**
- Faster initial setup without build step
- ES modules for modern JavaScript features
- Suitable for the project's complexity level

**MongoDB with Mongoose**
- Persistent data storage with document-based structure
- Schema validation at database level
- Efficient queries with indexes
- Production-ready storage solution

#### Layered Architecture

```
Routes → Controllers → Services → Repositories
```

**Repositories**: Data access layer
- Encapsulates MongoDB operations via Mongoose
- CRUD operations with lean queries for performance
- Abstraction layer for data persistence

**Services**: Business logic layer
- Validation rules (uniqueness, inventory checks)
- Error handling with appropriate status codes
- Independent of HTTP concerns

**Controllers**: HTTP handling layer
- Request/response transformation
- Thin layer that delegates to services
- Error propagation to middleware

**Middleware**: Cross-cutting concerns
- Request validation (express-validator)
- Error handling (centralized)
- Security (helmet, CORS)

### Frontend Architecture

#### Technology Choices

**React 18 + TypeScript**
- Type safety for better development experience
- Modern React features (hooks, concurrent rendering)

**Vite**
- Fast development server with HMR
- Efficient production builds
- Simple configuration

**TanStack Query**
- Automatic caching and background refetching
- Optimistic updates capability
- Eliminates need for global state for server data

**Zustand**
- Lightweight state management for local UI state
- Used only for inventory editing (client-side state before save)
- Simple API without boilerplate

**React Hook Form + Yup**
- Performant form handling with minimal re-renders
- Schema-based validation matching backend rules
- Good TypeScript support

**shadcn/ui + Tailwind CSS**
- Component-based UI with full control
- Consistent design system through CSS variables
- Customizable and accessible components

#### Component Organization

```
components/
├── ui/              # Base shadcn/ui components
├── layout/          # App shell (Header, Layout)
├── products/        # Product feature components
└── inventory/       # Inventory feature components
```

**Feature-Based Organization**:
- Components grouped by feature
- Promotes cohesion and modularity
- Easy to locate related code

#### State Management Strategy

**Server State** (TanStack Query):
- Products list
- Current inventory from server
- Automatic cache invalidation on mutations

**Client State** (Zustand):
- Local inventory edits before saving
- Dirty flag for unsaved changes
- Reset on successful save

**Form State** (React Hook Form):
- Individual form inputs
- Validation errors
- Submission handling

### API Design

#### RESTful Principles

- Resource-based URLs (`/product`, `/inventory`)
- Appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Meaningful status codes (201 for creation, 409 for conflicts)

#### Validation Strategy

**Dual Validation**:
- Client-side: Immediate feedback, better UX
- Server-side: Security and data integrity

**Shared Rules**:
- Product name: 1-100 characters
- Quantity: Positive integers
- Business rules enforced in services

### Error Handling

#### Backend

- Service layer throws objects with `statusCode` and `message`
- Centralized error handler middleware formats responses
- Validation errors include detailed field-level messages

#### Frontend

- Axios interceptor extracts error messages
- Toast notifications for user feedback
- Form-level error display for validation

### Testing Strategy

#### Backend

**Unit Tests**:
- Repositories: Data operations
- Services: Business logic and validation

**Integration Tests**:
- Full API request/response cycle
- Real Express app, real routes
- Tests for success and error cases

**Coverage Target**: >80% on all metrics

#### Frontend

**Component Tests**:
- User interactions
- Props and state changes
- Form validation

**Page Tests**:
- Integration of multiple components
- Data fetching scenarios
- User workflows

**Coverage Target**: >70% on critical paths

### Security Considerations

- Helmet.js for security headers
- CORS configured for specific origin
- Input validation on all endpoints
- No SQL injection risk (in-memory storage)
- No sensitive data storage

### Performance Optimizations

**Frontend**:
- Query caching (30s stale time)
- Optimistic updates capability
- Code splitting via dynamic imports
- Minimal re-renders (React Hook Form, Zustand)

**Backend**:
- Lean queries for optimal MongoDB performance
- Indexed fields for faster lookups
- Lightweight middleware stack

### Scalability Considerations

**Current Limitations**:
- No authentication/authorization
- No pagination for large datasets
- Single server instance
- No horizontal scaling strategy

**Future Enhancements**:
- User authentication and role-based access control
- Pagination for large datasets
- Caching layer (Redis) for frequently accessed data
- Load balancing for horizontal scaling
- WebSocket for real-time inventory updates

### Development Workflow

1. Make changes in feature branch (or main for this project)
2. Run tests (`npm test`)
3. Verify in browser (no console errors)
4. Commit with conventional commit message
5. Push changes

### Deployment Considerations

**Development**:
- Run `npm run dev` for both services
- Vite proxy handles API requests

**Production**:
- Build client: `npm run build --workspace=client`
- Serve client static files from Express or CDN
- Run server: `npm start --workspace=server`
- Environment variables for configuration

## Trade-offs

### Chosen Approach vs Alternatives

**MongoDB vs SQL Database**:
- ✅ Flexible schema for evolving requirements
- ✅ Simple document structure matches API responses
- ✅ Good developer experience with Mongoose
- ❌ No complex joins or transactions
- ❌ Less strict data integrity guarantees

**JavaScript vs TypeScript (Backend)**:
- ✅ No build step, faster iteration
- ✅ Simpler for small projects
- ❌ No compile-time type checking
- ❌ Less IDE support

**Zustand vs Redux**:
- ✅ Less boilerplate
- ✅ Smaller bundle size
- ✅ Simpler API
- ❌ Fewer middleware options
- ❌ Smaller ecosystem

**shadcn/ui vs Material-UI**:
- ✅ Full component control
- ✅ Tailwind-based, more customizable
- ✅ Better tree-shaking
- ❌ Need to install components individually
- ❌ Smaller component library

## Conclusion

This architecture prioritizes:
- **Simplicity**: Easy to understand and modify
- **Separation of Concerns**: Clear boundaries between layers
- **Developer Experience**: Fast feedback loop, good tooling
- **Maintainability**: Well-organized, testable code

The choices made are appropriate for a project of this scope and can be evolved as requirements grow.
