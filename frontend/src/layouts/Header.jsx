import React, { useState } from 'react';
import {
    NavLink,
    useNavigate,
    useLocation
} from 'react-router';

import {
    FiMenu,
    FiX
} from "react-icons/fi";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const token = localStorage.getItem("token");

    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    // hide header pages

    const hideHeaderRoutes = [
        "/login",
        "/register"
    ];

    // hide admin pages

    const isAdminPage =
        location.pathname.startsWith("/admin");

    if (
        hideHeaderRoutes.includes(location.pathname) ||
        isAdminPage
    ) {
        return null;
    }

    return (

        <header className="bg-blue-500 shadow-md sticky top-0 z-50">

            <div className="flex items-center justify-between px-4 md:px-8 py-4">

                {/* LOGO */}

                <h1
                    className="text-white text-2xl font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    ShopKart
                </h1>

                {/* DESKTOP MENU */}

                <div className="hidden md:flex items-center gap-6 text-lg font-medium">

                    {token && (
                        <NavLink
                            to="/"
                            className="text-white hover:text-gray-200"
                        >
                            Home
                        </NavLink>
                    )}

                    {token && (
                        <NavLink
                            to="/products"
                            className="text-white hover:text-gray-200"
                        >
                            Products
                        </NavLink>
                    )}

                    {token && (
                        <NavLink
                            to="/about"
                            className="text-white hover:text-gray-200"
                        >
                            AboutUs
                        </NavLink>
                    )}

                    {token && (
                        <NavLink
                            to="/cart"
                            className="text-white hover:text-gray-200"
                        >
                            Cart
                        </NavLink>
                    )}

                    {token && (
                        <NavLink
                            to="/orderhistory"
                            className="text-white hover:text-gray-200"
                        >
                            Orders
                        </NavLink>
                    )}

                    {token && (
                        <NavLink
                            to="/profile"
                            className="text-white hover:text-gray-200"
                        >
                            Profile
                        </NavLink>
                    )}

                </div>

                {/* RIGHT SIDE */}

                <div className="hidden md:flex items-center gap-4">

                    {token && (

                        <h2 className="text-white font-semibold text-lg">
                            Hi , {username}
                        </h2>

                    )}

                    {token && (

                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>

                    )}

                </div>

                {/* MOBILE MENU BUTTON */}

                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden text-white text-3xl"
                >
                    <FiMenu />
                </button>

            </div>

            {/* MOBILE SIDEBAR */}

            <div
                className={`fixed top-0 left-0 h-full w-65 bg-white shadow-2xl z-50 transition-transform duration-300

                ${menuOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >

                {/* TOP */}

                <div className="flex items-center justify-between p-5 border-b">

                    <h2 className="text-2xl font-bold text-blue-500">
                        ShopKart
                    </h2>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-3xl"
                    >
                        <FiX />
                    </button>

                </div>

                {/* USER */}

                <div className="p-5 border-b">

                    <h2 className="text-lg font-semibold">
                        Hi 👋, {username}
                    </h2>

                </div>

                {/* MENU */}

                <div className="flex flex-col gap-5 p-5 text-lg">

                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        onClick={() => setMenuOpen(false)}
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                    >
                        AboutUs
                    </NavLink>

                    <NavLink
                        to="/cart"
                        onClick={() => setMenuOpen(false)}
                    >
                        Cart
                    </NavLink>

                    <NavLink
                        to="/orderhistory"
                        onClick={() => setMenuOpen(false)}
                    >
                        Orders
                    </NavLink>

                    <NavLink
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                    >
                        Profile
                    </NavLink>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg mt-4"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* BACKDROP */}

            {
                menuOpen && (

                    <div
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    ></div>

                )
            }

        </header>
    );
};

export default Header;