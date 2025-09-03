import { Router } from 'express';
import { TabsController } from '../controllers/TabsController';

const router = Router();
const tabsController = new TabsController();

// Obtener todos los tabs
// Uso: /tabs?relations=true para obtener con relaciones
router.get('/tabs', tabsController.getAllTabs);

// Obtener un tab por su ID
// Uso: /tabs/1?relations=true para obtener con relaciones
router.get('/tabs/:id', tabsController.getTabsById);

// Crear un nuevo tab
router.post('/tabs', tabsController.createTabs);

// Actualizar un tab existente
router.put('/tabs/:id', tabsController.updateTabs);

// Eliminar un tab
router.delete('/tabs/:id', tabsController.deleteTabs);

export default router;