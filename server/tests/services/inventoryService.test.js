import { inventoryService } from '../../src/services/inventoryService.js';
import { setupTestDB, clearDatabase, seedProducts, seedInventory } from '../helpers/dbHelper.js';

describe('Inventory Service', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('getInventory', () => {
    it('should return current inventory', async () => {
      await seedProducts([{ name: 'Product 1' }]);
      const inventory = await inventoryService.getInventory();
      expect(inventory).toEqual([]);
    });
  });

  describe('saveInventory', () => {
    beforeEach(async () => {
      await seedProducts([{ name: 'Product 1' }, { name: 'Product 2' }]);
    });

    it('should save valid inventory', async () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 2', quantity: 10 },
      ];
      const result = await inventoryService.saveInventory(items);
      expect(result).toEqual(items);
    });

    it('should throw error if items is not an array', async () => {
      await expect(inventoryService.saveInventory('not an array')).rejects.toThrow();
    });

    it('should throw error if item has no name', async () => {
      const items = [{ quantity: 5 }];
      await expect(inventoryService.saveInventory(items)).rejects.toThrow();
    });

    it('should throw error if item has invalid quantity', async () => {
      const items = [{ name: 'Product 1', quantity: 0 }];
      await expect(inventoryService.saveInventory(items)).rejects.toThrow();
    });

    it('should throw error if item quantity is not a number', async () => {
      const items = [{ name: 'Product 1', quantity: 'five' }];
      await expect(inventoryService.saveInventory(items)).rejects.toThrow();
    });

    it('should throw error if product does not exist', async () => {
      const items = [{ name: 'Non-existent', quantity: 5 }];
      await expect(inventoryService.saveInventory(items)).rejects.toThrow();
    });

    it('should throw error if inventory contains duplicate products', async () => {
      const items = [
        { name: 'Product 1', quantity: 5 },
        { name: 'Product 1', quantity: 10 },
      ];
      await expect(inventoryService.saveInventory(items)).rejects.toThrow();
    });
  });

  describe('resetInventory', () => {
    it('should clear all inventory items', async () => {
      await seedProducts([{ name: 'Product 1' }]);
      await seedInventory([{ name: 'Product 1', quantity: 5 }]);
      const result = await inventoryService.resetInventory();
      expect(result).toEqual([]);
    });
  });
});
