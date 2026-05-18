import React from 'react'
import { NavLink, useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token")
  return (
    <div className='flex gap-5 text-xl bg-blue-400'>

      {token && <NavLink to="/" className='text-white'>Home</NavLink>}
      {token && <NavLink to="/products" className='text-white'>Products </NavLink>}
      {token && <NavLink to="/cart" className='text-white'>Cart </NavLink>}
    
      {/* {!token && (
            <div className='flex gap-5 m-2'>
            <NavLink to="/register" className='bg-gray-300 p-2 rounded-lg'>Register</NavLink>
            <NavLink to="/login" className='bg-gray-300 p-2 rounded-lg'>Login</NavLink>
            </div>
          )} */}

      {token && (
        <button onClick={logout} className='bg-red-600 text-white p-2 rounded-xl m-2'>Logout</button>
      )}
    </div>
  )
}

export default Header


