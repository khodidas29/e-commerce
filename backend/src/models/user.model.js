import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: String,
        phone: Number,
        password: String,
        confirmPassword: String,
        address: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            default: "USER",
            enum: ["USER", "ADMIN"]
        }
    }
)

export const Users = new model("users", userSchema)  