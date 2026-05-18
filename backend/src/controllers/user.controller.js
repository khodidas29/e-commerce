import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

export const JWT_SECRET_KEY = "sdsgh";

export const registerUser = async(req,res)=>{
    try {
        const userData = req.body;

        const hashedPassword = await bcrypt.hash(userData.password,10);
        userData.password = hashedPassword;

         const hashedPasswordd = await bcrypt.hash(userData.confirmPassword,10);
        userData.confirmPassword = hashedPasswordd;

        const user = await Users.create(userData)
        res.status(201).json({message:"User Created",user})

    } catch (error) {
        res.status(500).json({error: error.message || "Internal server error"});
    }
}

export const loginUser = async (req,res)=>{
     try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and passwors is required"})
        }
        const user = await Users.findOne({email});

        if(!user){
            return res.status(400).json({message:"Email is wrong"})
        }
        const isValid = await bcrypt.compare(password,user.password)

        if(!isValid){
            return res.status(400).json({message:"Password is wrong"})
        }

        const token = await jwt.sign({userId:user._id},JWT_SECRET_KEY,{
            expiresIn : "1d"
        })

        res.status(200).json({message:"Login succesfull",token,user})

     } catch (error) {
        res.status(500).json({error : error.message || "Internal server error"})
     }
}


export const getUsers = async(req,res) =>{
    try {
        const users = await Users.find()
        console.log(users)
        res.status(200).json({message:"User Fetched",users})

    } catch (error) {
        res.status(500).json({error : error.message || "Internal server error"})
    }
}


export const deleteUser = async (req,res) =>{
    try {
        const user = await Users.findById(req.params.id)
         await Users.findByIdAndDelete(req.params.id);
         res.status(200).json({message:"User deleted",})
    } catch (error) {
        res.status(500).json({error:error.message || "Internal server error"})
    }
}
