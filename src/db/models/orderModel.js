import { Order } from '../schemas/index.js';

const OrderModel = {
  findAll: async () => {
    const orders = await Order.find({});

    return orders;
  },
};

export default OrderModel;
