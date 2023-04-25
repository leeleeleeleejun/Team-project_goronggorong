import { Router } from 'express';

const router = Router();

// router.get('/auth', authController.isLoginUser()); // token 재발급하는 api 있어야 함

export { router as authRouter };
