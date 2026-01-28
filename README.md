# Store Inventory Management System

A full-stack inventory management application with React 18 + TypeScript frontend and Node.js + Express backend.

## Features

- **Product Management**: Create, update, and delete products
- **Inventory Tracking**: Add products to inventory with quantities
- **Data Validation**: Client and server-side validation
- **Real-time Updates**: Automatic UI updates via TanStack Query
- **State Management**: Zustand for local inventory state
- **Responsive Design**: Warm, earthy UI with Tailwind CSS and shadcn/ui

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TanStack Query for data fetching
- Zustand for state management
- React Hook Form + Yup for form validation
- Tailwind CSS + shadcn/ui for styling
- React Router for navigation

### Backend
- Node.js with Express
- In-memory data storage
- Express Validator for validation
- Helmet for security
- CORS enabled

### Testing
- Jest + Supertest for backend tests (>80% coverage)
- Vitest + React Testing Library for frontend tests

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd store-inventory
```

2. Install dependencies (installs both client and server):
```bash
npm install
```

### Development

Run client and server in **separate terminals**:

**Terminal 1 - Start the server:**
```bash
npm run dev:server
```
Server will run on http://localhost:3001

**Terminal 2 - Start the client:**
```bash
npm run dev:client
```
Client will run on http://localhost:5173

### Running Tests

Run all tests:
```bash
npm test
```

Run tests for specific workspace:
```bash
npm run test:client
npm run test:server
```

Run tests with coverage:
```bash
cd server && npm run test:coverage
cd client && npm run test:coverage
```

### Building for Production

Build both client and server:
```bash
npm run build
```

## API Endpoints

### Products
- `GET /product/all` - Get all products
- `PUT /product` - Create a product
- `PATCH /product/:name` - Update product name
- `DELETE /product/:name` - Delete product (only if not in inventory)

### Inventory
- `GET /inventory` - Get current inventory
- `POST /inventory` - Save/replace inventory
- `POST /inventory/reset` - Clear all inventory items

## Project Structure

```
store-inventory/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   ├── pages/          # Page components
│   │   ├── schemas/        # Validation schemas
│   │   ├── stores/         # Zustand stores
│   │   └── types/          # TypeScript types
│   └── ...
└── server/                 # Express backend
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── middleware/     # Custom middleware
    │   ├── repositories/   # Data layer
    │   ├── routes/         # API routes
    │   └── services/       # Business logic
    └── tests/             # Test files
```

## Development Guidelines

- Follow Conventional Commits for commit messages
- Commit after completing each logical unit of work
- No unnecessary comments - code should be self-documenting
- Run tests before pushing changes
- Check for console errors in browser and terminal

