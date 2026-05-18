import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'

const Orders = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    const res = await fetch(
      "http://localhost:8080/api/orders"
    );

    const data = await res.json();

    setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <div>

      <AdminLayout>

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            All Orders
          </h1>

          <div className="space-y-6">

            {
              orders.map((order, index) => (

                <div
                  key={order._id}
                  className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-6"
                >

                  <img
                    src={order.image}
                    alt="product"
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {order.name}
                    </h2>

                    <p className="text-green-600 text-xl mt-2">
                      ₹{order.price}
                    </p>

                    <p className="text-gray-600 mt-1">
                      Quantity : {order.quantity}
                    </p>

                    <p className="text-gray-400 text-sm mt-2">
                      Order ID : {order._id}
                    </p>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </AdminLayout>

    </div>
  )
}

export default Orders