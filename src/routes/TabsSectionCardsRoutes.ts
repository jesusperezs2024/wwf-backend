import { Router } from 'express';
import { TabsSectionCardsController } from '../controllers/TabsSectionCardsController';

const router = Router();
const tabsSectionCardsController = new TabsSectionCardsController();

// Obtener todas las secciones de tabs con tarjetas
// Uso: /tabs-section-cards?relations=true para obtener con relaciones
router.get('/tabs-section-cards', tabsSectionCardsController.getAllTabsSectionCards);

// Obtener una sección de tabs con tarjetas por su ID
// Uso: /tabs-section-cards/1?relations=true para obtener con relaciones
router.get('/tabs-section-cards/:id', tabsSectionCardsController.getTabsSectionCardsById);

// Crear una nueva sección de tabs con tarjetas
router.post('/tabs-section-cards', tabsSectionCardsController.createTabsSectionCards);

// Actualizar una sección de tabs con tarjetas existente
router.put('/tabs-section-cards/:id', tabsSectionCardsController.updateTabsSectionCards);

// Eliminar una sección de tabs con tarjetas
router.delete('/tabs-section-cards/:id', tabsSectionCardsController.deleteTabsSectionCards);

export default router;