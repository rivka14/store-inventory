# Server Guidelines

## Architecture

**Layered Architecture**: Routes → Controllers → Services → Repositories

### Directory Structure
```
src/
├── db/             # Database connection and Mongoose models
│   ├── models/     # Mongoose schemas (Product, Inventory)
│   ├── connection.js
│   └── index.js
├── controllers/    # HTTP request/response handlers (thin layer)
├── middleware/     # Express middleware (validation, error handling)
├── repositories/   # Data access layer (MongoDB operations)
├── routes/         # API route definitions
├── services/       # Business logic and validation
├── utils/          # Utility classes (AppError)
├── app.js          # Express app configuration
└── server.js       # Server entry point with DB connection
```

### Layer Responsibilities

**Repositories** (Data Access)
- MongoDB CRUD operations
- Query building
- Lean queries for performance
- Error propagation

**Services** (Business Logic)
- Business rules and validation
- Complex operations
- Error handling with status codes
- Independent of HTTP concerns

**Controllers** (HTTP Layer)
- Request/response transformation
- Delegate to services
- Thin - no business logic
- Error propagation to middleware

**Middleware**
- Request validation (express-validator)
- Error handling (centralized)
- Security (helmet, CORS)

## MongoDB & Mongoose

**Connection**: Singleton pattern with pooling, graceful shutdown handling, event monitoring

**Schema Patterns**:
- Built-in validators at schema level
- Compound indexes for query optimization
- Use `lean()` for read-only operations (better performance)
- Handle duplicate key errors appropriately

## Error Handling

- Services throw objects with `statusCode` and `message`
- Centralized error middleware formats responses
- Use appropriate HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad request / Validation error
  - 404: Not found
  - 409: Conflict (duplicate, constraint violation)
  - 500: Server error

## API Design

### RESTful Conventions
- Resource-based URLs: `/product`, `/inventory`
- HTTP methods: GET (read), POST (create/save), PUT (create), PATCH (update), DELETE (remove)
- Plural for collections, singular for resources

### Request Validation
- Use express-validator middleware
- Validate all inputs
- Return detailed error messages for validation failures

### Response Format
Success responses return data directly:
```json
[{ "name": "product1" }]
```

Error format:
```json
{
  "error": "Error message",
  "details": [...] // Optional, for validation errors
}
```

### API Endpoints

#### Products (`/product`)
- **GET /product/all**
  - Response: `Array<{ name: string }>`
- **PUT /product**
  - Request: `{ name: string }`
  - Response: `Array<{ name: string }>` (all products)
  - Errors:
    - 400: `{ "error": "product name already exists" }`
    - 400: `{ "error": "invalid product, name is missing" }`
- **PATCH /product/:name**
  - Request: `{ name: string }`
  - Response: `{ name: string }`
- **DELETE /product/:name**
  - Response: `{ message: string }`

#### Inventory (`/inventory`)
- **GET /inventory**
  - Response: `Array<{ name: string, quantity: number }>`
- **POST /inventory**
  - Request: `Array<{ name: string, quantity: number }>` (array directly, not wrapped)
  - Response: `Array<{ name: string, quantity: number }>`
  - Errors:
    - 400: `{ "error": "Some of the inventory items are missing in the products list" }`
    - 400: `{ "error": "Some of the inventory items are missing attribute: \"name\" or \"quantity\"" }`
- **POST /inventory/reset**
  - Response: `[]`

## Testing

### Test Structure

**Integration Tests** (`tests/integration/`)
- Full API request/response cycle with real DB
- Test complete user workflows
- Use supertest for HTTP testing

**Service & Repository Tests** (`tests/services/`, `tests/repositories/`)
- Currently use real MongoDB test database
- Test business logic and data operations
- Future: Refactor to use mocks for true unit testing

### Coverage Requirements
- Maintain >80% coverage on all metrics
- Test both success and error cases
- Test validation rules
- Test business logic edge cases

### Test Files Location
- `tests/` directory at server root
- Mirror `src/` structure in tests

### Testing Best Practices
- Integration tests verify end-to-end functionality
- Service/repository tests verify logic correctness
- All tests use isolated test database
- Tests run serially to avoid conflicts (`maxWorkers: 1`)

## Environment Variables

Required variables in `.env`:
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: development | production
- `MONGODB_URI`: MongoDB connection string

## Running the Server

### Development
```bash
npm run dev          # Watch mode with auto-reload
```

### Production
```bash
npm start
```

### Testing
```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # With coverage report
```

## Security

- Helmet.js for security headers
- CORS configured for specific origins
- Input validation on all endpoints
- No sensitive data in logs
- Environment variables for secrets
