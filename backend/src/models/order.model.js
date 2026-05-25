import { model, Schema } from "mongoose";

const orderSchema = new Schema(
    {
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
        
    },
    {
         timestamps: true
    }
)

export const Orders = new model("orders", orderSchema)