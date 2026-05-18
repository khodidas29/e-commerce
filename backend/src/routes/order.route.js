import { Router } from "express";
import { createOrder, deleteOrder, getOrder, updateOrder } from "../controllers/orderController.js";

const orderRoute = Router();

orderRoute.get("/",getOrder)
orderRoute.post("/addOrder",createOrder)
orderRoute.delete("/delete/:orderId", deleteOrder)
orderRoute.put("/update/:orderId", updateOrder)

export default orderRoute;  