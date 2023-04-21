import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  requestMessage: {
    type: String,
  },
  products: [
    {
      id: {
        type: Number,
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
  paymentMethod: {
    paymentType: {
      // credit, account
      type: String,
      required: true,
    },
    creditInfo: {
      company: {
        type: String,
        // required: true,
      },
      cardNumber: {
        type: Number,
        // required: true,
      },
      expiryDate: {
        type: String,
        // required: true,
      },
      cvc: {
        type: Number,
        // required: true,
      },
    },
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    default: '입금 대기',
  },
});

export default model('Order', OrderSchema);
