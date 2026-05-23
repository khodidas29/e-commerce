import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import { toast } from 'react-toastify';

const UpdateProduct = () => {

const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
        category: "",
        stock: ""
    });

    const fetchSingleProduct = async () => {

        try {

            const res = await fetch(
                `http://localhost:8080/api/products/${id}`
            );

            const data = await res.json();

            setFormData(data.product);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchSingleProduct();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                `http://localhost:8080/api/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await res.json();

            console.log(data);

            toast.success("Product Updated Successfully");

            navigate("/admin/product");

        } catch (error) {

            toast.error("Update Failed");
        }
    };

    return (

        <AdminLayout>

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

                <h1 className="text-4xl font-bold mb-8 text-center">
                    Update Product
                </h1>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-6"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl outline-none"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl outline-none"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl outline-none"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border p-4 rounded-xl outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold"
                    >
                        Update Product
                    </button>

                </form>

            </div>

        </AdminLayout>
    );
};

export default UpdateProduct;