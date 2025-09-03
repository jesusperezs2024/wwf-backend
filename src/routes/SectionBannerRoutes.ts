import { Router } from 'express';
import { SectionBannerController } from '../controllers/SectionBannerController';

const router = Router();
const sectionBannerController = new SectionBannerController();

// Obtener todas las secciones de banner
router.get('/section-banners', sectionBannerController.getAllSectionBanners);

// Obtener todas las secciones de banner con sus relaciones
router.get('/section-banners/relations', sectionBannerController.getAllWithRelations);

// Obtener la cantidad total de secciones de banner
router.get('/section-banners/count', sectionBannerController.countSectionBanners);

// Verificar si existe una sección de banner
router.get('/section-banners/:id/exists', sectionBannerController.sectionBannerExists);

// Obtener una sección de banner por su ID
router.get('/section-banners/:id', sectionBannerController.getSectionBannerById);

// Obtener una sección de banner por su ID con relaciones
router.get('/section-banners/:id/relations', sectionBannerController.getSectionBannerWithRelations);

// Crear una nueva sección de banner
router.post('/section-banners', sectionBannerController.createSectionBanner);

// Crear múltiples secciones de banner
router.post('/section-banners/bulk', sectionBannerController.saveManySectionBanners);

// Actualizar una sección de banner existente
router.put('/section-banners/:id', sectionBannerController.updateSectionBanner);

// Eliminar una sección de banner
router.delete('/section-banners/:id', sectionBannerController.deleteSectionBanner);

export default router;