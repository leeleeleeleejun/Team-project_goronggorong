import { Router } from 'express';
import { productService } from '../services/product-service.js'
const productRouter = Router();

productRouter.get('/products', async (req, res, next) => {
    try {
      // 전체 제품 목록을 얻음
      const products = await productService.getProducts();
      // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(products);
    } catch(error) {
      next(error);
    }
  });

productRouter.get('/products/:category', async (req, res, next) => {
  try {
    // category 해당하는 제품 찾기
    const { category } = req.params;
    const products = await productService.getProductsByCategory(category);
    res.status(200).json(products);
  } catch(error) {
    next(error);
  }
});

productRouter.get('/products/:category/:id', async (req, res, next) => {
  try {
    const { category, id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch(error) {
    next(error);
  }
});


export { productRouter };
  