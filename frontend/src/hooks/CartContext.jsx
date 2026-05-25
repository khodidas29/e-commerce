import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {

        const existingProduct = cart.find(
            (item) => item._id === product._id
        );

        if (existingProduct) {

            const updatedCart = cart.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            setCart(updatedCart);

        } else {

            setCart([
                ...cart,
                { ...product, quantity: 1 }
            ]);
        }
    };

    const removeFromCart = (productId) => {

        const updatedCart = cart.filter(
            (item) => item._id !== productId
        );

        setCart(updatedCart);
    };

    const increaseQty = (productId) => {

        const updatedCart = cart.map((item) =>
            item._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        setCart(updatedCart);
    };

   const decreaseQty = (productId) => {

    const updatedCart = cart.map((item) => {

        if (item._id === productId) {

            return {
                ...item,
                quantity: item.quantity > 1
                    ? item.quantity - 1
                    : 1
            };
        }

        return item;
    });

    setCart(updatedCart);
};
const clearCart = () => {
  setCart([]);
};

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                 clearCart
            }}
        >
            {children}  
        </CartContext.Provider>
    );
};

export default CartProvider;