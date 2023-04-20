import { Router } from 'express';

const router = Router();

router.post('/orders/cart', async (req, res) => {
  const { userId, products, price } = req.body;
  // const order = await
});

export { router as orderRouter };
