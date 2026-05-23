import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getSingleProduct, updateProduct } from "../controllers/products.controller.js";

const productRoute = Router();

productRoute.get("/",getProduct)
productRoute.post("/addProduct",createProduct)
productRoute.put("/:productId",updateProduct)
productRoute.delete("/:productId",deleteProduct)
productRoute.get("/:id", getSingleProduct);

export default productRoute; 