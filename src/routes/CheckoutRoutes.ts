import { Router } from 'express';
import { CheckoutController } from '../controllers/CheckoutController';

const router = Router();
const checkoutController = new CheckoutController();

// Get all checkouts
router.get('/', checkoutController.getAllCheckouts);

// Get count of checkouts
router.get('/count/total', checkoutController.countCheckouts);

// Get checkouts by status
router.get('/status/:status', checkoutController.getCheckoutsByStatus);
router.get('/filter', checkoutController.getCheckoutsByStatus); // Alternate route using query parameter

// Create new checkout
router.post('/', checkoutController.createCheckout);

// Save multiple checkouts
router.post('/batch', checkoutController.saveManyCheckouts);

// Get checkout by ID
router.get('/:id', checkoutController.getCheckoutById);

// Update checkout
router.put('/:id', checkoutController.updateCheckout);

// Delete checkout
router.delete('/:id', checkoutController.deleteCheckout);

export default router;