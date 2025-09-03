import { Router } from 'express';
import { SectionFAQController } from '../controllers/SectionFAQController';

const router = Router();
const sectionFAQController = new SectionFAQController();

// Obtener todas las secciones de preguntas frecuentes (con opción de incluir relaciones)
// Uso: /section-faqs?relations=true para obtener con relaciones
router.get('/section-faqs', sectionFAQController.getAllSectionFAQs);

// Obtener una sección de preguntas frecuentes por su ID (con opción de incluir relaciones)
// Uso: /section-faqs/1?relations=true para obtener con relaciones
router.get('/section-faqs/:id', sectionFAQController.getSectionFAQById);

// Crear una nueva sección de preguntas frecuentes
router.post('/section-faqs', sectionFAQController.createSectionFAQ);

// Actualizar una sección de preguntas frecuentes existente
router.put('/section-faqs/:id', sectionFAQController.updateSectionFAQ);

// Eliminar una sección de preguntas frecuentes
router.delete('/section-faqs/:id', sectionFAQController.deleteSectionFAQ);

export default router;