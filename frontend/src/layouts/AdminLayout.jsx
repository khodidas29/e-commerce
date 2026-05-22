import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

const AdminLayout = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

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


    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <div className="w-72 bg-gray-900 text-white p-6 shadow-2xl">

                {/* LOGO */}
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

            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-8">

                {/* TOPBAR */}
                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Admin Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Welcome back Admin 👋
                        </p>

                    </div>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                    >
                        Logout
                    </button>


                </div>

                {/* PAGE CONTENT */}
                {children}
            </div>

        </div>
    );
};

export default AdminLayout;