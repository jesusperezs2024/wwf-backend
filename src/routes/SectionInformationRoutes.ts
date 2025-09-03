import { Router } from 'express';
import { SectionInformationController } from '../controllers/SectionInformationController';

const router = Router();
const sectionInformationController = new SectionInformationController();

// Obtener todas las secciones de información
// Uso: /section-information?relations=true para obtener con relaciones
router.get('/section-information', sectionInformationController.getAllSectionInformation);

// Obtener una sección de información por su ID
// Uso: /section-information/1?relations=true para obtener con relaciones
router.get('/section-information/:id', sectionInformationController.getSectionInformationById);

// Crear una nueva sección de información
router.post('/section-information', sectionInformationController.createSectionInformation);

// Actualizar una sección de información existente
router.put('/section-information/:id', sectionInformationController.updateSectionInformation);

// Eliminar una sección de información
router.delete('/section-information/:id', sectionInformationController.deleteSectionInformation);

export default router;