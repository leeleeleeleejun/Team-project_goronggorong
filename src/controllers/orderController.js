import { userModel, orderModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';

const orderController = {
  createOrder: async (req, res, next) => {
    const { userId, address, requestMessage, products, totalPrice, paymentMethod } = req.body;

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new customError(400, '사용자가 없습니다.');
      }

      const order = await orderModel.createOrder(user, {
        address,
        requestMessage,
        products,
        totalPrice,
        paymentMethod,
      });
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
  getSelectedOrder: async (req, res, next) => {
    const { _id } = req.params;

    try {
      const order = await orderModel.findById(_id);
      if (!order) {
        throw new customError(400, '주문 상세정보가 없습니다.');
      }

      return res.status(200).json({
        message: '주문 상세정보를 불러왔습니다.',
        order,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default orderController;
