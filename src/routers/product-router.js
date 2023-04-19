import { Router } from 'express';
import { productService } from '../services/product-service.js'
const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
    try {
      // 전체 제품 목록 불러오기
      const products = await productService.getProducts();
      // 제품 목록 JSON 형태로 프론트에 쏴주기
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
    // 아이디로 찾아서 JSON 으로 프론트에 쏴주기
    const { category, id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch(error) {
    next(error);
  }
});

productRouter.post('/productregister', async (req, res, next) => {
  try {
    const newProduct = await productService.addProduct(req.body)
    res.status(200).json(product);
  } catch(error) {
    next(error);
  }

})


export { productRouter };
  