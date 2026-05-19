import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { toast } from 'react-toastify';

const Users = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        try {
            
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setUsers(data.users);

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE USER
    const deleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {

                 toast.error("User Removed");
                //alert(data.message);

                // remove deleted user from state
                setUsers(users.filter((user) => user._id !== id));

            } else {

                //alert(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <AdminLayout>

            <div className="bg-white p-6 rounded-2xl shadow-md">

                <h1 className="text-3xl font-bold mb-6">
                    All Users
                </h1>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Role
                                </th>

                                <th className="p-4 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                users.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {user.name}
                                        </td>

                                        <td className="p-4">
                                            {user.email}
                                        </td>

                                        <td className="p-4">
                                            {user.role || "User"}
                                        </td>

                                        <td className="p-4">

                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>
    );
};

export default Users;