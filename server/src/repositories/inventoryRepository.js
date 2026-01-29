import { Inventory } from '../db/index.js';

const getOrCreateInventory = async () => {
  let inventory = await Inventory.findOne();
  if (!inventory) {
    inventory = new Inventory({ items: [] });
    await inventory.save();
  }
  return inventory;
};

export const inventoryRepository = {
  async getAll() {
    const inventory = await getOrCreateInventory();
    return inventory.items;
  },

  async save(items) {
    let inventory = await getOrCreateInventory();
    inventory.items = items;
    await inventory.save();
    return inventory.items;
  },

  async reset() {
    let inventory = await getOrCreateInventory();
    inventory.items = [];
    await inventory.save();
    return inventory.items;
  },

  async hasProduct(productName) {
    const inventory = await getOrCreateInventory();
    return inventory.items.some(item => item.name === productName);
  },
};
