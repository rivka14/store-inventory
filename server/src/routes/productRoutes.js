import express from 'express';
import { productController } from '../controllers/productController.js';
import {
  validateProductCreate,
  validateProductUpdate,
  validateProductDelete,
} from '../middleware/validators/productValidator.js';

const router = express.Router();

router.get('/all', productController.getAll);
router.put('/', validateProductCreate, productController.create);
router.patch('/:name', validateProductUpdate, productController.update);
router.delete('/:name', validateProductDelete, productController.delete);

export default router;
