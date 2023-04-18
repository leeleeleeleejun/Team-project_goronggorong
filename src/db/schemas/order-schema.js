import { Schema } from 'mongoose';
// import { ProductSchema } from './product';

const OrderSchema = new Schema({
  /*
    User : name, phone_number, address
  */
  user: {
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
  // Admin
  deliveryStatus: {
    type: String,
    required: true,
  },
  /*
  paymentInfo
  orderDate
  } */
});

export default OrderSchema;
