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
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <div>

            {/* Register switch */}
            <p className="text-center text-gray-600">
              Create new account {" "}
              <button
                onClick={() => navigate("/register")}
                className="text-purple-600 font-semibold hover:underline"
              >
                Register
              </button>
            </p>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Login;