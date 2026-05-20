import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../hooks/CartContext';
import { toast } from 'react-toastify';

const Home = () => {
const [products, setProducts] = useState([]);

const { addToCart } = useContext(CartContext);

    const fetchProducts = async () => {

        try {

            const res = await fetch("http://localhost:8080/api/products");
            const data = await res.json();

            setProducts(data.products);

        } catch (error) {

            toast.error("Failed To Fetch Products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {

        addToCart(product);

        toast.success("Product Added To Cart");
    };

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
                        Welcome
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

                 <div className="grid grid-cols-4 gap-8 m-6">

            {
                products.map((ele) => {

                    return (

                        <div key={ele._id}>
                            <p className='text-lg'>See all →</p>
                            <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl duration-300 h-full flex flex-col">
                                
                                <img
                                    src={ele.image}
                                    alt="product"
                                    className="w-full h-52 object-cover rounded-xl"
                                />

                                <div className="mt-4 flex flex-col flex-grow">

                                    <h2 className="text-2xl font-bold">
                                        {ele.name}
                                    </h2>

                                    <p className="text-green-600 text-xl font-semibold mt-2">
                                        ₹{ele.price}
                                    </p>

                                    <p className="text-gray-500 mt-1">
                                        Stock : {ele.stock}
                                    </p>

                                    <p className="text-gray-500 mt-1">
                                        Category : {ele.category}
                                    </p>

                                    <p className="text-gray-600 mt-3 line-clamp-2 flex-grow">
                                        {ele.description}
                                    </p>

                                    <button
                                        onClick={() => handleAddToCart(ele)}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3  rounded-xl mt-5 duration-300"
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>

                        </div>
                    );
                })
            }

        </div>
        </div>
    );
};

export default Home;