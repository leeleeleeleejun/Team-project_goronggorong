import { Router } from 'express';
import { userModel } from '../db/models/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('signup');
});

export default signupRouter;
