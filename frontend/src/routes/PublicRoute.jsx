import React from 'react'
import { Outlet } from 'react-router'

const PublicRoute = () => {
  const token = localStorage.getItem('token') === "true"

  return token ? <Navigate to='/admin/dashboard'/> : <Outlet/>
}

export default PublicRoute