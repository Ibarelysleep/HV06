import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data", formData);

      // API call to login user
      const response = await fetch(`http://localhost:5000/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success", data);
        // Saving token and user ID in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.user._id);

        // Redirecting to home or dashboard after login
        navigate("/dashboard");
      } else {
        console.error("Login error", data.message);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-sm border-b border-green-400 hover:border-green-500"
          >
            Don't have an account? Signup here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
