import { Router } from 'express';
import { ProductsGeneralController } from '../controllers/ProductsGeneralController';

const router = Router();
const productsGeneralController = new ProductsGeneralController();

// Obtener todos los productos generales
router.get('/products-general', productsGeneralController.getAllProductsGeneral);

// Obtener la cantidad total de productos generales
router.get('/products-general/count', productsGeneralController.countProductsGeneral);

// Verificar si existe un producto general
router.get('/products-general/:id/exists', productsGeneralController.productGeneralExists);

// Obtener un producto general por su ID
router.get('/products-general/:id', productsGeneralController.getProductGeneralById);

// Crear un nuevo producto general
router.post('/products-general', productsGeneralController.createProductGeneral);

// Crear múltiples productos generales
router.post('/products-general/bulk', productsGeneralController.saveManyProductsGeneral);

// Actualizar un producto general existente
router.put('/products-general/:id', productsGeneralController.updateProductGeneral);

// Eliminar un producto general
router.delete('/products-general/:id', productsGeneralController.deleteProductGeneral);

export default router;