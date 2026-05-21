import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';

const AddProduct = () => {

    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        image: ""
    });
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addProduct = async () => {

        await fetch("http://localhost:8080/api/products/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
    };

    // const fetchCategories = async () => {
    //     const res = await fetch(
    //         "http://localhost:8080/api/categories"
    //     );
    //     const data = await res.json();
    //     console.log(data)
    //     setCategories(data.categories);
    // };

    const fetchCategories = async () => {

        try {

            const res = await fetch(
                "http://localhost:8080/api/categories"
            );

            const data = await res.json();

            console.log("API DATA:", data);

            setCategories(data.categories);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

   const handleSubmit = async (e) => {

    e.preventDefault();

    console.log(form);

    await addProduct();

    navigate('/admin/product');
};

    return (

        <AdminLayout>
            <div className="w-full flex justify-center">

                <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-10">

                    <h1 className='text-2xl sm:text-3xl text-center font-bold underline mb-8'>
                        Add Product
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className='space-y-5'
                    >

                        {/* IMAGE */}
                        <div>

                            <input
                                type="text"
                                name="image"
                                placeholder="Enter image URL"
                                onChange={handleInputChange}
                                className='w-full border rounded-xl p-4 text-base sm:text-lg hover:bg-gray-100 outline-none'
                            />

                        </div>

                        {/* NAME */}
                        <div>

                            <input
                                type="text"
                                name='name'
                                placeholder='Enter Product Name'
                                onChange={handleInputChange}
                                className='w-full border rounded-xl p-4 text-base sm:text-lg hover:bg-gray-100 outline-none'
                            />

                        </div>

                        {/* PRICE + STOCK */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                            <input
                                type="number"
                                name='price'
                                placeholder='Enter Price'
                                onChange={handleInputChange}
                                className='w-full border rounded-xl p-4 text-base sm:text-lg hover:bg-gray-100 outline-none'
                            />

                            <input
                                type="number"
                                name='stock'
                                placeholder='Enter Stock'
                                onChange={handleInputChange}
                                className='w-full border rounded-xl p-4 text-base sm:text-lg hover:bg-gray-100 outline-none'
                            />

                        </div>

                        {/* CATEGORY */}
                        <div>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleInputChange}
                                className='w-full border rounded-xl p-4'
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {
                                    categories?.map((category) => (

                                        <option
                                            key={category._id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                        {/* DESCRIPTION */}
                        <div>

                            <textarea
                                name="description"
                                placeholder='Enter Description'
                                rows="6"
                                onChange={handleInputChange}
                                className='w-full border rounded-xl p-4 text-base sm:text-lg hover:bg-gray-100 outline-none resize-none'
                            />

                        </div>

                        {/* BUTTON */}
                        <div className='flex justify-center'>

                            <button
                                type='submit'
                                className='bg-green-500 hover:bg-green-600 text-white rounded-xl px-10 py-3 text-lg font-semibold cursor-pointer shadow-lg transition duration-300 w-full sm:w-auto'
                            >
                                Add Product
                            </button>



                        </div>

                    </form>

                </div>

            </div>
        </AdminLayout>
    );
};

export default AddProduct;