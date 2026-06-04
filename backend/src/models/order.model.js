import { model, Schema } from "mongoose";

const orderSchema = new Schema(
 {
        userId: {
            type: String,
            required: true
        },

    productId: {
        type: String,
        required: true
    },

        username: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
         address: {
            type: String,
            required: true
        },

        totalPrice: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: true
    }
)

export const Orders = model("orders", orderSchema);