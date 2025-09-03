import { Router } from 'express';
import { HorizontalCardController } from '../controllers/HorizontalCardController';

// Creamos el router
const router = Router();

// Instanciamos el controlador
const horizontalCardController = new HorizontalCardController();

// Definimos las rutas usando los controladores como middleware
router.get('/horizontal-cards', horizontalCardController.getAllHorizontalCards);
router.get('/horizontal-cards/relations', horizontalCardController.getAllWithRelations);
router.get('/horizontal-cards/count', horizontalCardController.countHorizontalCards);
router.get('/horizontal-cards/:id', horizontalCardController.getHorizontalCardById);
router.get('/horizontal-cards/:id/relations', horizontalCardController.getHorizontalCardWithRelations);
router.post('/horizontal-cards', horizontalCardController.createHorizontalCard);
router.put('/horizontal-cards/:id', horizontalCardController.updateHorizontalCard);
router.delete('/horizontal-cards/:id', horizontalCardController.deleteHorizontalCard);

export default router;