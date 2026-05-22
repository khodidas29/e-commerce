import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    CartesianGrid,
    Legend
} from "recharts";
const Dashboard = () => {

    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const totalRevenue = orders.reduce(
        (total, order) => {
            return total + (order.price * order.quantity);
        },
        0
    );

    const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login");
};

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: "📊",
        },
        {
            name: "Add Product",
            path: "/admin/add-product",
            icon: "➕",
        },
        {
            name: "Add Category",
            path: "/admin/add-category",
            icon: "📂",
        },
        {
            name: "Products",
            path: "/admin/product",
            icon: "🛍️",
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: "📦",
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "👤",
        },

    ];

    // FETCH PRODUCTS
    const fetchProducts = async () => {

        try {
            const response = await fetch(
                "http://localhost:8080/api/products"
            );

            const data = await response.json();
            setProducts(data.products);
        } catch (error) {

            console.log(error);
        }
    };

    // FETCH USERS
    const fetchUsers = async () => {

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            console.log(data);
            setUsers(data.users);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH ORDERS
    const fetchOrders = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/orders"
            );

            const data = await response.json();

            console.log(data);

            setOrders(data.orders);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, []);


    const categoryData = Object.values(

        products.reduce((acc, product) => {

            const category = product.category || "Other";

            if (!acc[category]) {

                acc[category] = {
                    name: category,
                    value: 0
                };
            }

            acc[category].value += 1;

            return acc;

        }, {})
    );

    const revenueData = orders.map((order, index) => ({
        name: `Order ${index + 1}`,
        revenue: order.price * order.quantity
    }));

    const stockData = products.map((product) => ({
        name: product.name,
        stock: product.stock
    }));

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#A855F7",
        "#EC4899"
    ];
    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <div className="w-72 bg-gray-900 text-white p-6 shadow-2xl">

                {/* Logo */}
                <div className="mb-10">

                    <h1 className="text-3xl font-bold text-center">
                        Admin Panel
                    </h1>

                    <p className="text-gray-400 text-center mt-2 text-sm">
                        MERN E-Commerce
                    </p>

                </div>

                {/* MENU */}
                <div className="space-y-3">

                    {
                        menuItems.map((item) => (

                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 p-4 rounded-xl transition duration-300
                                
                                ${location.pathname === item.path
                                        ? "bg-blue-500"
                                        : "hover:bg-gray-800"
                                    }`}
                            >

                                <span className="text-2xl">
                                    {item.icon}
                                </span>

                                <span className="text-lg font-medium">
                                    {item.name}
                                </span>

                            </Link>
                        ))
                    }

                </div>

                {/* Bottom */}
                {/* <div className="mt-20">

                    <button
                        className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Logout
                    </button>

                </div> */}

            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-8">

                {/* TOPBAR */}
                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Welcome back શેઠ 👋
                        </p>



                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                    >
                        Logout
                    </button>                    {/* 
                    <div className="flex items-center gap-4">

                        <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
                            👤
                        </div>

                    </div> */}

                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    {/* CARD */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Total Products
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {/* 120 */}
                                    {products.length}
                                </h2>

                            </div>

                            <div className="text-5xl">
                                🛍️
                            </div>

                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Orders
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {/* 85 */}
                                    {orders.length}
                                </h2>

                            </div>

                            <div className="text-5xl">
                                📦
                            </div>

                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Users
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {/* 450 */}
                                    {users.length}
                                </h2>

                            </div>

                            <div className="text-5xl">
                                👥
                            </div>

                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Revenue
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {/* ₹50K */}
                                    ₹ {totalRevenue.toLocaleString()}
                                </h2>

                            </div>

                            <div className="text-5xl">
                                💰
                            </div>

                        </div>

                    </div>

                </div>
                {/* GRAPHS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                    {/* BAR CHART */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-2xl font-bold mb-6">
                            Product Stock
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <BarChart data={stockData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="stock"
                                    fill="#3B82F6"
                                    radius={[10, 10, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    {/* PIE CHART */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-2xl font-bold mb-6">
                            Products By Category
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <PieChart>

                                <Pie
                                    data={categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >

                                    {
                                        categoryData.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />

                                        ))
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* LINE CHART */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Revenue Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={350}>

                        <LineChart data={revenueData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10B981"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>
                <Outlet />

            </div>

        </div>
    );
};

export default Dashboard;