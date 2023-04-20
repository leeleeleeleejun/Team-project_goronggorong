import { OrderModel } from '../db/index.js';

const orderService = {
  createOrder: async (userId, products, price) => {
    const user = this.orderModel.findById();

    return user;
  },
};

export default orderService;
