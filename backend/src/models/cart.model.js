import { model, Schema } from "mongoose";

const cartSchema = new Schema(

    {
        userId: {
            type: String,
            required: true
        },

        productId: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    },

    {
        timestamps: true
    }
);

export const Cart = new model("cart", cartSchema);