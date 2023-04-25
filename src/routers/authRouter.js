import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

// router.post('/refreshToken', verifyToken, authController.refreshToken); // token 재발급하는 api 있어야 함

export { router as authRouter };
