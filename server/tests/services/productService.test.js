import { productService } from '../../src/services/productService.js';
import { productRepository } from '../../src/repositories/productRepository.js';
import { inventoryRepository } from '../../src/repositories/inventoryRepository.js';

describe('Product Service', () => {
  beforeEach(() => {
    const allProducts = productRepository.getAll();
    allProducts.forEach(p => productRepository.delete(p.name));
    inventoryRepository.reset();
  });

  describe('getAllProducts', () => {
    it('should return all products', () => {
      productRepository.create('Product 1');
      productRepository.create('Product 2');
      const products = productService.getAllProducts();
      expect(products).toHaveLength(2);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', () => {
      const product = productService.createProduct('Test Product');
      expect(product).toEqual({ name: 'Test Product' });
    });

    it('should throw error if product already exists', () => {
      productService.createProduct('Test Product');
      expect(() => productService.createProduct('Test Product')).toThrow();
    });
  });

  describe('updateProduct', () => {
    it('should update product name', () => {
      productService.createProduct('Old Name');
      const updated = productService.updateProduct('Old Name', 'New Name');
      expect(updated).toEqual({ name: 'New Name' });
    });

    it('should throw error if product does not exist', () => {
      expect(() => productService.updateProduct('Non-existent', 'New Name')).toThrow();
    });

    it('should throw error if new name already exists', () => {
      productService.createProduct('Product 1');
      productService.createProduct('Product 2');
      expect(() => productService.updateProduct('Product 1', 'Product 2')).toThrow();
    });

    it('should allow updating product with same name', () => {
      productService.createProduct('Test Product');
      const updated = productService.updateProduct('Test Product', 'Test Product');
      expect(updated).toEqual({ name: 'Test Product' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', () => {
      productService.createProduct('Test Product');
      const result = productService.deleteProduct('Test Product');
      expect(result).toEqual({ message: 'Product deleted successfully' });
    });

    it('should throw error if product does not exist', () => {
      expect(() => productService.deleteProduct('Non-existent')).toThrow();
    });

    it('should throw error if product is in inventory', () => {
      productService.createProduct('Test Product');
      inventoryRepository.save([{ name: 'Test Product', quantity: 5 }]);
      expect(() => productService.deleteProduct('Test Product')).toThrow();
    });
  });
});
