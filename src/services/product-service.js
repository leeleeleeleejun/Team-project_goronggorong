import { productModel } from '../db/models/index.js';

class ProductService {
    // 본 파일의 맨 아래에서, new ProductService(productModel) 하면, 이 함수의 인자로 전달됨
    constructor(productModel) {
      this.productModel = productModel;
    }

    // 모든 제품 목록 불러오기
    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }
    // 카테고리에 해당하는 모든 제품 불러오기
    async getProductsByCategory(category) {
        const products = await this.productModel.findByCategory(category);
        return products;
    }

    // id 에 해당하는 제품 불러오기
    async getProductById(id) {
        const product = await this.productModel.findById(id);
        return product;
    }

    // name 에 해당하는 제품 불러오기
    async getProductByName(name) {
        const product = await this.productModel.findByName(name);
        return product;
    }

    // 새로운 상품 등록하기
    async addProduct(productInfo) {
        // 객체 destructuring
        const { id, category, name, price, description, imageUrl, amount } = productInfo;

        // 올바른 id(1부터 시작하는 상품번호) 확인
        const LastId = await this.productModel.findAll().length
        if (id !== LastId + 1){
          const error = new Error(`올바른 id가 아닙니다 ${LastId + 1} 으로 입력해 주세요`);
          error.name = 'Conflict';
          throw error;
        }
        
        // 상품명 중복 확인
        const product = await this.productModel.findByName(name);
        if (product) {
          const error = new Error('중복된 상품명 입니다. 다른 상품명을 입력해주세요');
          error.name = 'Conflict';
          throw error;
        }

        // db에 저장
        const newProduct = await this.productModel.create(productInfo);
    
        // 정상적으로 저장됐는지 체크
        const newProductCheck = await this.productModel.findById(newProduct.id);
        if (!newProductCheck) {
          const error = new Error('상품이 정상적으로 저장되지 않았습니다.');
          error.name = 'InternalServerError';
          throw error;
        }
    
        return newProduct; // 사용자에게 리턴해서 보여주기
      }
    
    // 기존 상품 수정
    async setProduct(id, update) {
        // 우선 해당 id의 제품이 db에 있는지 확인
        let product = await this.productModel.findById(id);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!product) {
        const error = new Error('해당하는 제품이 없습니다. 다시 한 번 확인해 주세요.');
        error.name = 'NotFound';
        throw error;
        }

        // 업데이트 진행
        product = await this.productModel.update({ id, update });

        return product;
    }

    //기존 상품 삭제
    async deleteProduct(id) {
        const product = await this.productModel.delete(id);
        return product;
    }
}

const productService = new ProductService(productModel);

export default productService;
