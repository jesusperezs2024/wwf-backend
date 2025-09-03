import { Router } from 'express';
import { ShortUrlController } from '../controllers/ShortUrlController';

const router = Router();
const shortUrlController = new ShortUrlController();

// Obtener todas las URLs cortas
router.get('/short-urls', shortUrlController.getAllShortUrls);

// Obtener una URL corta por su ID
router.get('/short-urls/:id', shortUrlController.getShortUrlById);

// Crear una nueva URL corta
router.post('/short-urls', shortUrlController.createShortUrl);

// Actualizar una URL corta existente
router.put('/short-urls/:id', shortUrlController.updateShortUrl);

// Eliminar una URL corta
router.delete('/short-urls/:id', shortUrlController.deleteShortUrl);

// Rutas comentadas en el controlador
// router.get('/short-urls/code/:code', shortUrlController.getShortUrlByCode);
// router.get('/r/:code', shortUrlController.redirectToOriginalUrl);

export default router;