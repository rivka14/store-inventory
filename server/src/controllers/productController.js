import { productService } from '../services/productService.js';

export const productController = {
  async getAll(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name } = req.body;
      await productService.createProduct(name);
      const allProducts = await productService.getAllProducts();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { name: oldName } = req.params;
      const { name: newName } = req.body;
      const product = await productService.updateProduct(oldName, newName);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { name } = req.params;
      const result = await productService.deleteProduct(name);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
