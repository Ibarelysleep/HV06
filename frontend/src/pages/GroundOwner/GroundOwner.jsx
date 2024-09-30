import React, { useEffect, useState } from "react";
import axios from "axios";

const GroundOwner = ({ userId }) => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    availableSports: [],
    pricePerHour: "",
    availability: "",
  });

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get(`/api/grounds/owner/${userId}`);
        setGrounds(response.data.grounds);
      } catch (err) {
        setError(err.response.data.message || "Failed to fetch grounds");
      } finally {
        setLoading(false);
      }
    };

    fetchGrounds();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailableSportsChange = (e) => {
    const { options } = e.target;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormData((prev) => ({
      ...prev,
      availableSports: values,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/grounds", {
        ...formData,
        ownerId: userId, // Pass the owner ID
      });
      setGrounds((prev) => [...prev, response.data.ground]); // Update the state with the new ground
      setFormData({
        name: "",
        location: "",
        availableSports: [],
        pricePerHour: "",
        availability: "",
      });
    } catch (err) {
      setError(err.response.data.message || "Failed to create ground");
    }
  };

  //   if (loading) return <p className="text-center">Loading grounds...</p>;
  //   if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Grounds</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="location">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="availableSports">
            Available Sports:
          </label>
          <select
            multiple
            name="availableSports"
            onChange={handleAvailableSportsChange}
            required
            className="w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Cricket">Cricket</option>
            {/* Add more sports as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="pricePerHour">
            Price per Hour:
          </label>
          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="availability">
            Availability:
          </label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 transition"
        >
          Add Ground
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-4">Existing Grounds</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {grounds.map((ground) => (
          <li
            key={ground._id}
            className="border-b border-gray-200 last:border-b-0 mb-4 pb-2"
          >
            <h3 className="text-lg font-bold">{ground.name}</h3>
            <p className="text-gray-700">Location: {ground.location}</p>
            <p className="text-gray-700">
              Available Sports: {ground.availableSports.join(", ")}
            </p>
            <p className="text-gray-700">
              Price per Hour: ${ground.pricePerHour}
            </p>
            <p className="text-gray-700">Availability: {ground.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroundOwner;
