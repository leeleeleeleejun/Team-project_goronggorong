import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  user: {
    // User : name, phone, address
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
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
  },
  deliveryStatus: {
    type: String,
  },
});

export default model('Order', OrderSchema);
