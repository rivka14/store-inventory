import { productRepository } from '../repositories/productRepository.js';
import { inventoryRepository } from '../repositories/inventoryRepository.js';

export const productService = {
  getAllProducts() {
    return productRepository.getAll();
  },

  createProduct(name) {
    if (productRepository.exists(name)) {
      throw {
        statusCode: 400,
        message: 'product name already exists',
      };
    }
    return productRepository.create(name);
  },

  updateProduct(oldName, newName) {
    if (!productRepository.exists(oldName)) {
      throw {
        statusCode: 404,
        message: `Product "${oldName}" not found`,
      };
    }

    if (oldName !== newName && productRepository.exists(newName)) {
      throw {
        statusCode: 409,
        message: `Product with name "${newName}" already exists`,
      };
    }

    return productRepository.update(oldName, newName);
  },

  deleteProduct(name) {
    if (!productRepository.exists(name)) {
      throw {
        statusCode: 404,
        message: `Product "${name}" not found`,
      };
    }

    if (inventoryRepository.hasProduct(name)) {
      throw {
        statusCode: 400,
        message: `Cannot delete product "${name}" as it exists in inventory`,
      };
    }

    productRepository.delete(name);
    return { message: 'Product deleted successfully' };
  },
};
