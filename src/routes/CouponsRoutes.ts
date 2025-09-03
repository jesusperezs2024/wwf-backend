import { Router } from 'express';
import { CouponsController } from '../controllers/CouponsController';

const router = Router();
const couponsController = new CouponsController();

// Get all coupons
router.get('/', couponsController.getAllCoupons);

// Get count of coupons
router.get('/count/total', couponsController.countCoupons);

// Get coupon by code
router.get('/code/:code', couponsController.getCouponByCode);
router.get('/search', couponsController.getCouponByCode); // Alternate route using query parameter

// Create new coupon
router.post('/', couponsController.createCoupon);

// Save multiple coupons
router.post('/batch', couponsController.saveManyCoupons);

// Get coupon by ID
router.get('/:id', couponsController.getCouponById);

// Update coupon
router.put('/:id', couponsController.updateCoupon);

// Delete coupon
router.delete('/:id', couponsController.deleteCoupon);

// Commented out routes for methods that are also commented in the controller
/*
// Validate coupon
router.get('/validate/:code', couponsController.validateCoupon);
router.get('/validate', couponsController.validateCoupon); // Alternate route using query parameter

// Increment coupon usage
router.post('/increment/:code', couponsController.incrementCouponUsage);
router.post('/increment', couponsController.incrementCouponUsage); // Alternate route using body
*/

export default router;