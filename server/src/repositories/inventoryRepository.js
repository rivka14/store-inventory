let inventory = [];

export const inventoryRepository = {
  getAll() {
    return [...inventory];
  },

  save(items) {
    inventory = [...items];
    return inventory;
  },

  reset() {
    inventory = [];
    return inventory;
  },

  hasProduct(productName) {
    return inventory.some(item => item.name === productName);
  },
};
