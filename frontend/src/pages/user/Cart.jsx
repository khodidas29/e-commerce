import { useContext, useEffect } from "react";
import { CartContext } from "../../hooks/CartContext";
import { toast } from "react-toastify";
import { useState } from "react";

const Cart = () => {

  const [bill, setBill] = useState(null);
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  } = useContext(CartContext);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const res = await fetch(
          `http://localhost:8080/api/cart/${localStorage.getItem("userId")}`
        );

        const data = await res.json();

        console.log(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchCart();

  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const handleRemove = (id) => {

    removeFromCart(id);

    toast.error("Product Removed");
  };

  const handleBuyNow = async () => {

    try {

      let lastBill = null;

      for (const item of cart) {

        console.log(localStorage.getItem("address"));

        const res = await fetch(
          "http://localhost:8080/api/orders/addOrder",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              username: localStorage.getItem("username"),

              //productId: item._id,
                productId: item.productId || item._id,

              name: item.name,
              image: item.image,

              price: item.price,
              quantity: item.quantity,

              address: localStorage.getItem("address")
            })
            
          }
        );

        const data = await res.json();

        console.log(data);

        if (!res.ok) {
          throw new Error(data.error);
        }

        lastBill = data.bill;
      }

      setBill(lastBill);

      toast.success("Order Placed Successfully");

      clearCart();

    } catch (error) {

      console.log(error);

      toast.error(error.message || "Order Failed");
    }
  };

 
  return (

  <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

    {/* TITLE */}

    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-10">
      Shopping Cart
    </h1>

    {
      cart.length === 0 ? (

        <div className="flex justify-center items-center h-[60vh]">

          <h2 className="text-xl sm:text-2xl text-gray-500 text-center">
            No Products In Cart !!
          </h2>

        </div>

      ) : (

        <div className="max-w-6xl mx-auto space-y-6">

          {
            cart.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between"
              >

                {/* LEFT SIDE */}

                <div className="flex flex-col sm:flex-row gap-5 flex-1">

                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt="product"
                    className="w-full sm:w-36 h-36 object-cover rounded-xl border"
                  />

                  {/* DETAILS */}

                  <div className="flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-green-600 text-xl font-bold mt-2">
                      ₹{item.price}
                    </p>

                    {/* QTY */}

                    <div className="flex items-center gap-3 mt-4 flex-wrap">

                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-lg text-xl"
                      >
                        -
                      </button>

                      <p className="text-lg font-semibold">
                        Qty :
                      </p>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-lg text-xl"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">

                  <p className="text-2xl font-bold text-green-600">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))
          }

          {/* TOTAL */}

          <div className="bg-white shadow-xl rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row justify-between items-center gap-5">

            <h2 className="text-2xl sm:text-3xl font-bold">
              Total :
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">

              <p className="text-3xl font-bold text-green-600">
                ₹{totalPrice}
              </p>

              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto text-white bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl font-semibold transition-all"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      )
    }

  </div>
)
}

export default Cart;