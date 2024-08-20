import express from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../Controller/itemController.js'; // Corrected file path
const router = express.Router();

// Route to get all items
router.get('/items', getAllItems);

// Route to get a single item by ID
router.get('/items/:id', getItemById);

// Route to create a new item
router.post('/items', createItem);

// Route to update an item by ID
router.put('/items/:id', updateItem);

// Route to delete an item by ID
router.delete('/items/:id', deleteItem);

export default router;
