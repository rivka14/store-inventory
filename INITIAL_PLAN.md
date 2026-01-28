# Full-Stack Store Inventory Management System

## Role & Context
You are a Senior Full-Stack Engineer. Develop a production-ready Inventory Management System. This is a real product—not a coding exercise. Prioritize clean architecture, maintainability, and professional code quality.

## Phase 0: Planning (CRITICAL)
**Do NOT start coding.** First, provide a detailed plan and wait for approval:
1. Project Structure: Complete monorepo tree view
2. Implementation Roadmap: Step-by-step sprint plan
3. Clarifying Questions: Any ambiguities identified

---

## Tech Stack

### Frontend
- React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui
- React Router v6, Zustand (global state), TanStack Query (server state)
- React Hook Form + Yup validation
- Vitest + React Testing Library

### Backend
- Node.js + Express (JavaScript)
- express-validator, Helmet, CORS, Morgan
- Jest + Supertest

### DevOps
- concurrently (single `npm run dev` command)
- Ports: Client 5173, Server 3001

---

## Functional Requirements

### 1. Inventory Page (`/`) - Main Dashboard
**UI Layout:**
- Top row: Product dropdown | Quantity input | [+] button
- Below dropdown: "new product" link → navigates to `/products`
- Items list: Shows all inventory items (name + quantity), each with delete option
- Bottom: [Save] button

**Features:**
- View all inventory items (name + quantity)
- Add item: Select from products dropdown, enter quantity (positive integer)
- Remove individual items from list
- Save: Sends entire inventory to server (POST /inventory)
- Reset: Clear all inventory (POST /inventory/reset)

**UX:** Loading states, toast notifications for success/error

### 2. Products Page (`/products`) - Full CRUD
**UI Layout:**
- Input field: Product name + [Save] button (for new products)
- Products list: All products with Edit/Delete actions
- Visual indicator for products currently in inventory

**Features:**
- **Create**: Add new product (unique name, required)
- **Read**: Display all products
- **Update**: Edit product name (inline or modal)
- **Delete**: Remove product (only if NOT in current inventory)

---

## API Specification

### Products - Full CRUD
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product/all` | Get all products |
| PUT | `/product` | Create new product |
| PATCH | `/product/:name` | Update product name |
| DELETE | `/product/:name` | Delete product (if not in inventory) |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/inventory` | Get current inventory |
| POST | `/inventory` | Replace entire inventory |
| POST | `/inventory/reset` | Clear all items (returns `[]`) |

### Error Responses
```json
// Products
{ "error": "product name already exists" }
{ "error": "invalid product, name is missing" }
{ "error": "product not found" }
{ "error": "cannot delete product that is in inventory" }

// Inventory
{ "error": "Some of the inventory items are missing in the products list" }
{ "error": "Some of the inventory items are missing attribute: \"name\" or \"quantity\"" }
```

---

## Architecture Requirements

### Backend (Layered)
```
server/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/    # In-memory, DB-ready pattern
│   ├── middleware/
│   ├── routes/
│   └── app.js
└── tests/
```

### Frontend
```
client/src/
├── components/
│   ├── ui/
│   ├── inventory/
│   └── products/
├── hooks/
├── lib/
├── pages/
├── schemas/
└── types/
```

---

## Quality Standards

- **Testing**: Backend >80%, Frontend >70% on critical paths
- **TypeScript**: Strict mode, no `any`
- **UX**: Loading states, toasts, form validation
- **Code**: ESLint + Prettier, DRY, SOLID

---

## Deliverables

1. Source Code: `/client` + `/server` monorepo
2. README.md: Setup and run instructions
3. ARCHITECTURE.md: Design decisions and patterns
4. Single command: `npm run dev`

---

## Current Implementation Status

### Backend API - ✅ COMPLETED
All endpoints implemented and tested:

**Products API:**
- ✅ GET `/product/all` - Returns array of all products
- ✅ PUT `/product` - Creates new product, returns all products (200 OK)
  - Validates name is required
  - Returns 400 with `{"error": "product name already exists"}` for duplicates
  - Returns 400 with `{"error": "invalid product, name is missing"}` for validation
- ✅ PATCH `/product/:name` - Updates product name
- ✅ DELETE `/product/:name` - Deletes product (blocks if in inventory)

**Inventory API:**
- ✅ GET `/inventory` - Returns array of inventory items
- ✅ POST `/inventory` - Accepts direct array `[{name, quantity}]`
  - Validates all products exist
  - Returns 400 with `{"error": "Some of the inventory items are missing in the products list"}`
  - Returns 400 with `{"error": "Some of the inventory items are missing attribute: \"name\" or \"quantity\""}`
- ✅ POST `/inventory/reset` - Clears inventory, returns empty array

**Architecture:**
- ✅ Layered structure: Controllers → Services → Repositories
- ✅ Input validation with express-validator
- ✅ Centralized error handling
- ✅ In-memory data storage (DB-ready pattern)

### Frontend - 🚧 IN PROGRESS
- ✅ Project setup with Vite, React, TypeScript, Tailwind CSS
- ✅ shadcn/ui integration and theme configuration
- ⏳ Inventory page implementation
- ⏳ Products page implementation
- ⏳ API integration with TanStack Query

---

**Present your Architecture Plan and Implementation Roadmap before writing any code.**