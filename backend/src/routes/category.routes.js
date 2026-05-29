// import { Router } from "express";
// import { addCategory, getCategory } from "../controllers/category.controller.js";

// const categoryRoute = Router();

// categoryRoute.get("/",getCategory);
// categoryRoute.post("/addCategory",addCategory);

// export default categoryRoute;   

import { Router } from "express";
import {
    addCategory,
    deleteCategory,
    getCategory
} from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.get("/", getCategory);

categoryRoute.post("/addCategory", addCategory);
categoryRoute.delete("/:id", deleteCategory);

export default categoryRoute;