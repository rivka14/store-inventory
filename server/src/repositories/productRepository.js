import { Product } from '../db/index.js';

export const productRepository = {
  async getAll() {
    return await Product.find({}).select('-_id name').lean();
  },

  async create(name) {
    const product = new Product({ name });
    await product.save();
    return { name: product.name };
  },

  async update(oldName, newName) {
    const product = await Product.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true, runValidators: true }
    ).select('-_id name').lean();

    return product;
  },

  async delete(name) {
    const result = await Product.deleteOne({ name });
    return result.deletedCount > 0;
  },

  async exists(name) {
    const doc = await Product.findOne({ name }).select('_id').lean();
    return !!doc;
  },
};
