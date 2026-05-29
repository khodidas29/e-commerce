import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AddCategory = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        image: "",
        description: ""
    });
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const fetchCategories = async () => {

        try {

            const res = await fetch(
                "http://localhost:8080/api/categories"
            );

            const data = await res.json();

            setCategories(data.categories);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchCategories();

    }, []);

    const deleteCategory = async (id) => {

        try {

            const res = await fetch(
                `http://localhost:8080/api/categories/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await res.json();

            toast.success("Category Deleted");

            fetchCategories();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");
        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                "http://localhost:8080/api/categories/addCategory",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await res.json();
            toast.success("Category Added");

            console.log(data);

            // refresh category list

            fetchCategories();

            // clear form

            setForm({
                name: "",
                image: "",
                description: ""
            });

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <AdminLayout>

            <div className='max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg'>

                <h1 className='text-3xl font-bold mb-6 text-center'>
                    Add Category
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className='space-y-5'
                >

                    <input
                        type="text"
                        name="name"
                        placeholder='Category Name'
                        onChange={handleChange}
                        className='w-full border p-4 rounded-xl'
                    />

                    {/* <input
                        type="text"
                        name="image"
                        placeholder='Category Image URL'
                        onChange={handleChange}
                        className='w-full border p-4 rounded-xl'
                    />

                    <textarea
                        name="description"
                        placeholder='Category Description'
                        onChange={handleChange}
                        className='w-full border p-4 rounded-xl'
                        rows="5"
                    /> */}

                    <button
                        type='submit'
                        className='bg-green-500 text-white px-8 py-3 rounded-xl'
                    >
                        Add Category
                    </button>

                </form>

                <div className='mt-10'>

                    <h2 className='text-2xl font-bold mb-5'>
                        All Categories
                    </h2>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

                        {
                            categories.map((cat) => (

                                <div
                                    key={cat._id}
                                    className='bg-white border rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300'
                                >

                                    <div className='flex items-center justify-between'>

                                        <h3 className='text-lg font-bold text-gray-800'>
                                            {cat.name}
                                        </h3>

                                        <button
                                            onClick={() => deleteCategory(cat._id)}
                                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm'
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default AddCategory;