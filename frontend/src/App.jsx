import React, { useState } from 'react'
import {  BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'; 

import Home from './pages/user/Home';
import Register from './pages/user/Register';
import Login from './pages/user/Login';

import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoutes from './routes/AdminRoutes';

import MainLayout from './layouts/MainLayout';
import Products from './pages/user/Products';
import Dashboard from './pages/admin/Dashboard';
import AddProducts from './pages/admin/AddProducts'
import Cart from './pages/user/Cart';
import Product from './pages/admin/Product';
import Users from './pages/admin/Users';
import Order from './pages/admin/Orders';
import UpdateProduct from './pages/admin/UpdateProduct';

import AddCategory from './pages/admin/AddCategory';
import Profile from './pages/user/Profile';
import About from './pages/user/About';
import OrderHistory from './pages/user/OrderHistory';


const publicRoutes = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]

const privateRoutes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path:"/products",
    element: <Products/>
  },
  {
    path :"/cart",
    element: <Cart/>
  },
  {
    path :"/profile",
    element: <Profile/>
  },
  {
    path : "/about",
    element:<About/>
  },
  {
    path:"/orderhistory",
    element:<OrderHistory/>
  }
]
  const adminRoute =[
    {
      
    path :"/admin/dashboard",
    element: <Dashboard/>
  },
  {
    path :"/admin/add-product",
    element:<AddProducts/>
  },
  {
    path : "/admin/product",
    element: <Product/>
  },
  {
    path : "/admin/orders",
    element : <Order/>
  },
 
  {
    path : "/admin/users",
    element: <Users/>
  },
  {
    path :"/admin/update-product/:id",
    element: <UpdateProduct/>
  },
  {
    path:"/admin/add-category",
    element:<AddCategory/>
  },
  // {
  //   element:<AdminRoutes/>
  // }
    
  ]
 
const App = () => {
  return (
    <div>
       <ToastContainer position="top-right" autoClose={2000} draggable={true}  />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>

            <Route element={<ProtectedRoute />}>
              {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>

            <Route element={<PublicRoute />}>
              {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>

            <Route element={<AdminRoutes/>}>
            {adminRoute.map(({path,element}) => (
              <Route key={path} path={path} element={element}/>
            ))}
            </Route>

          </Route>
        </Routes>
        
     </BrowserRouter>
    </div>
  )
}

export default App