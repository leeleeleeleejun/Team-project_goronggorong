import { Schema } from 'mongoose'

const ProductSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export { ProductSchema };