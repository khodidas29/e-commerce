// import React from 'react'
// import { Navigate, Outlet } from 'react-router'

// const AdminRoutes = () => {

//     const token = localStorage.getItem("token")
//     const user = JSON.parse(localStorage.getItem("user"))
//     const isAdmin = user.role === "ADMIN"

//     return token && isAdmin ? <Outlet /> : <Navigate to="/login" />;
// }

// export default AdminRoutes
import React from 'react';
import { Navigate, Outlet } from 'react-router';

const AdminRoutes = () => {

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    return token && role === "ADMIN"
        ? <Outlet />
        : <Navigate to="/login" />;
};

export default AdminRoutes;