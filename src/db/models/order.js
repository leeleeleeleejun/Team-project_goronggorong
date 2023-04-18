import mongoose from 'mongoose';
import { OrderSchema } from '../schemas';

const Order = mongoose.model('Order', OrderSchema);

class OrderModel {
  async findAll() {
    const orders = await Order.find({});

    return orders;
  }
}

export { OrderModel };
