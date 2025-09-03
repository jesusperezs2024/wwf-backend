import { Router } from 'express';
import { SectionCardsController } from '../controllers/SectionCardsController';

const router = Router();
const sectionCardsController = new SectionCardsController();

// Obtener todas las secciones de tarjetas (con opción de incluir relaciones)
// Uso: /section-cards?relations=true para obtener con relaciones
router.get('/section-cards', sectionCardsController.getAllSectionCards);

// Obtener una sección de tarjetas por su ID (con opción de incluir relaciones)
// Uso: /section-cards/1?relations=true para obtener con relaciones
router.get('/section-cards/:id', sectionCardsController.getSectionCardsById);

// Crear una nueva sección de tarjetas
router.post('/section-cards', sectionCardsController.createSectionCards);

// Actualizar una sección de tarjetas existente
router.put('/section-cards/:id', sectionCardsController.updateSectionCards);

// Eliminar una sección de tarjetas
router.delete('/section-cards/:id', sectionCardsController.deleteSectionCards);

export default router;