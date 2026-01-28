import { productRepository } from '../../src/repositories/productRepository.js';

describe('Product Repository', () => {
  beforeEach(() => {
    const allProducts = productRepository.getAll();
    allProducts.forEach(p => productRepository.delete(p.name));
  });

  describe('create', () => {
    it('should create a new product', () => {
      const product = productRepository.create('Test Product');
      expect(product).toEqual({ name: 'Test Product' });
    });
  });

  describe('getAll', () => {
    it('should return empty array when no products exist', () => {
      const products = productRepository.getAll();
      expect(products).toEqual([]);
    });

    it('should return all products', () => {
      productRepository.create('Product 1');
      productRepository.create('Product 2');
      const products = productRepository.getAll();
      expect(products).toHaveLength(2);
    });
  });

  describe('getByName', () => {
    it('should return product by name', () => {
      productRepository.create('Test Product');
      const product = productRepository.getByName('Test Product');
      expect(product).toEqual({ name: 'Test Product' });
    });

    it('should return undefined for non-existent product', () => {
      const product = productRepository.getByName('Non-existent');
      expect(product).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update product name', () => {
      productRepository.create('Old Name');
      const updated = productRepository.update('Old Name', 'New Name');
      expect(updated).toEqual({ name: 'New Name' });
      expect(productRepository.exists('Old Name')).toBe(false);
      expect(productRepository.exists('New Name')).toBe(true);
    });

    it('should return null for non-existent product', () => {
      const result = productRepository.update('Non-existent', 'New Name');
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete existing product', () => {
      productRepository.create('Test Product');
      const result = productRepository.delete('Test Product');
      expect(result).toBe(true);
      expect(productRepository.exists('Test Product')).toBe(false);
    });

    it('should return false for non-existent product', () => {
      const result = productRepository.delete('Non-existent');
      expect(result).toBe(false);
    });
  });

  describe('exists', () => {
    it('should return true for existing product', () => {
      productRepository.create('Test Product');
      expect(productRepository.exists('Test Product')).toBe(true);
    });

    it('should return false for non-existent product', () => {
      expect(productRepository.exists('Non-existent')).toBe(false);
    });
  });
});
