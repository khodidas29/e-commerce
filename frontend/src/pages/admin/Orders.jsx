import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {

        const res = await fetch(
            "http://localhost:8080/api/orders"
        );

        const data = await res.json();

        // latest order first
        const sortedOrders = data.orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (

        <AdminLayout>

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="flex items-center justify-between mb-10">

                    <h1 className="text-4xl font-bold">
                        All Orders
                    </h1>

                    <div className="bg-white shadow-md px-6 py-3 rounded-xl">

                        <p className="text-gray-500">
                            Total Orders
                        </p>

                        <h2 className="text-3xl font-bold text-blue-600">
                            {orders.length}
                        </h2>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {
                        orders.map((order) => (

                            <div
                                key={order._id}
                                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                            >

                                {/* Top */}

                                <div className="flex gap-5 p-5">

                                    <img
                                        src={order.image}
                                        alt="product"
                                        className="w-32 h-32 object-cover rounded-2xl border"
                                    />

                                    <div className="flex-1">

                                        <h2 className="text-2xl font-bold">
                                            {order.name}
                                        </h2>

                                        <p className="text-green-600 text-2xl font-bold mt-2">
                                            ₹{order.price}
                                        </p>

                                        <div className="flex gap-3 mt-3">

                                            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                                                Qty : {order.quantity}
                                            </span>

                                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                                                Total : ₹{order.price * order.quantity}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Bottom */}

                                <div className="border-t px-5 py-4 bg-gray-50">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                Order ID
                                            </p>

                                            <p className="text-sm font-semibold break-all">
                                                {order._id}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-sm text-gray-500">
                                                Ordered On
                                            </p>

                                            <p className="font-semibold">
                                                {
                                                    new Date(order.createdAt).toLocaleDateString()
                                                }
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-4">

                                        <p className="text-sm text-gray-500">
                                            Delivery Address
                                        </p>

                                        <p className="font-medium text-gray-700 break-words">
                                            {order.address}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>
            

        </AdminLayout>
    )
}

export default Orders