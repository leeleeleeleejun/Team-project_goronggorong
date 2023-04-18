import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  /*
    User : name, phone_number, address
  */
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
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
});

export { OrderSchema };
