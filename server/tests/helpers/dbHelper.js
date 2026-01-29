import { connectDB, disconnectDB } from '../../src/db/index.js';
import { Product } from '../../src/db/models/Product.js';
import { Inventory } from '../../src/db/models/Inventory.js';

export const setupTestDB = async () => {
  await connectDB();
};

export const teardownTestDB = async () => {
  await disconnectDB();
};

export const clearDatabase = async () => {
  await Product.deleteMany({});
  await Inventory.deleteMany({});
};

export const seedProducts = async (products) => {
  return await Product.insertMany(products);
};

export const seedInventory = async (items) => {
  const inventory = new Inventory({ items });
  return await inventory.save();
};
