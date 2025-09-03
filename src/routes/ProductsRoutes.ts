import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';

const router = Router();
const productsController = new ProductsController();

// Obtener todos los productos
router.get('/', productsController.getAllProducts);

// Obtener todos los productos con sus relaciones
router.get('/relations', productsController.getAllWithRelations);

// Obtener la cantidad total de productos
router.get('/count', productsController.countProducts);

// Verificar si existe un producto
router.get('/:id/exists', productsController.productExists);

// Obtener un producto por su ID
router.get('/:id', productsController.getProductById);

// Obtener un producto por su ID con relaciones
router.get('/:id/relations', productsController.getProductWithRelations);

// Crear un nuevo producto
router.post('/', productsController.createProduct);

// Crear múltiples productos
router.post('/bulk', productsController.saveManyProducts);

// Actualizar un producto existente
router.put('/:id', productsController.updateProduct);

// Eliminar un producto
router.delete('/:id', productsController.deleteProduct);

// Rutas comentadas en el controlador
// router.get('/category/:categoryId', productsController.getProductsByCategory);
// router.get('/search', productsController.searchProducts);

export default router;