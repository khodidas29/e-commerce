import { Router } from "express";
import {  deleteUser, getProfile, getUsers, loginUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authentic.js";
import upload from "../middleware/multer.middleware.js";

const userRoute = Router();

userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser)
userRoute.get("/",authenticate,getUsers)
userRoute.delete("/delete/:id",deleteUser)
userRoute.delete("/:id", authenticate, deleteUser)
userRoute.put(
    "/update-profile",
    authenticate,
    upload.single("image"),
    updateProfile
);
userRoute.get("/profile",authenticate,getProfile)
export default userRoute;   