import { Router } from 'express';
import { SectionHorizontalCardController } from '../controllers/SectionHorizontalCardController';

const router = Router();
const sectionHorizontalCardController = new SectionHorizontalCardController();

// Obtener todas las secciones de tarjetas horizontales
// Uso: /section-horizontal-cards?relations=true para obtener con relaciones
router.get('/section-horizontal-cards', sectionHorizontalCardController.getAllSectionHorizontalCards);

// Obtener una sección de tarjetas horizontales por su ID
// Uso: /section-horizontal-cards/1?relations=true para obtener con relaciones
router.get('/section-horizontal-cards/:id', sectionHorizontalCardController.getSectionHorizontalCardById);

// Crear una nueva sección de tarjetas horizontales
router.post('/section-horizontal-cards', sectionHorizontalCardController.createSectionHorizontalCard);

// Actualizar una sección de tarjetas horizontales existente
router.put('/section-horizontal-cards/:id', sectionHorizontalCardController.updateSectionHorizontalCard);

// Eliminar una sección de tarjetas horizontales
router.delete('/section-horizontal-cards/:id', sectionHorizontalCardController.deleteSectionHorizontalCard);

export default router;