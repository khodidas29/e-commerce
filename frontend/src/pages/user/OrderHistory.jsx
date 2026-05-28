import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);

    const userId = localStorage.getItem("userId");

    // ================= FETCH ORDERS =================

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

    // ================= DOWNLOAD PDF =================

    const downloadBill = (order) => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Order Invoice", 20, 20);

        doc.setFontSize(12);

        doc.text(`Product Name: ${order.name}`, 20, 40);

        doc.text(`Price: Rs. ${order.price}`, 20, 55);

        doc.text(`Quantity: ${order.quantity}`, 20, 70);

        doc.text(
            `Total Amount: Rs. ${order.price * order.quantity}`,
            20,
            85
        );

        doc.text(
            `Address: ${order.address || "Rajkot, Gujarat"}`,
            20,
            100
        );

        const today = new Date().toLocaleDateString();

        doc.text(`Date: ${today}`, 20, 115);

        doc.text("Thank you for shopping!", 20, 140);

        doc.save(`${order.name}-invoice.pdf`);
    };
    return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

        {/* TITLE */}

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-10">
            My Orders
        </h1>

        {
            orders.length === 0 ? (

                <div className="flex justify-center items-center h-[60vh]">

                    <h2 className="text-xl sm:text-2xl text-gray-500 text-center">
                        No Orders Found !!
                    </h2>

                </div>

            ) : (

                <div className="max-w-6xl mx-auto space-y-6">

                    {
                        orders.map((order) => (

                            <div
                                key={order._id}
                                className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:justify-between"
                            >

                                {/* LEFT SIDE */}

                                <div className="flex flex-col sm:flex-row gap-5 flex-1">

                                    <img
                                        src={order.image}
                                        alt="product"
                                        className="w-full sm:w-40 h-40 object-cover rounded-xl border"
                                    />

                                    <div className="flex flex-col justify-center">

                                        <h2 className="text-2xl font-bold">
                                            {order.name}
                                        </h2>

                                        <p className="text-green-600 text-xl font-bold mt-2">
                                            ₹{order.price}
                                        </p>

                                        <p className="mt-2 text-base sm:text-lg">
                                            Quantity : {order.quantity}
                                        </p>

                                        <p className="mt-2 text-base sm:text-lg font-semibold text-gray-700">
                                            Total : ₹
                                            {order.price * order.quantity}
                                        </p>

                                    </div>

                                </div>

                                {/* RIGHT SIDE */}

                                <div className="lg:border-l-2 lg:pl-6 w-full lg:w-70">

                                    <h2 className="text-2xl font-bold mb-4">
                                        Bill
                                    </h2>

                                    <div className="space-y-2 text-sm sm:text-base">

                                        <p>
                                            <strong>Price:</strong> ₹{order.price}
                                        </p>

                                        <p>
                                            <strong>Qty:</strong> {order.quantity}
                                        </p>

                                        <p>
                                            <strong>Total:</strong> ₹
                                            {order.price * order.quantity}
                                        </p>

                                        <p className="wrap-break-word">
                                            <strong>Address:</strong>{" "}
                                            {order.address}
                                        </p>

                                    </div>

                                    {/* BUTTON */}

                                    <button
                                        onClick={() => downloadBill(order)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-5 font-semibold transition-all"
                                    >
                                        Download PDF
                                    </button>

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