import { Router, Request, Response } from 'express';
import { LargeItemsController } from '../controllers/LargeItemsController';

const router = Router();
const largeItemsController = new LargeItemsController();

// Obtener todos los items grandes
router.get('/large-items', (req: Request, res: Response) => {
  largeItemsController.getAllLargeItems(req, res);
});

// Obtener todos los items grandes con sus relaciones
router.get('/large-items/relations', (req: Request, res: Response) => {
  largeItemsController.getAllWithRelations(req, res);
});

// Obtener la cantidad total de items grandes
router.get('/large-items/count', (req: Request, res: Response) => {
  largeItemsController.countLargeItems(req, res);
});

// Obtener un item grande por su ID
router.get('/large-items/:id', (req: Request, res: Response) => {
  largeItemsController.getLargeItemById(req, res);
});

// Obtener un item grande con sus relaciones por ID
router.get('/large-items/:id/relations', (req: Request, res: Response) => {
  largeItemsController.getLargeItemWithRelations(req, res);
});

// Crear un nuevo item grande
router.post('/large-items', (req: Request, res: Response) => {
  largeItemsController.createLargeItem(req, res);
});

// Actualizar un item grande existente
router.put('/large-items/:id', (req: Request, res: Response) => {
  largeItemsController.updateLargeItem(req, res);
});

// Eliminar un item grande
router.delete('/large-items/:id', (req: Request, res: Response) => {
  largeItemsController.deleteLargeItem(req, res);
});

export default router;