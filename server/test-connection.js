import 'dotenv/config';
import { connectDB, disconnectDB } from './src/db/index.js';

console.log('Testing MongoDB Atlas connection...');
console.log('Connection URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

try {
  await connectDB();
  console.log('✅ Successfully connected to MongoDB Atlas!');
  await disconnectDB();
  console.log('✅ Successfully disconnected');
  process.exit(0);
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  process.exit(1);
}
