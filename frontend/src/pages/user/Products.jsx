import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../hooks/CartContext";
import { toast } from "react-toastify";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const { cart, addToCart } = useContext(CartContext);

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

    const handleAddToCart = async (product) => {

    try {

        // Check existing cart item

        const existingItem = cart.find(
            (item) => item._id === product._id
        );

        // Current quantity in cart

        const currentQty = existingItem
            ? existingItem.quantity
            : 0;

        // Stock validation

        if (currentQty >= product.stock) {

            toast.error(
                `Only ${product.stock} item available in stock`
            );

            return;
        }

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

    // ================= CATEGORY LIST =================

    const categories = [
        "All",
        ...new Set(products.map((item) => item.category))
    ];

    // ================= FILTER PRODUCTS =================

    const filteredProducts = products.filter((item) => {

        const matchSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "All" || item.category === category;

        return matchSearch && matchCategory;
    });
return (

    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

        {/* SEARCH + FILTER */}

        <div className="flex flex-col md:flex-row gap-4 mb-8">

            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-3 rounded-xl w-full outline-none shadow-sm"
            />

            {/* CATEGORY */}

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-3 rounded-xl outline-none shadow-sm md:w-62.5"
            >

                {
                    categories.map((cat, index) => (

                        <option
                            key={index}
                            value={cat}
                        >
                            {cat}
                        </option>

                    ))
                }

            </select>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {
                filteredProducts.length > 0 ? (

                    filteredProducts.map((ele) => {

                        return (

                            <div
                                key={ele._id}
                                className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl duration-300 flex flex-col"
                            >

                                {/* IMAGE */}

                                <img
                                    src={ele.image}
                                    alt="product"
                                    className="w-full h-52 sm:h-60 object-cover rounded-xl"
                                />

                                {/* CONTENT */}

                                <div className="mt-4 flex flex-col grow">

                                    <h2 className="text-xl sm:text-2xl font-bold line-clamp-1">
                                        {ele.name}
                                    </h2>

                                    <p className="text-green-600 text-lg sm:text-xl font-semibold mt-2">
                                        ₹{ele.price}
                                    </p>

                                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                                        Stock : {ele.stock}
                                    </p>

                                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                                        Category : {ele.category}
                                    </p>

                                    <p className="text-gray-600 mt-3 text-sm sm:text-base line-clamp-2 grow">
                                        {ele.description}
                                    </p>

                                    {/* BUTTON */}

                                    <button
    onClick={() => handleAddToCart(ele)}
    disabled={ele.stock === 0}
    className={`w-full font-semibold py-3 rounded-xl mt-5 duration-300

    ${
        ele.stock === 0
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
    }`}
>

    {
        ele.stock === 0
            ? "Out Of Stock"
            : "Add To Cart"
    }

</button>

                                </div>

                            </div>

                        );
                    })

                ) : (

                    <div className="col-span-full text-center text-xl sm:text-2xl text-gray-500 py-10">
                        No Products Found
                    </div>

                )
            }

        </div>

    </div>
);
   
};

export default Products;