import { Router } from "express";
import {  deleteUser, getUsers, loginUser, registerUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authentic.js";

const userRoute = Router();

userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser)
userRoute.get("/",authenticate,getUsers)
userRoute.delete("/delete/:id",deleteUser)
userRoute.delete("/:id", authenticate, deleteUser)

export default userRoute;   