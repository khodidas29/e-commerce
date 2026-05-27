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

        // ===== Header =====

        doc.setFillColor(22, 163, 74);

        doc.rect(0, 0, 210, 30, "F");

        doc.setTextColor(255, 255, 255);

        doc.setFontSize(24);

        doc.text("ORDER INVOICE", 20, 20);

        // ===== Reset Text Color =====

        doc.setTextColor(0, 0, 0);

        // ===== Store Info =====

        doc.setFontSize(12);

        doc.text("My Shopping Store", 20, 45);

        doc.text("Rajkot, Gujarat", 20, 52);

        // ===== Divider =====

        doc.line(20, 58, 190, 58);

        // ===== Order Details =====

        doc.setFontSize(18);

        doc.text("Order Details", 20, 72);

        doc.setFontSize(14);

        doc.text(`Product Name : ${order.name}`, 20, 90);

        doc.text(`Price : Rs. ${order.price}`, 20, 105);

        doc.text(`Quantity : ${order.quantity}`, 20, 120);

        doc.text(
            `Total Amount : Rs. ${order.price * order.quantity}`,
            20,
            135
        );

        doc.text(
            `Address : ${order.address || "Rajkot, Gujarat"}`,
            20,
            150
        );

        // ===== Date =====

        const today = new Date().toLocaleDateString();

        doc.text(`Date : ${today}`, 20, 165);

        // ===== Total Box =====

        doc.setFillColor(240, 240, 240);

        doc.roundedRect(20, 180, 170, 30, 3, 3, "F");

        doc.setFontSize(18);

        doc.setTextColor(22, 163, 74);

        doc.text(
            `Grand Total : Rs. ${order.price * order.quantity}`,
            30,
            198
        );

        // ===== Footer =====

        doc.setTextColor(120);

        doc.setFontSize(11);

        doc.text(
            "Thank you for shopping with us!",
            60,
            230
        );

        // ===== Save PDF =====

        doc.save(`${order.name}-invoice.pdf`);
    };

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

                    <div className="max-w-6xl mx-auto space-y-6">

                        {
                            orders.map((order) => (

                                <div
                                    key={order._id}
                                    className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
                                >

                                    {/* LEFT SIDE */}

                                    <div className="flex items-center gap-6">

                                        <img
                                            src={order.image}
                                            alt="product"
                                            className="w-32 h-32 object-cover rounded-xl border"
                                        />

                                        <div>

                                            <h2 className="text-2xl font-bold">
                                                {order.name}
                                            </h2>

                                            <p className="text-green-600 text-xl font-bold mt-2">
                                                ₹{order.price}
                                            </p>

                                            <p className="mt-2 text-lg">
                                                Quantity : {order.quantity}
                                            </p>

                                        </div>

                                    </div>

                                    {/* RIGHT SIDE BILL */}

                                    <div className="border-l-2 pl-6 min-w-[250px]">

                                        <h2 className="text-2xl font-bold mb-4">
                                            Bill
                                        </h2>

                                        <p className="mb-2">
                                            <strong>Price:</strong> ₹{order.price}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Qty:</strong> {order.quantity}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Total:</strong> ₹
                                            {order.price * order.quantity}
                                        </p>

                                        <p className="mb-4 break-words">
                                            <strong>Address:</strong>{" "}
                                            {order.address }
                                        </p>

                                        {/* DOWNLOAD BUTTON */}

                                        <button
                                            onClick={() => downloadBill(order)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all"
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