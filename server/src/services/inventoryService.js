import { inventoryRepository } from '../repositories/inventoryRepository.js';
import { productRepository } from '../repositories/productRepository.js';

export const inventoryService = {
  async getInventory() {
    return await inventoryRepository.getAll();
  },

  async saveInventory(items) {
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

      if (!(await productRepository.exists(item.name))) {
        throw {
          statusCode: 400,
          message: 'Some of the inventory items are missing in the products list',
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

    return await inventoryRepository.save(items);
  },

  async resetInventory() {
    return await inventoryRepository.reset();
  },
};
