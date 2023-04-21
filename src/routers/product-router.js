import { Router } from 'express';
import productService from '../controllers/product-service.js';
const productRouter = Router();

// 제품 불러오기 API
productRouter.get('/', async (req, res, next) => {
  try {
    // 전체 제품 목록 불러오기
    const products = await productService.getProducts();
    // 제품 목록 JSON 형태로 프론트에 쏴주기
    res.status(200).json({
      message: '전체 제품 목록을 불러왔습니다',
      products,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get('/products/:category', async (req, res, next) => {
  try {
    // category 해당하는 제품 찾기
    const { category } = req.params;
    const products = await productService.getProductsByCategory(category);
    res.status(200).json({
      message: '선택한 카테고리에 해당하는 제품을 불러왔습니다',
      products,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get('/products/:category/:id', async (req, res, next) => {
  try {
    // 아이디로 찾아서 JSON 으로 프론트에 쏴주기
    const { category, id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json({
      message: '해당 아이디 제품을 불러왔습니다',
      product,
    });
  } catch (error) {
    next(error);
  }
});

// 제품 등록 API
productRouter.post('/products/add', async (req, res, next) => {
  try {
    // gcp 로 상품 이미지 업로드 (2주차에 추가예정?)

    // 이외 json 데이터는 mongodb에 저장
    const newProduct = await productService.addProduct(req.body);
    // 이미지 추가 기능을 넣는다면 addProduct({...req.body, imgUrl: 'gcp url'})
    // 이런식으로 되어야 해서 imgUrl이 productInfo 가장 끝에 와야 할 듯
    res.status(200).json({
      message: '새로운 제품 등록을 완료했습니다',
      newProduct,
    });
  } catch (error) {
    next(error);
  }
});

// 제품 수정 API
productRouter.patch('/products/:category/:id', async (req, res, next) => {
  try {
    const { category, id } = req.params;
    const updatedProduct = await productService.setProduct(id, req.body);
    res.status(200).json({
      message: '해당 제품 수정을 완료했습니다',
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
});

// 제품 삭제 API
productRouter.delete('/products/:category/:id', async (req, res, next) => {
  try {
    const { category, id } = req.params;
    const product = await productService.deleteProduct(id);
    res.status(200).json({
      message: '해당 제품 삭제를 완료했습니다',
      product,
    });
  } catch (error) {
    next(error);
  }
});

export { productRouter };
