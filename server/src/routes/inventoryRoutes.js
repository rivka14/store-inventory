import express from 'express';
import { inventoryController } from '../controllers/inventoryController.js';
import { validateInventorySave } from '../middleware/validators/inventoryValidator.js';

const router = express.Router();

router.get('/', inventoryController.getInventory);
router.post('/', validateInventorySave, inventoryController.saveInventory);
router.post('/reset', inventoryController.resetInventory);

export default router;
