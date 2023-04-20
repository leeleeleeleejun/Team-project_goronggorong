import { orderModel } from '../db/index.js';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async createOrder(userId, products, price) {
    const user = this.orderModel.findById();
  }
}

const orderService = new OrderService(orderModel);

export default orderService;
