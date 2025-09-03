import { Router } from 'express';
import { LinkFooterController } from '../controllers/LinkFooterController';

const router = Router();
const linkFooterController = new LinkFooterController();

// Obtener todos los enlaces de footer
router.get('/link-footers', linkFooterController.getAllLinkFooters);

// Obtener un enlace de footer por ID
router.get('/link-footers/:id', linkFooterController.getLinkFooterById);

// Crear un nuevo enlace de footer
router.post('/link-footers', linkFooterController.createLinkFooter);

// Actualizar un enlace de footer existente
router.put('/link-footers/:id', linkFooterController.updateLinkFooter);

// Eliminar un enlace de footer
router.delete('/link-footers/:id', linkFooterController.deleteLinkFooter);
 
// router.get('/link-footers/category/:category', linkFooterController.getLinkFootersByCategory);
// router.get('/link-footers/active', linkFooterController.getActiveLinkFooters);

export default router;