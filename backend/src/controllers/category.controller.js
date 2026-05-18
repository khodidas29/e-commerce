import { Category } from "../models/category.model.js"

export const getCategory = async(req,res) =>{
    try {
        const categories = await Category.find();
        console.log(categories)
        res.status(201).json({message:"Category fetched",categories})
    } catch (error) {
        res.status(500).json({error :error.message || "Internal server error"})
    }
}

export const addCategory =  async(req,res) =>{
    try {
        const catagory = await Category.create(req.body);
        res.status(201).json({message : "Category added"})
    } catch (error) {
        res.status(500).json({error:error.message || "Imnternal server error"})
    }
}