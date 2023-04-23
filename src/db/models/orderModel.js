import { Order } from '../schemas/index.js';

const orderModel = {
  findAll: async () => {
    const orders = await Order.find({}).populate('user');

    return orders;
  },
  findOneById: async (_id) => {
    const order = await Order.findOne({ _id });

    return order;
  },
  findAllById: async (_id) => {
    const orders = await Order.find({ userId: _id });

    return orders;
  },
  createOrder: async (orderInfo) => {
    const order = await Order.create(orderInfo);

    return order;
  },
  updateOrder: async (_id) => {
    const updatedOrder = await Order.updateOne({ _id }, { deliveryStatus: '주문취소' });

    return updatedOrder;
  },
};

export default orderModel;
