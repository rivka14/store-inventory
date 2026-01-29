import { inventoryRepository } from '../../src/repositories/inventoryRepository.js';
import { setupTestDB, clearDatabase } from '../helpers/dbHelper.js';

describe('Inventory Repository', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('getAll', () => {
    it('should return empty array initially', async () => {
      const inventory = await inventoryRepository.getAll();
      expect(inventory).toEqual([]);
    });

    it('should return saved inventory', async () => {
      const items = [
        { productName: 'Product 1', quantity: 5 },
        { productName: 'Product 2', quantity: 10 },
      ];
      await inventoryRepository.save(items);
      const inventory = await inventoryRepository.getAll();
      expect(inventory).toEqual(items);
    });
  });

  describe('save', () => {
    it('should save inventory items', async () => {
      const items = [{ productName: 'Product 1', quantity: 5 }];
      const result = await inventoryRepository.save(items);
      expect(result).toEqual(items);
    });

    it('should replace existing inventory', async () => {
      await inventoryRepository.save([{ productName: 'Product 1', quantity: 5 }]);
      const newItems = [{ productName: 'Product 2', quantity: 10 }];
      await inventoryRepository.save(newItems);
      const inventory = await inventoryRepository.getAll();
      expect(inventory).toEqual(newItems);
    });
  });

  describe('reset', () => {
    it('should clear all inventory items', async () => {
      await inventoryRepository.save([{ productName: 'Product 1', quantity: 5 }]);
      await inventoryRepository.reset();
      const inventory = await inventoryRepository.getAll();
      expect(inventory).toEqual([]);
    });
  });

  describe('hasProduct', () => {
    it('should return true if product exists in inventory', async () => {
      await inventoryRepository.save([{ productName: 'Product 1', quantity: 5 }]);
      expect(await inventoryRepository.hasProduct('Product 1')).toBe(true);
    });

    it('should return false if product does not exist in inventory', async () => {
      await inventoryRepository.save([{ productName: 'Product 1', quantity: 5 }]);
      expect(await inventoryRepository.hasProduct('Product 2')).toBe(false);
    });

    it('should return false for empty inventory', async () => {
      expect(await inventoryRepository.hasProduct('Product 1')).toBe(false);
    });
  });
});
