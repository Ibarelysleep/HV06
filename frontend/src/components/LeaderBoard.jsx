import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await axios.get(
          "http://localhost:5000/api/gamify/leaderboard"
        ); // Adjust API endpoint

        // Check if the response data is an array or if you need to access another field
        if (Array.isArray(leaderboardResponse.data)) {
          setLeaderboard(leaderboardResponse.data);
        } else {
          // Handle case where leaderboard data might be inside another object
          setLeaderboard(leaderboardResponse.data.leaderboard || []); // Adjust based on actual response structure
        }
        setLoading(false); // Data loaded
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError("Failed to load leaderboard data.");
        setLoading(false); // Data load error
      }
    };

    fetchData();
  }, []);

  // Show loading or error messages if necessary
  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Leaderboard</h3>
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-4 text-left">Rank</th>
            <th className="border border-gray-300 p-4 text-left">Player</th>
            <th className="border border-gray-300 p-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((player, index) => (
              <tr
                key={player.id}
                className="hover:bg-gray-100 transition duration-150"
              >
                <td className="border border-gray-300 p-4">{index + 1}</td>
                <td className="border border-gray-300 p-4">
                  {player.fullName}
                </td>
                <td className="border border-gray-300 p-4">{player.points}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 p-4 text-center text-gray-500"
              >
                No players found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
