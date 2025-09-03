import { Router } from 'express';
import { CardsController } from '../controllers/CardsController';

const router = Router();
const cardsController = new CardsController();

// Get all cards
router.get('/', cardsController.getAllCards);

// Get card by ID
router.get('/:id', cardsController.getCardById);

// Get cards by category
router.get('/category/:categoryId', cardsController.getCardsByCategory);

// Create new card
router.post('/', cardsController.createCard);

// Update card
router.put('/:id', cardsController.updateCard);

// Delete card
router.delete('/:id', cardsController.deleteCard);

// Save multiple cards
router.post('/batch', cardsController.saveManyCards);

// Get count of cards
router.get('/count/total', cardsController.countCards);

export default router;