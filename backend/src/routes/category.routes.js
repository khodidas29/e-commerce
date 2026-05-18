import { Router } from "express";
import { addCategory, getCategory } from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.get("/",getCategory);
categoryRoute.post("/addCategory",addCategory);

export default categoryRoute;   