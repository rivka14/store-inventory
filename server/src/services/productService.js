import { productRepository } from '../repositories/productRepository.js';
import { inventoryRepository } from '../repositories/inventoryRepository.js';
import { AppError } from '../utils/AppError.js';

export const productService = {
  async getAllProducts() {
    return await productRepository.getAll();
  },

  async createProduct(name) {
    if (await productRepository.exists(name)) {
      throw new AppError(`Product with name "${name}" already exists`, 400);
    }
    return await productRepository.create(name);
  },

  async updateProduct(oldName, newName) {
    if (!(await productRepository.exists(oldName))) {
      throw new AppError(`Product "${oldName}" not found`, 404);
    }

    if (oldName !== newName && (await productRepository.exists(newName))) {
      throw new AppError(`Product with name "${newName}" already exists`, 409);
    }

    return await productRepository.update(oldName, newName);
  },

  async deleteProduct(name) {
    if (!(await productRepository.exists(name))) {
      throw new AppError(`Product "${name}" not found`, 404);
    }

    if (await inventoryRepository.hasProduct(name)) {
      throw new AppError(`Cannot delete product "${name}" as it exists in inventory`, 400);
    }

    await productRepository.delete(name);
    return { message: 'Product deleted successfully' };
  },
};
