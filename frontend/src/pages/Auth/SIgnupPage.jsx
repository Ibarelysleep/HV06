import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SIgnupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    description: "",
    role: "player",
    sportsPreferences: "",
    location: "",
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

      // API call to register user
      const response = await fetch(`http://localhost:5000/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration Failed");
      }

      const data = await response.json();

      console.log("Registration success", data);

      // Saving token and user ID in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.newUser._id);

      // Redirecting to home or dashboard aftersignup
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block">Username</label>
          <input
            type="text"
            name="userName"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.userName}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.fullName}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Description</label>
          <input
            type="text"
            name="description"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.description}
          />
        </div>
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
          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 bg-white rounded"
          >
            <option value="player">Player</option>
            <option value="groundOwner">Land Owner</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Sports Preferences</label>
          <input
            type="text"
            name="sportsPreferences"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.sportsPreferences}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Location</label>
          <input
            type="text"
            name="location"
            className="w-full p-2 border-2 border-blue-300 rounded"
            required
            onChange={handleChange}
            value={formData.location}
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
            Signup
          </button>
          <Link
            to="/login"
            className="text-sm border-b border-green-400 hover:border-green-500"
          >
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SIgnupPage;
