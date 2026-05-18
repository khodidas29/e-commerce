import { model, Schema } from "mongoose";

const productSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        catagory: {
            type: String,
            default: "general"
        },

        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Category",
        // },

        stock: {
            type: Number,
            default: 0
        },
        description: {
            type: String
        },

        image: {
            type: String
        }
    }
)

export const Products = new model("products", productSchema)