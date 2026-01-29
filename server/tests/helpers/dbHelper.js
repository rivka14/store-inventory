import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../../src/db/index.js';
import { Product } from '../../src/db/models/Product.js';
import { Inventory } from '../../src/db/models/Inventory.js';

export const setupTestDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
};

export const teardownTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await disconnectDB();
  }
};

export const clearDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await Product.deleteMany({});
    await Inventory.deleteMany({});
  }
};

export const seedProducts = async (products) => {
  return await Product.insertMany(products);
};

export const seedInventory = async (items) => {
  const docs = items.map(item => ({
    productName: item.name,
    quantity: item.quantity
  }));
  return await Inventory.insertMany(docs);
};
