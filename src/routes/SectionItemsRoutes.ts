import { Router } from 'express';
import { SectionItemsController } from '../controllers/SectionItemsController';

const router = Router();
const sectionItemsController = new SectionItemsController();

// Obtener todas las secciones de items
// Uso: /section-items?relations=true para obtener con relaciones
router.get('/section-items', sectionItemsController.getAllSectionItems);

// Obtener una sección de items por su ID
// Uso: /section-items/1?relations=true para obtener con relaciones
router.get('/section-items/:id', sectionItemsController.getSectionItemsById);

// Crear una nueva sección de items
router.post('/section-items', sectionItemsController.createSectionItems);

// Actualizar una sección de items existente
router.put('/section-items/:id', sectionItemsController.updateSectionItems);

// Eliminar una sección de items
router.delete('/section-items/:id', sectionItemsController.deleteSectionItems);

export default router;