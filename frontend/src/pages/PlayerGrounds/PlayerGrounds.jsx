// PlayerGrounds.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerGrounds = () => {
  const [location, setLocation] = useState("");
  const [grounds, setGrounds] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post("http://localhost:5000/api/grounds", {
        location,
      });
      setGrounds(response.data.grounds);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Search Grounds</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md flex-grow mb-2 md:mb-0"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Display Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Grounds List */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Available Grounds</h3>
        {grounds.length > 0 ? (
          <ul className="border border-gray-300 rounded-lg p-4">
            {grounds.map((ground) => (
              <li
                key={ground._id}
                className="flex justify-between p-2 border-b border-gray-200"
              >
                <div>
                  <strong>{ground.name}</strong>
                  <p className="text-gray-600">Location: {ground.location}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No grounds found.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerGrounds;
