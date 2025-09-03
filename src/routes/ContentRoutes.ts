import { Router } from 'express';
import { ContentController } from '../controllers/ContentController';

const router = Router();
const contentController = new ContentController();

// Get all contents
router.get('/', contentController.getAllContents);

// Get count of contents
router.get('/count/total', contentController.countContents);

// Get content by type (commented out as it's commented in the controller)
/*
router.get('/type/:type', contentController.getContentsByType);
router.get('/filter', contentController.getContentsByType); // Alternate route using query parameter
*/

// Create new content
router.post('/', contentController.createContent);

// Save multiple contents
router.post('/batch', contentController.saveManyContents);

// Get content by ID
router.get('/:id', contentController.getContentById);

// Update content
router.put('/:id', contentController.updateContent);

// Delete content
router.delete('/:id', contentController.deleteContent);

export default router;