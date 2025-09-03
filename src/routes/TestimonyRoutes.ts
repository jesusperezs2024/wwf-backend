import { Router } from 'express';
import { TestimonyController } from '../controllers/TestimonyController';

const router = Router();
const testimonyController = new TestimonyController();

// Obtener todos los testimonios
router.get('/testimonies', testimonyController.getAllTestimonies);

// Obtener un testimonio por su ID
router.get('/testimonies/:id', testimonyController.getTestimonyById);

// Crear un nuevo testimonio
router.post('/testimonies', testimonyController.createTestimony);

// Actualizar un testimonio existente
router.put('/testimonies/:id', testimonyController.updateTestimony);

// Eliminar un testimonio
router.delete('/testimonies/:id', testimonyController.deleteTestimony);

// Rutas comentadas en el controlador
// router.get('/testimonies/author/:author', testimonyController.getTestimoniesByAuthor);
// router.get('/testimonies/active', testimonyController.getActiveTestimonies);
// router.patch('/testimonies/:id/toggle-active', testimonyController.toggleTestimonyActive);
// router.get('/testimonies/featured', testimonyController.getFeaturedTestimonies);

export default router;