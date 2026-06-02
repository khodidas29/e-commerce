import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const userId = localStorage.getItem("userId");

    // ================= LOAD USER CART =================

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem(
            `cart_${userId}`
        );

        return savedCart ? JSON.parse(savedCart) : [];
    });

    // ================= SAVE USER CART =================

    useEffect(() => {

        localStorage.setItem(
            `cart_${userId}`,
            JSON.stringify(cart)
        );

    }, [cart, userId]);

    // ================= ADD TO CART =================

    const addToCart = (product) => {

        const existingProduct = cart.find(
            (item) => item._id === product._id
        );

        if (existingProduct) {

            const updatedCart = cart.map((item) =>
                item._id === product._id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

            setCart(updatedCart);

        } else {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
    };

    // ================= REMOVE =================

    const removeFromCart = (productId) => {

        const updatedCart = cart.filter(
            (item) => item._id !== productId
        );

        setCart(updatedCart);
    };

    // ================= INCREASE =================

    const increaseQty = (productId) => {

        const updatedCart = cart.map((item) =>
            item._id === productId
                ? {
                    ...item,
                    quantity: item.quantity + 1
                }
                : item
        );

        setCart(updatedCart);
    };

    // ================= DECREASE =================

    const decreaseQty = (productId) => {

        const updatedCart = cart.map((item) => {

            if (item._id === productId) {

                return {
                    ...item,
                    quantity:
                        item.quantity > 1
                            ? item.quantity - 1
                            : 1
                };
            }

            return item;
        });

        setCart(updatedCart);
    };

    // ================= CLEAR CART =================

   const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
        `cart_${userId}`
    );
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