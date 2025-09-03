import { Router } from 'express';
import { FAQController } from '../controllers/FAQController';

const router = Router();
const faqController = new FAQController();

// Obtener todas las FAQs
router.get('/faqs', (req, res) => faqController.getAllFAQs(req, res));

// Obtener todas las FAQs con sus relaciones
router.get('/faqs/relations', (req, res) => faqController.getAllWithRelations(req, res));

// Buscar FAQs por palabra clave
router.get('/faqs/search', (req, res) => faqController.searchFAQs(req, res));

// Obtener el conteo total de FAQs
router.get('/faqs/count', (req, res) => faqController.countFAQs(req, res));

// Obtener una FAQ por su ID
router.get('/faqs/:id', (req, res) => faqController.getFAQById(req, res));

// Crear una nueva FAQ
router.post('/faqs', (req, res) => faqController.createFAQ(req, res));

// Guardar múltiples FAQs
router.post('/faqs/bulk', (req, res) => faqController.saveManyFAQs(req, res));

// Actualizar una FAQ existente
router.put('/faqs/:id', (req, res) => faqController.updateFAQ(req, res));

// Eliminar una FAQ
router.delete('/faqs/:id', (req, res) => faqController.deleteFAQ(req, res));

export default router;