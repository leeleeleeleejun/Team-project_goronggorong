import { Schema } from 'mongoose';
// import { ProductSchema } from './product';

const OrderSchema = new Schema({
  orderDate: {
    type: Date,
  },
  user: {
    // User : name, phoneNumber, address
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  paymentMethod: {
    paymentType: {
      // credit, accout,
      type: String,
      required: true,
    },
    creditInfo: {
      company: {
        type: String,
        required: true,
      },
      cardNumber: {
        type: Number,
        required: true,
      },
      expiryDate: {
        type: String,
        required: true,
      },
      cvc: {
        type: Number,
        required: true,
      },
    },
  },
});

export default OrderSchema;
