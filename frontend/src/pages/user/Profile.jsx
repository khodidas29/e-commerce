import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';

const Profile = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
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
            data.append("address", formData.address);
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

            const text = await response.text();
            console.log(text);

            const result = JSON.parse(text);

            if (!response.ok) {
                throw new Error(result.message);
            }

            localStorage.setItem("username", result.user.name);
            localStorage.setItem("address", result.user.address);

            toast.success("Profile Updated");

        } catch (error) {

            console.log(error);
            toast.error(error.message);
        }
    };
    const fetchProfile = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const result = await response.json();

            setFormData({
                name: result.user.name || "",
                email: result.user.email || "",
                address: result.user.address || "",
                image: null
            });

            if (result.user.image) {
                setPreview(
                    `http://localhost:8080/${result.user.image}`
                );
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

    fetchProfile();

}, []);
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

                    <textarea
                        name="address"
                        placeholder="Enter delivery address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="4"
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