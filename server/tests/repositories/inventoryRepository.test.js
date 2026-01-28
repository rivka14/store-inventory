import { inventoryRepository } from '../../src/repositories/inventoryRepository.js';

describe('Inventory Repository', () => {
  beforeEach(() => {
    inventoryRepository.reset();
  });

  describe('getAll', () => {
    it('should return empty array initially', () => {
      const inventory = inventoryRepository.getAll();
      expect(inventory).toEqual([]);
    });

    it('should return saved inventory', () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 2', quantity: 10 },
      ];
      inventoryRepository.save(items);
      const inventory = inventoryRepository.getAll();
      expect(inventory).toEqual(items);
    });
  });

  describe('save', () => {
    it('should save inventory items', () => {
      const items = [{ name: 'Product 1', quantity: 5 }];
      const result = inventoryRepository.save(items);
      expect(result).toEqual(items);
    });

    it('should replace existing inventory', () => {
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      const newItems = [{ name: 'Product 2', quantity: 10 }];
      inventoryRepository.save(newItems);
      const inventory = inventoryRepository.getAll();
      expect(inventory).toEqual(newItems);
    });
  });

  describe('reset', () => {
    it('should clear all inventory items', () => {
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      inventoryRepository.reset();
      const inventory = inventoryRepository.getAll();
      expect(inventory).toEqual([]);
    });
  });

  describe('hasProduct', () => {
    it('should return true if product exists in inventory', () => {
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      expect(inventoryRepository.hasProduct('Product 1')).toBe(true);
    });

    it('should return false if product does not exist in inventory', () => {
      inventoryRepository.save([{ name: 'Product 1', quantity: 5 }]);
      expect(inventoryRepository.hasProduct('Product 2')).toBe(false);
    });

    it('should return false for empty inventory', () => {
      expect(inventoryRepository.hasProduct('Product 1')).toBe(false);
    });
  });
});
