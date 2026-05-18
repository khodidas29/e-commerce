import { Router } from "express";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import orderRoute from "./order.route.js";
import categoryRoute from "./category.routes.js";

export const route = Router();

route.use("/users",userRoute)
route.use("/products",productRoute)
route.use("/orders",orderRoute)
route.use("/categories",categoryRoute)
