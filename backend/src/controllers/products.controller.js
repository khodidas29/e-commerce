import { Products } from "../models/product.model.js"

// export const createProduct = async (req,res)=>{ 
//     try {
//         const product = new Products(req.body);
//         const saved = await product.save();
//         res.status(201).json({message:"Product added",product})
//     } catch (error) {
//         res.status(500).json({error: error.message || "Internal server error"})
//     }
// }

export const createProduct = async (req, res) => {

    try {

        console.log(req.body);

        const product = await Products.create(req.body);

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const getProduct = async(req,res) =>{
    try {
        const products = await Products.find();
        console.log(products)
        res.status(201).json({message:"Product fetched",products})
    } catch (error) {
        res.status(500).json({error:error.message || "Internal server error"})
    }
}

export const deleteProduct = async(req,res) =>{
    try {
        const productId = req.params.productId;
        await Products.findByIdAndDelete(productId)
        res.status(201).json({message:"Product delete"})
    } catch (error) {
        res.status(500).json({error:error.message || "Internal server error"})
    }
}

export const updateProduct = async(req,res) =>{
    try {
        const productId = req.params.productId;
        const data = req.body;
        await Products.findByIdAndUpdate(productId,data);
        res.status(201).json({message:"Product updated"})
    } catch (error) {
        res.status(500).json({error:error.message || "Internal server error"})
    }
}