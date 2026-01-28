import { inventoryRepository } from '../repositories/inventoryRepository.js';
import { productRepository } from '../repositories/productRepository.js';

export const inventoryService = {
  getInventory() {
    return inventoryRepository.getAll();
  },

  saveInventory(items) {
    if (!Array.isArray(items)) {
      throw {
        statusCode: 400,
        message: 'Inventory must be an array',
      };
    }

    for (const item of items) {
      if (!item.name || typeof item.name !== 'string') {
        throw {
          statusCode: 400,
          message: 'Each item must have a valid name',
        };
      }

      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw {
          statusCode: 400,
          message: `Item "${item.name}" must have a positive quantity`,
        };
      }

      if (!productRepository.exists(item.name)) {
        throw {
          statusCode: 400,
          message: `Product "${item.name}" does not exist`,
        };
      }
    }

    const names = items.map(item => item.name);
    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
      throw {
        statusCode: 400,
        message: 'Inventory contains duplicate products',
      };
    }

    return inventoryRepository.save(items);
  },

  resetInventory() {
    return inventoryRepository.reset();
  },
};
