import { Router } from "express";
import { addToCart, clearCart, decreaseQty, getUserCart, increaseQty, removeCartProduct } from "../controllers/cart.controller.js";


const cartRoute = Router();

cartRoute.post("/add", addToCart);

cartRoute.get("/user/:userId", getUserCart);

cartRoute.put("/increase/:cartId", increaseQty);

cartRoute.put("/decrease/:cartId", decreaseQty);

cartRoute.delete("/remove/:cartId", removeCartProduct);

cartRoute.delete("/clear/:userId", clearCart);

export default cartRoute;