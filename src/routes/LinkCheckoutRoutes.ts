import { Router, Request, Response } from 'express';
import { LinkCheckoutController } from '../controllers/LinkCheckoutController';

const router = Router();
const linkCheckoutController = new LinkCheckoutController();

// Obtener todos los enlaces de checkout
router.get('/link-checkouts', (req: Request, res: Response) => {
  linkCheckoutController.getAll(req, res);
});

// Obtener un enlace de checkout por ID
router.get('/link-checkouts/:id', (req: Request, res: Response) => {
  linkCheckoutController.getById(req, res);
});

// Crear un nuevo enlace de checkout
router.post('/link-checkouts', (req: Request, res: Response) => {
  linkCheckoutController.create(req, res);
});

// Actualizar un enlace de checkout existente
router.put('/link-checkouts/:id', (req: Request, res: Response) => {
  linkCheckoutController.update(req, res);
});

// Eliminar un enlace de checkout
router.delete('/link-checkouts/:id', (req: Request, res: Response) => {
  linkCheckoutController.delete(req, res);
});

export default router;