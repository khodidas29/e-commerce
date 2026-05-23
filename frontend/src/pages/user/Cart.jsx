import { useContext } from "react";
import { CartContext } from "../../hooks/CartContext";
import { toast } from "react-toastify";

const Cart = () => {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

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

    for (const item of cart) {

      const res = await fetch(
        "http://localhost:8080/api/orders/addOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
         body: JSON.stringify({
    productId: item._id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity
})
        }
      );

      const data = await res.json();

      console.log(data);
    }

    toast.success("Order Placed Successfully");

  } catch (error) {

    toast.error("Order Failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Shopping Cart
      </h1>

      {
        cart.length === 0 ? (

          <div className="flex justify-center items-center h-[60vh]">
            <h2 className="text-2xl text-gray-500">
              No Products In Cart !!
            </h2>
          </div>

        ) : (

          <div className="max-w-5xl mx-auto space-y-6">

            {
              cart.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between"
                >

                  <div className="flex items-center gap-6">

                    <img
                      src={item.image}
                      alt="product"
                      className="w-32 h-32 object-cover rounded-xl border"
                    />

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-green-600 text-xl font-bold mt-2">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-4">

                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="bg-gray-300 px-3 py-1 rounded-lg text-xl"
                        >
                          -
                        </button>

                        <span className="text-xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item._id)}
                          className="bg-gray-300 px-3 py-1 rounded-lg text-xl"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-bold text-green-600">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold mt-4"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))
            }
<div className="bg-white shadow-xl rounded-2xl p-6 flex justify-between items-center">

  <h2 className="text-3xl font-bold">
    Total :
  </h2>

  <div className="flex items-center gap-4">

    <p className="text-3xl font-bold text-green-600">
      ₹{totalPrice}
    </p>

   <button
  onClick={handleBuyNow}
  className="text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold"
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