import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useNavigate } from 'react-router';

const AddCategory = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        image: "",
        description: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
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

            console.log(data);

            navigate("/admin/add-product");

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

            </div>

        </AdminLayout>
    );
};

export default AddCategory;