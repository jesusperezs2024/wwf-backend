import { Router } from 'express';
import { TabsCardsController } from '../controllers/TabsCardsController';

const router = Router();
const tabsCardsController = new TabsCardsController();

// Obtener todos los tabs con tarjetas
// Uso: /tabs-cards?relations=true para obtener con relaciones
router.get('/tabs-cards', tabsCardsController.getAllTabsCards);

// Obtener un tab con tarjetas por su ID
// Uso: /tabs-cards/1?relations=true para obtener con relaciones
router.get('/tabs-cards/:id', tabsCardsController.getTabsCardsById);

// Crear un nuevo tab con tarjetas
router.post('/tabs-cards', tabsCardsController.createTabsCards);

// Actualizar un tab con tarjetas existente
router.put('/tabs-cards/:id', tabsCardsController.updateTabsCards);

// Eliminar un tab con tarjetas
router.delete('/tabs-cards/:id', tabsCardsController.deleteTabsCards);

export default router;