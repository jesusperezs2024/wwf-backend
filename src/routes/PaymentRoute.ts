import { Router } from 'express'; 
import { PaymentController } from '../controllers/PaymentController';

const router = Router();
const paymentController = new PaymentController();
// new routes
router.post('/checkout', paymentController.checkout.bind(paymentController));
router.post('/subscribe', paymentController.subscription.bind(paymentController));

// // Ruta para pagos directos
// router.post('/direct', paymentController.createDirectPayment.bind(paymentController));

// // Ruta para crear preferencia de checkout
// router.post('/checkout', paymentController.createCheckoutPreference.bind(paymentController));

// // Rutas para suscripciones
// router.post('/subscription', paymentController.createSubscription.bind(paymentController));
// router.delete('/subscription/:subscription_id', paymentController.cancelSubscription.bind(paymentController));
// router.get('/subscription/:id', paymentController.checkSubscriptionStatus.bind(paymentController));

// // Webhook para notificaciones de MercadoPago
// router.post('/webhook', paymentController.handlePaymentWebhook.bind(paymentController));

// // Verificación de estado de pagos
// router.get('/status/:id', paymentController.checkPaymentStatus.bind(paymentController));

// // Reembolsos
// router.post('/refund/:payment_id', paymentController.refundPayment.bind(paymentController));

// // Historial de pagos de cliente
// router.get('/customer/:customer_id', paymentController.getCustomerPayments.bind(paymentController));

export default router;