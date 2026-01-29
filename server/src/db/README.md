# MongoDB Implementation

## Best Practices Implemented

### 1. Connection Management
- **Connection Pooling**: Reusable singleton connection pattern
- **Connection Events**: Monitoring all connection states (connected, disconnected, error, reconnected)
- **Graceful Shutdown**: Proper cleanup on server termination
- **Environment Configuration**: Externalized connection strings via .env

### 2. Schema Design
- **Validation**: Built-in Mongoose validators for data integrity
- **Indexing**: Optimized queries with strategic indexes
- **Error Handling**: Custom error messages for duplicate keys and validation failures
- **Timestamps**: Automatic createdAt/updatedAt tracking
- **Lean Queries**: Using .lean() for better performance when mongoose documents aren't needed

### 3. Error Handling
- **Duplicate Key Errors**: Mongoose middleware catches MongoServerError code 11000
- **Validation Errors**: Custom error messages with field-level validation
- **Connection Errors**: Graceful error handling with retry logic

### 4. Production Ready
- **Write Concern**: w: 'majority' for data durability
- **Retry Writes**: Automatic retry on transient failures
- **Server Selection Timeout**: 5-second timeout for connection attempts

## File Structure

```
db/
├── connection.js       # MongoDB connection singleton with event handlers
├── models/
│   ├── Product.js     # Product schema with unique name constraint
│   └── Inventory.js   # Inventory schema with item validation
├── index.js           # Public API exports
└── README.md          # This file
```

## Usage

### Connecting to MongoDB

```javascript
import { connectDB } from './db/index.js';
await connectDB();
```

### Using Models

```javascript
import { Product, Inventory } from './db/index.js';

const product = new Product({ name: 'Example' });
await product.save();

const products = await Product.find({}).lean();
```

### Environment Variables

Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/store-inventory
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

## Testing

Test helpers are available in `tests/helpers/dbHelper.js`:

```javascript
import { setupTestDB, teardownTestDB, clearDatabase } from './helpers/dbHelper.js';

beforeAll(async () => await setupTestDB());
afterAll(async () => await teardownTestDB());
beforeEach(async () => await clearDatabase());
```
