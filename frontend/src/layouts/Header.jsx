import React from 'react';
import { NavLink, useNavigate } from 'react-router';

const Header = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");

        navigate("/login");
    };

    return (

        <div className='flex items-center justify-between px-6 py-4 bg-blue-500 shadow-md'>

            <div className='flex gap-6 text-lg font-medium'>

                {token && (
                    <NavLink to="/" className='text-white hover:text-gray-200'>
                        Home
                    </NavLink>
                )}

                {token && (
                    <NavLink to="/products" className='text-white hover:text-gray-200'>
                        Products
                    </NavLink>
                )}

                {token && (
                    <NavLink to="/cart" className='text-white hover:text-gray-200'>
                        Cart
                    </NavLink>
                )}

            </div>

            <div className='flex items-center gap-4'>

                {
                    token && (
                        <h2 className='text-white font-semibold text-lg'>
                            Hi👋, {username}
                        </h2>
                    )
                }

                {
                    token && (
                        <button
                            onClick={logout}
                            className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-lg'
                        >
                            Logout
                        </button>
                    )
                }

            </div>

        </div>
    );
};

export default Header;