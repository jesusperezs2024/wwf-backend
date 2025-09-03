import { Router } from 'express';
import { SpeciesController } from '../controllers/SpeciesController';

const router = Router();
const speciesController = new SpeciesController();

// Get all species
router.get('/', speciesController.getAllSpecies);

// Get count of species
router.get('/count/total', speciesController.countSpecies);

// Get species by name
router.get('/name/:name', speciesController.getSpeciesByName);
router.get('/search', speciesController.getSpeciesByName); // Alternate route using query parameter

// Create new species
router.post('/', speciesController.createSpecies);

// Save multiple species
router.post('/batch', speciesController.saveManySpecies);

// Get species by ID
router.get('/:id', speciesController.getSpeciesById);

// Update species
router.put('/:id', speciesController.updateSpecies);

// Delete species
router.delete('/:id', speciesController.deleteSpecies);

export default router;