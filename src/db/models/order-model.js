import mongoose from 'mongoose';
import { OrderSchema } from '../schemas/order-schema.js';

const Order = mongoose.model('Order', OrderSchema);

export class OrderModel {
  async findAll() {
    const orders = await Order.find({});

    return orders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
