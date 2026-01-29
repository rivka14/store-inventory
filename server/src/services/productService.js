import { productRepository } from '../repositories/productRepository.js';
import { inventoryRepository } from '../repositories/inventoryRepository.js';

export const productService = {
  async getAllProducts() {
    return await productRepository.getAll();
  },

  async createProduct(name) {
    if (await productRepository.exists(name)) {
      throw {
        statusCode: 400,
        message: 'product name already exists',
      };
    }
    return await productRepository.create(name);
  },

  async updateProduct(oldName, newName) {
    if (!(await productRepository.exists(oldName))) {
      throw {
        statusCode: 404,
        message: `Product "${oldName}" not found`,
      };
    }

    if (oldName !== newName && (await productRepository.exists(newName))) {
      throw {
        statusCode: 409,
        message: `Product with name "${newName}" already exists`,
      };
    }

    return await productRepository.update(oldName, newName);
  },

  async deleteProduct(name) {
    if (!(await productRepository.exists(name))) {
      throw {
        statusCode: 404,
        message: `Product "${name}" not found`,
      };
    }

    if (await inventoryRepository.hasProduct(name)) {
      throw {
        statusCode: 400,
        message: `Cannot delete product "${name}" as it exists in inventory`,
      };
    }

    await productRepository.delete(name);
    return { message: 'Product deleted successfully' };
  },
};
