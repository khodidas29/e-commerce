import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Profile = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: null
    });

    const [preview, setPreview] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        setFormData({
            ...formData,
            image: file
        });

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("image", formData.image);

            const response = await fetch(
                "http://localhost:8080/api/users/update-profile",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: data
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            localStorage.setItem("username", result.user.name);

            toast.success("Profile Updated");

        } catch (error) {

            console.log(error);
            toast.error(error.message);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Update Profile
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="flex justify-center">

                        <img
                            src={
                                preview ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-400"
                        />

                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded-lg"
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Update Profile
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Profile;