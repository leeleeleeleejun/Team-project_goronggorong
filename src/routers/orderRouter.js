import { Router } from 'express';
import { orderController } from '../controllers/index.js';

const router = Router();

// verityToken 필요
// router.get('/orders/cart', );
// router.get('/order/payment', verifyToken);
router.post('/orders/payment', orderController.createOrder);
router.get('/orders/:id', orderController.getSelectedOrder);

export { router as orderRouter };
