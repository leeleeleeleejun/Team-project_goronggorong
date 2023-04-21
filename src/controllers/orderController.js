import { orderModel } from '../db/index.js';

const orderController = {
  createOrder: async (req, res, next) => {
    const { userId, address, message, products, totalPrice, paymentMethod } = req.body;

    try {
      const user = orderModel.findById(userId);

      return res.status(200).json({
        message: '주문아 완료됐습니다',
        user,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default orderController;
