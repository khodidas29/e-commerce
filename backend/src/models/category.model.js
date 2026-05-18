import { model, Schema } from "mongoose";

const categorySchema = new Schema(
    {
         name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
)

export const Category = new model("Category",categorySchema)