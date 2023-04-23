import { productModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';

const productController = {
  // 모든 제품 목록 불러오기
  getProducts: async (req, res) => {
    try {
      // 한 페이지 기본값 설정
      const { skip, limit } = req.query; // /api/?skip=0&limit=20
      const products = await productModel.findAll(parseInt(skip), parseInt(limit));
      if (parseInt(skip) >= parseInt(limit) || products.slice(skip, limit).length === 0) {
        return res.status(400).json({ message: '잘못된 목록 설정 입니다' });
      }
      res.status(200).json({
        message: `전체 제품 목록 ${parseInt(skip) + 1} id 부터 ${parseInt(limit)} id 까지 불러왔습니다.`,
        info: products.slice(skip, limit),
      });
    } catch (err) {
      next(err);
    }
  },
  // 카테고리에 해당하는 모든 제품 불러오기
  getProductsByCategory: async (req, res, next) => {
    try {
      // category 해당하는 제품 찾기
      const { category } = req.params;
      if (!['Food', 'Snack', 'Toy', 'Toilet', 'Fashion'].includes(category)) {
        throw new customError(400, '잘못된 카테고리 입니다');
      }
      const products = await productModel.findByCategory(category);
      if (!products) {
        throw new customError(400, '해당 상품이 존재하지 않습니다');
      }
      res.status(200).json({
        message: '선택한 카테고리에 해당하는 제품 목록을 불러왔습니다',
        info: products,
      });
    } catch (err) {
      next(err);
    }
  },
  // id 에 해당하는 제품 불러오기
  getProductById: async (req, res, next) => {
    try {
      // 아이디로 찾아서 JSON 으로 프론트에 쏴주기
      const { id } = req.query;
      const product = await productModel.findById(id);
      if (!product) {
        throw new customError(400, '해당 상품이 존재하지 않습니다');
      }
      res.status(200).json({
        message: '해당 아이디 제품을 불러왔습니다',
        info: product,
      });
    } catch (err) {
      next(err);
    }
  },
  // 새로운 상품 등록하기
  addProduct: async (req, res, next) => {
    try {
      // 객체 destructuring
      const { id, category, name, price, description, amount, imgUrl } = req.body;
      const requiredKeys = ['id', 'category', 'name', 'price', 'description', 'amount', 'imgUrl'];
      // req.body 엔 필수 속성이 다 있어야 함
      if (!requiredKeys.every((key) => req.body.hasOwnProperty(key))) {
        // 모든 필수 키 값이 존재하지 않으면
        throw new customError(400, '등록할 내용을 모두 작성해주세요');
      }
      // 이외 json 데이터는 mongodb에 저장
      const productSameId = await productModel.findById(id);
      const productSameName = await productModel.findByName(name);
      if (productSameId) {
        throw new customError(400, '이미 존재하는 id 입니다');
      }
      if (!['Food', 'Snack', 'Toy', 'Toilet', 'Fashion'].includes(category)) {
        throw new customError(400, '잘못된 카테고리 입니다');
      }
      if (productSameName) {
        throw new customError(400, '이미 존재하는 name 입니다');
      }
      const newProduct = await productModel.create({
        id,
        category,
        name,
        price,
        description,
        amount,
        imgUrl,
      });
      // 이미지 추가 기능을 넣는다면 addProduct({...req.body, imgUrl: 'gcp url'})
      // 이런식으로 되어야 해서 imgUrl이 productInfo 가장 끝에 와야 할 듯
      res.status(200).json({
        message: '새로운 제품 등록을 완료했습니다',
        info: newProduct,
      });
    } catch (err) {
      next(err);
    }
  },

  //기존 상품 수정
  setProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category, name } = req.body;
      // 앞에 카테고리 대문자
      const requiredKeys = ['category', 'name', 'price', 'description', 'amount', 'imgUrl'];
      // req.body 엔 id 빼고 다 있어야 함
      if (!requiredKeys.every((key) => req.body.hasOwnProperty(key))) {
        // 모든 필수 키 값이 존재하지 않으면
        throw new customError(400, '수정할 내용을 모두 작성해주세요');
      }

      const product = await productModel.findById(id);
      const productSameName = await productModel.findByName(name);

      if (!product) {
        throw new customError(400, '수정할 상품이 존재하지 않습니다');
      }
      if (!['Food', 'Snack', 'Toy', 'Toilet', 'Fashion'].includes(category)) {
        throw new customError(400, '잘못된 카테고리 입니다');
      }
      if (productSameName) {
        throw new customError(400, '이미 존재하는 name 입니다');
      }

      const updatedProduct = await productModel.update(id, req.body);

      res.status(200).json({
        message: '해당 제품 수정을 완료했습니다',
        info: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  },

  //기존 상품 삭제
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const productToDelete = await productModel.findById(id);
      if (!productToDelete) {
        throw new customError(400, '수정할 상품이 존재하지 않습니다');
      }
      const deletedProduct = await productModel.delete(id);

      res.status(200).json({
        message: '해당 제품 삭제를 완료했습니다',
        info: deletedProduct,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default productController;
