const products = new Map();

export const productRepository = {
  getAll() {
    return Array.from(products.values());
  },

  create(name) {
    products.set(name, { name });
    return { name };
  },

  update(oldName, newName) {
    const product = products.get(oldName);
    if (!product) return null;

    products.delete(oldName);
    products.set(newName, { name: newName });
    return { name: newName };
  },

  delete(name) {
    return products.delete(name);
  },

  exists(name) {
    return products.has(name);
  },
};
