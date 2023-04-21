import { Order } from '../schemas/index.js';

const orderModel = {
  findAll: async () => {
    const orders = await Order.find({}).populate('user');

    return orders;
  },
  createOrder: async (user, orderInfo) => {
    const order = await Order.create({
      user: {
        name: user.name,
        phone: user.phone,
        address: orderInfo.address,
      },
      ...orderInfo,
    });

    return order;
  },
};

export default orderModel;
