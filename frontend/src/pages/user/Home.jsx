import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../hooks/CartContext';
import { toast } from 'react-toastify';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const { addToCart } = useContext(CartContext);

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


    const filteredProducts = products.filter((product) => {

        const matchCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    const handleAddToCart = async (product) => {

        try {

            // Frontend cart
            addToCart(product);

            // Backend cart save
            const res = await fetch(
                "http://localhost:8080/api/cart/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem("userId"),
                        productId: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        quantity: 1
                    })
                }
            );

            const data = await res.json();

            console.log(data);

            toast.success("Product Added To Cart");

        } catch (error) {

            console.log(error);

            toast.error("Failed To Add Cart");
        }
    };

    return (

     <div className="w-full min-h-screen overflow-hidden bg-gray-100">

        {/* HERO SECTION */}

        <div className="relative w-full h-[70vh] md:h-screen">

            {/* Background Image */}

            <img
                src="https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg"
                alt="banner"
                className="w-full h-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}

            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20">

                <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold font-serif mb-4">
                    Welcome !!
                </h1>

                <p className="text-white text-sm sm:text-lg md:text-2xl font-serif leading-relaxed max-w-2xl">
                    BANNERS CREATE A POSITIVE FIRST IMPRESSION AND
                    VISITORS MAKE DECISIONS ABOUT YOUR SITE IN LESS THAN A SECOND.
                </p>

                {/* Search Box */}

                <div className="mt-8 flex flex-col sm:flex-row w-full max-w-xl">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-5 py-4 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none outline-none text-black bg-gray-100"
                    />

                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none font-semibold duration-300"
                    >
                        Search
                    </button>

                </div>

            </div>

        </div>

        {/* CATEGORY */}

        <div className="px-4 sm:px-6 md:px-10 py-8">

            <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                Categories
            </h3>

            <div className="flex gap-3 flex-wrap">

                {categories.map((category) => (

                    <button
                        key={category}
                        onClick={() =>
                            setSelectedCategory(category)
                        }
                        className={`px-5 py-2 rounded-full border text-sm md:text-base transition-all

                        ${
                            selectedCategory === category
                                ? "bg-blue-500 text-white"
                                : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        {category}
                    </button>

                ))}

            </div>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 pb-10">

            {filteredProducts.map((product) => (

                <div
                    key={product._id}
                    className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >

                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-52 object-cover rounded-xl"
                    />

                    <div className="flex flex-col grow mt-4">

                        <h2 className="text-xl font-bold">
                            {product.name}
                        </h2>

                        <p className="text-green-600 text-xl font-semibold mt-2">
                            Rs. {product.price}
                        </p>

                        <p className="text-gray-500 mt-1">
                            {product.category}
                        </p>

                        <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl mt-5 font-semibold transition-all"
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            ))}

        </div>

    </div>
    );
};

export default Home;