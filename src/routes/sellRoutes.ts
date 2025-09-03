import { Router } from 'express';
import { SellController } from '../controllers/SellController';

const router = Router();
const sellController = new SellController();

// Obtener todas las ventas
// Uso: /sells?relations=true para obtener con relaciones
router.get('/sells', sellController.getAllSells);

// Obtener una venta por su ID
// Uso: /sells/1?relations=true para obtener con relaciones
router.get('/sells/:id', sellController.getSellById);

// Crear una nueva venta
router.post('/sells', sellController.createSell);

// Actualizar una venta existente
router.put('/sells/:id', sellController.updateSell);

// Eliminar una venta
router.delete('/sells/:id', sellController.deleteSell);

// Rutas comentadas en el controlador
// router.get('/sells/customer/:customerId', sellController.getSellsByCustomer);
// router.get('/sells/period', sellController.getSellsTotalByPeriod);

export default router;