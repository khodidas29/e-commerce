import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';

const Products = () => {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("All");

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

    // Unique Categories

    const categories = [
        "All",
        ...new Set(products.map((item) => item.category))
    ];

    // Filter Products

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "All"
                ? true
                : product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (

        <AdminLayout>

            <div className="p-8 bg-gray-100 min-h-screen">

                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-4xl font-bold text-gray-800">
                        All Products
                    </h1>

                    <Link
                        to="/admin/add-product"
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
                    >
                        + Add Product
                    </Link>

                </div>

                {/* Search + Filter */}

                <div className="bg-white p-5 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row gap-4">

                    <input
                        type="text"
                        placeholder="Search Product..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="flex-1 border p-3 rounded-xl outline-none"
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(e.target.value)
                        }
                        className="border p-3 rounded-xl outline-none"
                    >

                        {
                            categories.map((category, index) => (

                                <option
                                    key={index}
                                    value={category}
                                >
                                    {category}
                                </option>

                            ))
                        }

                    </select>

                </div>

                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

                    <table className="w-full">

                        <thead className="bg-blue-500 text-white">

                            <tr>

                                <th className="p-4 text-left">
                                    Image
                                </th>

                                <th className="p-4 text-left">
                                    Product
                                </th>

                                <th className="p-4 text-left">
                                    Price
                                </th>

                                <th className="p-4 text-left">
                                    Stock
                                </th>

                                <th className="p-4 text-left">
                                    Category
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredProducts.map((product) => (

                                    <tr
                                        key={product._id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-4">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-20 h-20 object-cover rounded-xl border"
                                            />

                                        </td>

                                        <td className="p-4">

                                            <h2 className="font-bold text-lg">
                                                {product.name}
                                            </h2>

                                            <p className="text-gray-500 text-sm mt-1">
                                                {product.description}
                                            </p>

                                        </td>

                                        <td className="p-4 font-semibold text-green-600">
                                            ₹{product.price}
                                        </td>

                                        <td className="p-4">
                                            {product.stock}
                                        </td>

                                        <td className="p-4">
                                            {product.category}
                                        </td>

                                        <td className="p-4">

                                            <div className="flex gap-3">

                                                <Link
                                                    to={`/admin/update-product/${product._id}`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Update
                                                </Link>

                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>
                            
        </AdminLayout>
    );
};

export default Products;