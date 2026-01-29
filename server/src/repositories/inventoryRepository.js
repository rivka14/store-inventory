import { Inventory } from '../db/index.js';

export const inventoryRepository = {
  async getAll() {
    const inventoryDocs = await Inventory.find()
      .select('productName quantity -_id')
      .lean();
    return inventoryDocs;
  },

  async save(items) {
    await Inventory.deleteMany({});

    if (!items || items.length === 0) {
      return [];
    }

    await Inventory.insertMany(items);
    return this.getAll();
  },

  async reset() {
    await Inventory.deleteMany({});
    return [];
  },

  async hasProduct(productName) {
    const doc = await Inventory.findOne({ productName })
      .select('_id')
      .lean();
    return !!doc;
  },
};
