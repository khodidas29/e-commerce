import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // login API
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // store token
      localStorage.setItem("userId", data.user._id)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("address", data.user.address);

      // store user name
      localStorage.setItem("username", data.user.name);

      navigate("/");
      toast.success("Login successfull")
      if (data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {

      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100 px-4">

    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl">

      {/* Heading */}

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Welcome Back
      </h2>

      <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
        Login to continue shopping
      </p>

      {/* Error */}

      {error && (
        <p className="text-red-500 text-center mb-4 text-sm">
          {error}
        </p>
      )}

      {/* Form */}

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        {/* Email */}

        <div>

          <label className="block text-gray-700 mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

        </div>

        {/* Password */}

        <div>

          <label className="block text-gray-700 mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

        </div>

        {/* Button */}

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Login
        </button>

        {/* Register */}

        <p className="text-center text-gray-600 text-sm sm:text-base">

          Create new account?{" "}

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </button>

        </p>

      </form>

    </div>

  </div>
  );
};

export default Login;