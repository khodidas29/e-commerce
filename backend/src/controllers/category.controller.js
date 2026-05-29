// import { Category } from "../models/category.model.js"

// export const getCategory = async(req,res) =>{
//     try {
//         const categories = await Category.find();
//         console.log(categories)
//         res.status(200).json({message:"Category fetched",categories})
//     } catch (error) {
//         res.status(500).json({error :error.message || "Internal server error"})
//     }
// }

// export const addCategory =  async(req,res) =>{
//     try {
//         const catagory = await Category.create(req.body);
//         res.status(201).json({message : "Category added"})
//     } catch (error) {
//         res.status(500).json({error:error.message || "Imnternal server error"})
//     }
// }

import { Category } from "../models/category.model.js";

export const getCategory = async (req, res) => {

    try {

        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const addCategory = async (req, res) => {

    try {

        const category = await Category.create(req.body);

        res.status(201).json({
            success: true,
            message: "Category added",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// DELETE CATEGORY

export const deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};