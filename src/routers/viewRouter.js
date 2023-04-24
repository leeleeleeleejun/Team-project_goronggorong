import express from 'express';
import { viewService } from '../services/index.js';

const router = express.Router();

// PRODUCT
router.use('/', viewService.serveStatics('home')); // 메인페이지
router.use('/products', viewService.serveStatics('detail')); // /products?id=0000
router.use('/products/:category', viewService.serveStatics('category')); // 카테고리별 상품 조회

// SIGN
router.use('/signin', viewService.serveStatics('user/sign-in')); // 로그인
router.use('/signin/find-password', viewService.serveStatics('user/find-pw')); // 비밀번호 찾기
router.use('/signup', viewService.serveStatics('user/sign-up')); // 회원가입

// MYPAGE
router.use('/mypage', viewService.serveStatics('user/mypage'));
router.use('/mypage/check-valid-user', viewService.serveStatics('user/check-valid-user'));
router.use('/mypage/edit-user-info', viewService.serveStatics('user/edit-user-info'));

// ORDER
router.use('/orders/cart', viewService.serveStatics('cart'));
router.use('/orders/payment', viewService.serveStatics('order/payment'));
router.use('/orders/payment/success', viewService.serveStatics('order/success'));
router.use('/orders/:id', viewService.serveStatics('order/order-detail'));
router.use('/orders/:id/cancel-order', viewService.serveStatics('order/cancel'));
router.use('/orders/:id/cancel-order/success', viewService.serveStatics('order/cancel-complete'));

// FOOTER, HEADER
router.use('/layouts', viewService.serveStatics('layouts')); // footer, header

export { router as viewRouter };
