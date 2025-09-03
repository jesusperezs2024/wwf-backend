import { Router } from 'express';
import SalesforceController from '../controllers/SalesforceController';

const router = Router();

// Rutas de autenticación

// Ruta de preparacion
router.post('/prepare', SalesforceController.prepareDonation);

// Ruta de actualizacion de formularios
router.post('/update', SalesforceController.updateDonation);

// Ruta de diagnóstico
router.get('/diagnostic', SalesforceController.diagnosticCheck);

// Rutas de autenticación
router.get('/token', SalesforceController.getToken);
router.post('/verify-token', SalesforceController.verifyToken);

// Rutas de formularios de donaciones
router.post('/donation-forms', SalesforceController.createDonationForm);
router.patch('/donation-forms/:id', SalesforceController.updateDonationForm);
router.get('/donation-forms/:id', SalesforceController.getDonationForm);

export default router;