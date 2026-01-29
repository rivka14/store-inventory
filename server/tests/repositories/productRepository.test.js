import { productRepository } from '../../src/repositories/productRepository.js';
import { setupTestDB, clearDatabase } from '../helpers/dbHelper.js';

describe('Product Repository', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = await productRepository.create('Test Product');
      expect(product).toEqual({ name: 'Test Product' });
    });
  });

  describe('getAll', () => {
    it('should return empty array when no products exist', async () => {
      const products = await productRepository.getAll();
      expect(products).toEqual([]);
    });

    it('should return all products', async () => {
      await productRepository.create('Product 1');
      await productRepository.create('Product 2');
      const products = await productRepository.getAll();
      expect(products).toHaveLength(2);
    });
  });

  describe('exists', () => {
    it('should return true for existing product', async () => {
      await productRepository.create('Test Product');
      expect(await productRepository.exists('Test Product')).toBe(true);
    });

    it('should return false for non-existent product', async () => {
      expect(await productRepository.exists('Non-existent')).toBe(false);
    });
  });

  describe('update', () => {
    it('should update product name', async () => {
      await productRepository.create('Old Name');
      const updated = await productRepository.update('Old Name', 'New Name');
      expect(updated).toEqual({ name: 'New Name' });
      expect(await productRepository.exists('Old Name')).toBe(false);
      expect(await productRepository.exists('New Name')).toBe(true);
    });

    it('should return null for non-existent product', async () => {
      const result = await productRepository.update('Non-existent', 'New Name');
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete existing product', async () => {
      await productRepository.create('Test Product');
      const result = await productRepository.delete('Test Product');
      expect(result).toBe(true);
      expect(await productRepository.exists('Test Product')).toBe(false);
    });

    it('should return false for non-existent product', async () => {
      const result = await productRepository.delete('Non-existent');
      expect(result).toBe(false);
    });
  });
});
