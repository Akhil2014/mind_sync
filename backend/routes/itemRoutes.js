import express from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', protect, admin, createItem);
router.put('/:id', protect, admin, updateItem);
router.delete('/:id', protect, admin, deleteItem);

export default router;