import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../hooks/CartContext";
import { toast } from "react-toastify";

const Products = () => {

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

        <div className="grid grid-cols-4 gap-8 m-6">

            {
                products.map((ele) => {

                    return (

                        <div key={ele._id}>

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
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl mt-5 duration-300"
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
    );
};

export default Products;