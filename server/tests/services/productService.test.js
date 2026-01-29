import { productService } from '../../src/services/productService.js';
import { setupTestDB, clearDatabase, seedProducts, seedInventory } from '../helpers/dbHelper.js';

describe('Product Service', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      await seedProducts([{ name: 'Product 1' }, { name: 'Product 2' }]);
      const products = await productService.getAllProducts();
      expect(products).toHaveLength(2);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const product = await productService.createProduct('Test Product');
      expect(product).toEqual({ name: 'Test Product' });
    });

    it('should throw error if product already exists', async () => {
      await productService.createProduct('Test Product');
      await expect(productService.createProduct('Test Product')).rejects.toThrow();
    });
  });

  describe('updateProduct', () => {
    it('should update product name', async () => {
      await productService.createProduct('Old Name');
      const updated = await productService.updateProduct('Old Name', 'New Name');
      expect(updated).toEqual({ name: 'New Name' });
    });

    it('should throw error if product does not exist', async () => {
      await expect(productService.updateProduct('Non-existent', 'New Name')).rejects.toThrow();
    });

    it('should throw error if new name already exists', async () => {
      await productService.createProduct('Product 1');
      await productService.createProduct('Product 2');
      await expect(productService.updateProduct('Product 1', 'Product 2')).rejects.toThrow();
    });

    it('should allow updating product with same name', async () => {
      await productService.createProduct('Test Product');
      const updated = await productService.updateProduct('Test Product', 'Test Product');
      expect(updated).toEqual({ name: 'Test Product' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      await productService.createProduct('Test Product');
      const result = await productService.deleteProduct('Test Product');
      expect(result).toEqual({ message: 'Product deleted successfully' });
    });

    it('should throw error if product does not exist', async () => {
      await expect(productService.deleteProduct('Non-existent')).rejects.toThrow();
    });

    it('should throw error if product is in inventory', async () => {
      await productService.createProduct('Test Product');
      await seedInventory([{ name: 'Test Product', quantity: 5 }]);
      await expect(productService.deleteProduct('Test Product')).rejects.toThrow();
    });
  });
});
