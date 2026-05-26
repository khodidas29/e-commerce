import React, { useEffect, useState } from "react";

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);

    const userId = localStorage.getItem("userId");

    const getOrders = async () => {

        try {

            const res = await fetch(
                `http://localhost:8080/api/orders/user/${userId}`
            );

            const data = await res.json();

            setOrders(data.orders);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getOrders();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold text-center mb-10">
                My Orders
            </h1>

            {
                orders.length === 0 ? (

                    <div className="flex justify-center items-center h-[60vh]">

                        <h2 className="text-2xl text-gray-500">
                            No Orders Found !!
                        </h2>

                    </div>

                ) : (

                    <div className="max-w-5xl mx-auto space-y-6">

                        {
                            orders.map((item) => (

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

                                            <p className="mt-2 text-lg">
                                                Quantity : {item.quantity}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-2xl font-bold text-green-600">
                                            ₹{item.price * item.quantity}
                                        </p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
};

export default OrderHistory;