import { Router, Request, Response } from 'express';
import { ItemsController } from '../controllers/ItemsController';

const router = Router();
const itemsController = new ItemsController();

// Obtener todos los items
router.get('/items', (req: Request, res: Response) => {
  itemsController.getAllItems(req, res);
});

// Obtener todos los items con sus relaciones
router.get('/items/relations', (req: Request, res: Response) => {
  itemsController.getAllWithRelations(req, res);
});

// Obtener la cantidad total de items
router.get('/items/count', (req: Request, res: Response) => {
  itemsController.countItems(req, res);
});

// Obtener un item por su ID
router.get('/items/:id', (req: Request, res: Response) => {
  itemsController.getItemById(req, res);
});

// Obtener un item con sus relaciones por ID
router.get('/items/:id/relations', (req: Request, res: Response) => {
  itemsController.getItemWithRelations(req, res);
});

// Crear un nuevo item
router.post('/items', (req: Request, res: Response) => {
  itemsController.createItem(req, res);
});

// Actualizar un item existente
router.put('/items/:id', (req: Request, res: Response) => {
  itemsController.updateItem(req, res);
});

// Eliminar un item
router.delete('/items/:id', (req: Request, res: Response) => {
  itemsController.deleteItem(req, res);
});

export default router;