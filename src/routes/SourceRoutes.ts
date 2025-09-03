import { Router } from 'express';
import { SourceController } from '../controllers/SourceController';

const router = Router();
const sourceController = new SourceController();

// Obtener todas las fuentes
// Uso: /sources?relations=true para obtener con relaciones
router.get('/sources', sourceController.getAllSources);

// Obtener una fuente por su ID
router.get('/sources/:id', sourceController.getSourceById);

// Obtener una fuente por su nombre
router.get('/sources/name/:name', sourceController.getSourceByName);

// Crear una nueva fuente
router.post('/sources', sourceController.createSource);

// Actualizar una fuente existente
router.put('/sources/:id', sourceController.updateSource);

// Eliminar una fuente
router.delete('/sources/:id', sourceController.deleteSource);

export default router;