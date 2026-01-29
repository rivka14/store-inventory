## Project Overview

**Store Inventory Management System** - A full-stack monorepo application for managing product inventory.

### Tech Stack
- **Frontend**: React 18 + TypeScript, Vite, TanStack Query, Zustand, React Hook Form, Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express (JavaScript), MongoDB with Mongoose
- **Testing**: Jest + Supertest (backend), Vitest + React Testing Library (frontend)

### Architecture
- Monorepo with npm workspaces (client/ and server/)
- RESTful API with layered architecture: Routes → Controllers → Services → Repositories
- MongoDB for persistent storage
- Feature-based component organization

### Key Features
- Product management (CRUD operations)
- Inventory tracking with quantities
- Client and server-side validation
- Real-time updates via TanStack Query
- Responsive design with warm, earthy UI theme

## Code Style

**No unnecessary comments** - Code should be self-documenting. Only add comments where logic isn't self-evident or for critical business rules.

## Git Workflow

### Commits
Use **Conventional Commits**: `<type>(<scope>): <subject>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Critical: Commit after completing each small feature or logical unit of work.**
- Don't wait for the entire feature to be complete
- Commit when a discrete piece of functionality is working
- Each commit should represent a complete, tested mini-feature

### Branches
**Always ask before naming the branch.**

Naming: `feature/`, `fix/`, `refactor/`, `docs/` + descriptive name

Branch from main unless working on dependent feature.

### Before Push
1. **Test your changes** - verify the feature works
2. **No console errors** - check browser/terminal for errors
3. **Update docs if needed** - reflect changes in documentation

### Before Commit
1. **Commit the completed feature** with descriptive conventional commit message
2. Run `unset GITHUB_TOKEN` before pushing to avoid authentication conflicts

### Pull Requests
**PR titles must follow Conventional Commits format**: `<type>(<scope>): <subject>`

Match the PR title to the main commit or overall change purpose.
