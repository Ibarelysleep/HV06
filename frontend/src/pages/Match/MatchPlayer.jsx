import React, { useState } from "react";
import axios from "axios";

const MatchPlayer = ({ CurrentUser }) => {
  const [sportPreference, setSportPreference] = useState("");
  const [location, setLocation] = useState("");
  const [matchedPlayers, setMatchedPlayers] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("id");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post(
        "http://localhost:5000/api/match/players",
        {
          userId,
          sportPreference,
          location,
        }
      );
      setMatchedPlayers(response.data.matchedPlayers);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  // Updated handleMatch function
  const handleMatch = async (opponentId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/match/record", // Make sure this is your correct endpoint
        {
          userId, // Use the user ID from CurrentUser
          opponentId, // This is passed from the button click
          score: { playerScore: 0, opponentScore: 0 }, // Adjust according to your needs
        }
      );
      alert(response.data.message);
      // Optionally refresh matched players or redirect to a different page
    } catch (error) {
      alert(error.response ? error.response.data.message : "Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Match Players</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Sport Preference"
            value={sportPreference}
            onChange={(e) => setSportPreference(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md flex-grow mb-2 md:mb-0"
          />
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

      {/* Matched Players List */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Matched Players</h3>
        {matchedPlayers.length > 0 ? (
          <ul className="border border-gray-300 rounded-lg p-4">
            {matchedPlayers.map((player) => (
              <li
                key={player._id}
                className="flex justify-between p-2 border-b border-gray-200"
              >
                <div>
                  <strong>{player.fullName}</strong>
                  <p className="text-gray-600">Location: {player.location}</p>
                  <p className="text-gray-600">
                    Sports Preferences: {player.sportsPreferences.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleMatch(player._id)}
                  className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                >
                  Match
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No players matched.</p>
        )}
      </div>
    </div>
  );
};

export default MatchPlayer;
