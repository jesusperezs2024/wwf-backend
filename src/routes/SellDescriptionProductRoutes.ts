import { Router } from 'express';
import { SellDescriptionProductController } from '../controllers/SellDescriptionProductController';

const router = Router();
const sellDescriptionProductController = new SellDescriptionProductController();

// Obtener todas las descripciones de productos
// Uso: /sell-description-products?relations=true para obtener con relaciones
router.get('/sell-description-products', sellDescriptionProductController.getAllSellDescriptionProducts);

// Obtener una descripción de producto por su ID
// Uso: /sell-description-products/1?relations=true para obtener con relaciones
router.get('/sell-description-products/:id', sellDescriptionProductController.getSellDescriptionProductById);

// Crear una nueva descripción de producto
router.post('/sell-description-products', sellDescriptionProductController.createSellDescriptionProduct);

// Actualizar una descripción de producto existente
router.put('/sell-description-products/:id', sellDescriptionProductController.updateSellDescriptionProduct);

// Eliminar una descripción de producto
router.delete('/sell-description-products/:id', sellDescriptionProductController.deleteSellDescriptionProduct);

export default router;