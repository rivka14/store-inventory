import { inventoryRepository } from '../repositories/inventoryRepository.js';
import { productRepository } from '../repositories/productRepository.js';
import { AppError } from '../utils/AppError.js';

export const inventoryService = {
  async getInventory() {
    const inventoryDocs = await inventoryRepository.getAll();
    return inventoryDocs.map(doc => ({
      name: doc.productName,
      quantity: doc.quantity
    }));
  },

  async saveInventory(items) {
    if (!Array.isArray(items)) {
      throw new AppError('Inventory must be an array', 400);
    }

    for (const item of items) {
      if (!item.name || typeof item.name !== 'string') {
        throw new AppError('Each item must have a valid name', 400);
      }

      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new AppError(`Item "${item.name}" must have a positive quantity`, 400);
      }

      if (!(await productRepository.exists(item.name))) {
        throw new AppError('Some of the inventory items are missing in the products list', 400);
      }
    }

    const names = items.map(item => item.name);
    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
      throw new AppError('Inventory contains duplicate products', 400);
    }

    const dbItems = items.map(item => ({
      productName: item.name,
      quantity: item.quantity
    }));

    const savedDocs = await inventoryRepository.save(dbItems);
    return savedDocs.map(doc => ({
      name: doc.productName,
      quantity: doc.quantity
    }));
  },

  async resetInventory() {
    await inventoryRepository.reset();
    return [];
  },
};
