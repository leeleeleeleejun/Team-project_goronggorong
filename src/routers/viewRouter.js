import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serveStatics = (srcFolder) => {
  const src = path.join(__dirname, `../views/${srcFolder}`);
  console.log(__dirname, `../views/${srcFolder}`);
  const option = { index: `${srcFolder}.html` };

  return express.static(src, option);
};

router.use('/', serveStatics('home'));
router.use('/products/:id', serveStatics('detail'));
router.use('/footerheader', serveStatics('footerheader'));

export { router as viewRouter };
