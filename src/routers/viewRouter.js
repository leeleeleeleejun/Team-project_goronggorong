import express from 'express';
import { viewService } from '../services/index.js';

const router = express.Router();

router.use('/', viewService.serveStatics('home'));
router.use('/products/:id', viewService.serveStatics('detail'));
router.use('/layouts', viewService.serveStatics('layouts'));

export { router as viewRouter };
