import { inventoryService } from '../services/inventoryService.js';

export const inventoryController = {
  async getInventory(req, res, next) {
    try {
      const inventory = inventoryService.getInventory();
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  },

  async saveInventory(req, res, next) {
    try {
      const { items } = req.body;
      const inventory = inventoryService.saveInventory(items);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  },

  async resetInventory(req, res, next) {
    try {
      const inventory = inventoryService.resetInventory();
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  },
};
