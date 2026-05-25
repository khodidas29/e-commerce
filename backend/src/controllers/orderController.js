import { Orders } from "../models/order.model.js"
import { Products } from "../models/product.model.js";

// export const createOrder = async (req, res) => {    
//     try {
//         const order = new Orders(req.body)
//         const saved = await order.save();
//         res.status(201).json({
//             success: true,
//             message: "Order added",
//             saved
//         })
//     } catch (error) {
//         res.status(500).json({ error: error.message || "Internal server error" })
//     }
// }
export const createOrder = async (req, res) => {

    try {

        console.log(req.body);

        const order = new Orders(req.body);

        const saved = await order.save();

        await Products.findByIdAndUpdate(
            req.body.productId,
            {
                $inc: {
                    stock: -req.body.quantity
                }
            }
        );

        res.status(201).json({
            success: true,
            message: "Order added",
            saved
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const getOrder = async (req, res) => {
    try {
        const orders = await Orders.find().sort({ createdAt: -1 });
        console.log(orders);
        res.status(201).json({ message: "Order fetched", orders })
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        await Orders.findByIdAndDelete(orderId)
        res.status(201).json({ message: "Order deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const data = req.body;
        await Orders.findByIdAndUpdate(orderId, data)
        res.status(201).json({ message: "Order updated" })
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" })

    }
}