import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';

const Products = () => {

    const [products, setProducts] = useState([]);

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

    const deleteProduct = async (id) => {

        try {

            await fetch(
                `http://localhost:8080/api/products/${id}`,
                {
                    method: "DELETE"
                }
            );

            fetchProducts();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (

        <AdminLayout>

            <div className="bg-white p-6 rounded-2xl shadow-md">

                <h1 className="text-3xl font-bold mb-6">
                    All Products
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        products.map((product) => (

                            <div
                                key={product._id}
                                className="border rounded-2xl p-4 shadow-md"
                            >

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-52 object-cover rounded-xl"
                                />

                                <h2 className="text-xl font-bold mt-4">
                                    {product.name}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    ₹ {product.price}
                                </p>

                                 <p className="text-gray-500 mt-2">
                                 {product.description}
                                </p>

                                <div className="flex gap-3 mt-5">

                                    <Link
                                        to={`/admin/update-product/${product._id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Update
                                    </Link>

                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </AdminLayout>
    );
};

export default Products;