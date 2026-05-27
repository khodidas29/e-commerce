import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import React, { useState } from "react";

const AdminLayout = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.clear();

        navigate("/login");
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: "📊",
        },
        // {
        //     name: "Add Product",
        //     path: "/admin/add-product",
        //     icon: "➕",
        // },
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
    <div
        className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-gray-900 text-white p-6
        shadow-2xl overflow-y-auto transition-transform duration-300
        
        md:translate-x-0
        
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >

        {/* LOGO */}
        <div className="mb-10">

            <h1 className="text-3xl font-bold text-center">
                Admin Panel
            </h1>

            <p className="text-gray-400 text-center mt-2 text-sm">
                MERN E-Commerce
            </p>

        </div>

        {/* CLOSE BUTTON MOBILE */}
        <button
            className="md:hidden absolute top-4 right-4 text-3xl"
            onClick={() => setSidebarOpen(false)}
        >
            ✕
        </button>

        {/* MENU */}
        <div className="space-y-3">

            {
                menuItems.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                        flex items-center gap-4 p-4 rounded-xl transition duration-300
                        
                        ${location.pathname === item.path
                                ? "bg-blue-500"
                                : "hover:bg-gray-800"
                            }
                    `}
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

    {/* OVERLAY MOBILE */}
    {
        sidebarOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
            />
        )
    }

    {/* MAIN CONTENT */}
    <div className="flex-1 md:ml-72 p-4 md:p-8 w-full">

        {/* TOPBAR */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-5 flex justify-between items-center mb-8">

            <div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden text-3xl mb-3"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰
                </button>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-1 text-sm md:text-base">
                    Welcome back Admin 👋
                </p>

            </div>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 md:px-5 py-2 rounded-xl text-sm md:text-base"
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