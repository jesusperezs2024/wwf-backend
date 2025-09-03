import { Router } from 'express';
import { TestimonySectionController } from '../controllers/TestimonySectionController';

const router = Router();
const testimonySectionController = new TestimonySectionController();

// Obtener todas las secciones de testimonios
// Uso: /testimony-sections?relations=true para obtener con relaciones
router.get('/testimony-sections', testimonySectionController.getAllTestimonySections);

// Obtener una sección de testimonios por su ID
// Uso: /testimony-sections/1?relations=true para obtener con relaciones
router.get('/testimony-sections/:id', testimonySectionController.getTestimonySectionById);

// Crear una nueva sección de testimonios
router.post('/testimony-sections', testimonySectionController.createTestimonySection);

// Actualizar una sección de testimonios existente
router.put('/testimony-sections/:id', testimonySectionController.updateTestimonySection);

// Eliminar una sección de testimonios
router.delete('/testimony-sections/:id', testimonySectionController.deleteTestimonySection);

// Rutas comentadas en el controlador
// router.get('/testimony-sections/title/:title', testimonySectionController.getTestimonySectionByTitle);
// router.get('/testimony-sections/active', testimonySectionController.getActiveTestimonySections);

export default router;