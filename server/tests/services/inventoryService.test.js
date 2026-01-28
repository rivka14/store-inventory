import { inventoryService } from '../../src/services/inventoryService.js';
import { productRepository } from '../../src/repositories/productRepository.js';
import { inventoryRepository } from '../../src/repositories/inventoryRepository.js';

describe('Inventory Service', () => {
  beforeEach(() => {
    const allProducts = productRepository.getAll();
    allProducts.forEach(p => productRepository.delete(p.name));
    inventoryRepository.reset();
  });

  describe('getInventory', () => {
    it('should return current inventory', () => {
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      const inventory = inventoryService.getInventory();
      expect(inventory).toEqual([{ name: 'Product 1', quantity: 5 }]);
    });
  });

  describe('saveInventory', () => {
    beforeEach(() => {
      productRepository.create('Product 1');
      productRepository.create('Product 2');
    });

    it('should save valid inventory', () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 2', quantity: 10 },
      ];
      const result = inventoryService.saveInventory(items);
      expect(result).toEqual(items);
    });

    it('should throw error if items is not an array', () => {
      expect(() => inventoryService.saveInventory('not an array')).toThrow();
    });

    it('should throw error if item has no name', () => {
      const items = [{ quantity: 5 }];
      expect(() => inventoryService.saveInventory(items)).toThrow();
    });

    it('should throw error if item has invalid quantity', () => {
      const items = [{ name: 'Product 1', quantity: 0 }];
      expect(() => inventoryService.saveInventory(items)).toThrow();
    });

    it('should throw error if item quantity is not a number', () => {
      const items = [{ name: 'Product 1', quantity: 'five' }];
      expect(() => inventoryService.saveInventory(items)).toThrow();
    });

    it('should throw error if product does not exist', () => {
      const items = [{ name: 'Non-existent', quantity: 5 }];
      expect(() => inventoryService.saveInventory(items)).toThrow();
    });

    it('should throw error if inventory contains duplicate products', () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 1', quantity: 10 },
      ];
      expect(() => inventoryService.saveInventory(items)).toThrow();
    });
  });

  describe('resetInventory', () => {
    it('should clear all inventory items', () => {
      productRepository.create('Product 1');
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      const result = inventoryService.resetInventory();
      expect(result).toEqual([]);
    });
  });
});
