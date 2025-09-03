import { Router } from 'express';
import { SectionLargeItemsController } from '../controllers/SectionLargeItemsController';

const router = Router();
const sectionLargeItemsController = new SectionLargeItemsController();

// Obtener todas las secciones de items grandes
// Uso: /section-large-items?relations=true para obtener con relaciones
router.get('/section-large-items', sectionLargeItemsController.getAllSectionLargeItems);

// Obtener una sección de items grandes por su ID
// Uso: /section-large-items/1?relations=true para obtener con relaciones
router.get('/section-large-items/:id', sectionLargeItemsController.getSectionLargeItemsById);

// Crear una nueva sección de items grandes
router.post('/section-large-items', sectionLargeItemsController.createSectionLargeItems);

// Actualizar una sección de items grandes existente
router.put('/section-large-items/:id', sectionLargeItemsController.updateSectionLargeItems);

// Eliminar una sección de items grandes
router.delete('/section-large-items/:id', sectionLargeItemsController.deleteSectionLargeItems);

export default router;