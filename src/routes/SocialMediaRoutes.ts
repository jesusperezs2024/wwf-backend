import { Router } from 'express';
import { SocialMediaController } from '../controllers/SocialMediaController';

const router = Router();
const socialMediaController = new SocialMediaController();

// Obtener todas las redes sociales
router.get('/social-media', socialMediaController.getAllSocialMedia);

// Obtener una red social por su ID
router.get('/social-media/:id', socialMediaController.getSocialMediaById);

// Crear una nueva red social
router.post('/social-media', socialMediaController.createSocialMedia);

// Actualizar una red social existente
router.put('/social-media/:id', socialMediaController.updateSocialMedia);

// Eliminar una red social
router.delete('/social-media/:id', socialMediaController.deleteSocialMedia);

// Rutas comentadas en el controlador
// router.get('/social-media/name/:name', socialMediaController.getSocialMediaByName);
// router.get('/social-media/active', socialMediaController.getActiveSocialMedia);

export default router;