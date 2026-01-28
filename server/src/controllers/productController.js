import { productService } from '../services/productService.js';

export const productController = {
  async getAll(req, res, next) {
    try {
      const products = productService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name } = req.body;
      const product = productService.createProduct(name);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { name: oldName } = req.params;
      const { name: newName } = req.body;
      const product = productService.updateProduct(oldName, newName);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { name } = req.params;
      const result = productService.deleteProduct(name);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
