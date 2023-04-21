import { userModel, orderModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';

const orderController = {
  createOrder: async (req, res, next) => {
    const { userId, address, message, products, totalPrice, paymentMethod } = req.body;

    try {
      const user = await userModel.findById(userId);
      const order = await orderModel.createOrder(user, { address, message, products, totalPrice, paymentMethod });

      if (!order) {
        throw new customError(400, '주문이 완료되지 않았습니다.');
      }

      return res.status(200).json({
        message: '주문을 완료했습니다',
        order,
      });
    } catch (err) {
      next(err);
    }
  },
  getSelectedOrder: async (req, res, next) => {},
};

export default orderController;
