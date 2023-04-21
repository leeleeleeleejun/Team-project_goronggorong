import { Order } from '../schemas/index.js';

const orderModel = {
  findAll: async () => {
    const orders = await Order.find({});

    return orders;
  },
};

export default orderModel;
