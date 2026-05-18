import { Router } from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/products.controller.js";

const productRoute = Router();

productRoute.get("/",getProduct)
productRoute.post("/addProduct",createProduct)
productRoute.put("/:productId",updateProduct)
productRoute.delete("/:productId",deleteProduct)

export default productRoute; 