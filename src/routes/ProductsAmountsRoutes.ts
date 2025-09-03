import { Router } from 'express';
import { ProductsAmountsController } from '../controllers/ProductsAmountsController';

const router = Router();
const productsAmountsController = new ProductsAmountsController();

// Obtener todos los montos de productos
router.get('/products-amounts', productsAmountsController.getAllProductsAmounts);

// Obtener todos los montos de productos con sus relaciones
router.get('/products-amounts/relations', productsAmountsController.getAllWithRelations);

// Obtener la cantidad total de montos de productos
router.get('/products-amounts/count', productsAmountsController.countProductAmounts);

// Verificar si existe un monto de producto
router.get('/products-amounts/:id/exists', productsAmountsController.productAmountExists);

// Obtener un monto de producto por su ID
router.get('/products-amounts/:id', productsAmountsController.getProductAmountById);

// Crear un nuevo monto de producto
router.post('/products-amounts', productsAmountsController.createProductAmount);

// Crear múltiples montos de productos
router.post('/products-amounts/bulk', productsAmountsController.saveManyProductAmounts);

// Actualizar un monto de producto existente
router.put('/products-amounts/:id', productsAmountsController.updateProductAmount);

// Eliminar un monto de producto
router.delete('/products-amounts/:id', productsAmountsController.deleteProductAmount);

// Ruta comentada en el controlador
// router.get('/products-amounts/product/:productId', productsAmountsController.getProductAmountsByProductId);

export default router;