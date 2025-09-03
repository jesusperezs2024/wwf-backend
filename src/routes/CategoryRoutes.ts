import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();
const categoryController = new CategoryController();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get count of categories
router.get('/count/total', categoryController.countCategories);

// Get categories by name
router.get('/name/:name', categoryController.getCategoriesByName);
router.get('/search', categoryController.getCategoriesByName); // Alternate route using query parameter

// Create new category
router.post('/', categoryController.createCategory);

// Save multiple categories
router.post('/batch', categoryController.saveManyCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById);

// Update category
router.put('/:id', categoryController.updateCategory);

// Delete category
router.delete('/:id', categoryController.deleteCategory);

export default router;