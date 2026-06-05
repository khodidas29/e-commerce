import { Cart } from "../models/cart.model.js";


// Add To Cart
export const addToCart = async (req, res) => {
    try {
        console.log("ADD CART BODY:", req.body);
        const { userId, productId } = req.body;

        const existingCartItem = await Cart.findOne({
            userId,
            productId
        });

        if (existingCartItem) {

            existingCartItem.quantity += 1;

            await existingCartItem.save();

            return res.status(200).json({
                success: true,
                cart: existingCartItem
            });
        }

        const cart = new Cart(req.body);

        const saved = await cart.save();

        res.status(201).json({
            success: true,
            cart: saved
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};




// Get User Cart
export const getUserCart = async (req, res) => {

    try {

        const userId = req.params.userId;

        const carts = await Cart.find({
            userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            carts
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};



// Increase Quantity
export const increaseQty = async (req, res) => {

    try {

        const cartId = req.params.cartId;

        const cart = await Cart.findById(cartId);

        cart.quantity += 1;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Quantity increased",
            cart
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};



// Decrease Quantity
export const decreaseQty = async (req, res) => {

    try {

        const cartId = req.params.cartId;

        const cart = await Cart.findById(cartId);

        if (cart.quantity > 1) {

            cart.quantity -= 1;

            await cart.save();
        }

        res.status(200).json({
            success: true,
            message: "Quantity decreased",
            cart
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};



// Remove Product
export const removeCartProduct = async (req, res) => {

    try {

        const cartId = req.params.cartId;

        await Cart.findByIdAndDelete(cartId);

        res.status(200).json({
            success: true,
            message: "Product removed from cart"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};



// Clear Cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        await Cart.deleteMany({ userId });

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

export const getCartItems = async (req, res) => {

    try {

        const cartItems = await Cart.find({
            userId: req.params.userId
        });

        res.status(200).json({
            success: true,
            cartItems
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};