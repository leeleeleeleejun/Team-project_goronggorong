import mongoose from 'mongoose';
import { OrderSchema } from '../schemas';

const Order = mongoose.model('Order', OrderSchema);

export class OrderModel {
  async findAll() {
    const orders = await Order.find({});

    return orders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
