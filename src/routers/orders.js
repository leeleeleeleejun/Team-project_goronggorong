import { Router } from 'express';
import { asyncHandler } from '../utils';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {}),
);

export { router as ordersRouter };
