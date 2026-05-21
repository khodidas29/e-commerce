import React from 'react'
import { Navigate, Outlet } from 'react-router'

const AdminRoutes = () => {

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    const isAdmin = user.role === "ADMIN"

    return token && isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoutes