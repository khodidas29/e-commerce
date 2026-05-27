import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../hooks/CartContext';
import { toast } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([]);

const [selectedCategory, setSelectedCategory] =
    useState("All");

    useEffect(() => {

    fetch("http://localhost:8080/api/products")
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.products);
        });

}, []);

const categories = [
    "All",
    ...new Set(
        products.map((product) => product.category)
    )
];


const filteredProducts =
    selectedCategory === "All"
        ? products
        : products.filter(
            (product) =>
                product.category === selectedCategory
        );

    return (

        <div className="w-full min-h-screen overflow-hidden">

            <div className="relative w-full ">

                {/* Background Image */}
                <img
                    src="https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg"
                    alt="banner"
                    className="w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-16 md:px-32">

                    <h1 className="text-white text-5xl md:text-7xl font-bold font-serif mb-6">
                        Welcome !!
                    </h1>

                    <p className="text-white text-lg md:text-2xl font-serif leading-relaxed max-w-2xl">
                        BANNERS CREATE A POSITIVE FIRST IMPRESSION AND
                        VISITORS MAKE DECISIONS ABOUT YOUR SITE IN LESS THAN A SECOND.
                    </p>

                    {/* Search Box */}
                    <div className="mt-8 flex">

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full max-w-md px-5 py-4 rounded-l-xl outline-none text-lg text-black bg-gray-100"
                        />

                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-8 rounded-r-xl text-lg font-semibold duration-300"
                        >
                            Search
                        </button>

                    </div>

                </div>

            </div>

            <div>
                <h3 className='text-4xl m-5 font-semibold'>Categories</h3>
            </div>

<div className="flex gap-4 flex-wrap px-5 mb-10">

    {categories.map((category) => (

        <button
            key={category}
            onClick={() =>
                setSelectedCategory(category)
            }
            className={`px-6 py-2 rounded-full border

            ${
                selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white"
            }`}
        >
            {category}
        </button>

    ))}

</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-5">

    {filteredProducts.map((product) => (

        <div
            key={product._id}
            className="bg-white p-5 rounded-xl shadow-lg"
        >

            <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg"
            />

            <h2 className="text-xl font-semibold mt-3">
                {product.name}
            </h2>

            <p className="text-gray-500">
                {product.category}
            </p>

        </div>

    ))}

</div>
        </div>
    );
};

export default Home;