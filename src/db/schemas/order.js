import { Schema } from 'mongoose';
// import { ProductSchema } from './product';

const OrderSchema = new Schema({
  /*
    User : name, phone_number, address
  */
  productList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      amount: {
        type: number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  // Admin
  /* deliveryStatus: {
    type: String,
    required: true,
  }, */
});

export { OrderSchema };
