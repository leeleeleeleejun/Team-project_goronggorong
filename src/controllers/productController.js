import { productModel } from '../db/index.js';

const productController = {
  // 모든 제품 목록 불러오기
  getProducts: async (req, res) => {
    try {
      // 한 페이지 기본값 설정
      const { skip, limit } = req.query;
      // 페이지의 제품 목록
      const products = await productModel.findAll(parseInt(skip), parseInt(limit));
      // 제품 목록 JSON 형태로 프론트에 쏴주기
      res.status(200).json({
        message: `전체 제품 목록 ${parseInt(skip) + 1} id 부터 ${parseInt(limit)} id 까지 불러왔습니다.`,
        products: products.slice(skip, limit),
      });
    } catch (error) {
      res.status(400).json({
        message: '전체 제품 목록을 불러오는데 실패했습니다',
      });
    }
  },
  // 카테고리에 해당하는 모든 제품 불러오기
  getProductsByCategory: async (req, res, next) => {
    try {
      // category 해당하는 제품 찾기
      const { category } = req.params;
      const products = await productModel.findByCategory(category);
      res.status(200).json({
        message: '선택한 카테고리에 해당하는 제품 목록을 불러왔습니다',
        products,
      });
    } catch (error) {
      res.status(400).json({
        message: '선택한 카테고리에 해당하는 제품 목록을 불러오는데 실패했습니다',
      });
    }
  },
  // id 에 해당하는 제품 불러오기
  getProductById: async (req, res, next) => {
    try {
      // 아이디로 찾아서 JSON 으로 프론트에 쏴주기
      const { category, id } = req.params;
      const product = await productModel.findById(id);
      res.status(200).json({
        message: '해당 아이디 제품을 불러왔습니다',
        product,
      });
    } catch (error) {
      res.status(400).json({
        message: '해당 아이디 제품을 불러오는데 실패했습니다',
      });
    }
  },
  // 새로운 상품 등록하기
  addProduct: async (req, res, next) => {
    try {
      // 객체 destructuring
      const { id, category, name, price, description, amount, imgUrl } = req.body;
      // gcp 로 상품 이미지 업로드 (2주차에 추가예정?)
      // 이외 json 데이터는 mongodb에 저장
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
        newProduct,
      });
    } catch (error) {
      res.status(400).json({
        message: '새로운 제품을 등록하는데 실패했습니다',
      });
    }
  },

  //기존 상품 수정
  setProduct: async (req, res, next) => {
    try {
      const { category, id } = req.params;
      const updatedProduct = await productModel.update(id, req.body);
      res.status(200).json({
        message: '해당 제품 수정을 완료했습니다',
        updatedProduct,
      });
    } catch (error) {
      res.status(400).json({
        message: '해당 제품을 수정하는데 실패했습니다',
      });
    }
  },

  //기존 상품 삭제
  deleteProduct: async (req, res, next) => {
    try {
      const { category, id } = req.params;
      const product = await productModel.delete(id);
      res.status(200).json({
        message: '해당 제품 삭제를 완료했습니다',
        product,
      });
    } catch (error) {
      res.status(400).json({
        message: '해당 제품을 삭제하는데 실패했습니다',
      });
    }
  },
};

export default productController;
