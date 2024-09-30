import User from "../models/userModel.js";

// Match players based on sports preferences and location, and award points
export const matchPlayers = async (req, res) => {
  const { sportPreference, location, userId } = req.body;

  try {
    // Log input data for debugging
    console.log("Matching players with:", {
      sportPreference,
      location,
      userId,
    });

    // Check if the requesting user exists and is a player
    const requestingPlayer = await User.findById(userId);

    if (!requestingPlayer || requestingPlayer.role !== "player") {
      return res
        .status(404)
        .json({ message: "Requesting player not found or not a player." });
    }

    // Find players with matching preferences and location (excluding the requester)
    const matchedPlayers = await User.find({
      role: "player",
      sportsPreferences: sportPreference,
      location,
      _id: { $ne: userId }, // Exclude the player making the request
    });

    // Log matched players for debugging
    console.log("Matched players:", matchedPlayers);

    // If there are matched players, increase the score of the requesting player and matched players
    if (matchedPlayers.length > 0) {
      // Award points to the requesting player for successfully matching
      requestingPlayer.points += 10; // Award 10 points to the requesting player
      await requestingPlayer.save();

      // Award points to matched players
      matchedPlayers.forEach(async (player) => {
        player.points += 5; // Award 5 points to each matched player
        await player.save();
      });

      res.status(200).json({
        message: "Players matched successfully, points awarded.",
        matchedPlayers,
      });
    } else {
      res.status(200).json({ message: "No players matched." });
    }
  } catch (error) {
    console.error("Error matching players:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get the top players for the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    // Fetch the top players sorted by points in descending order
    const topPlayers = await User.find({ role: "player" })
      .sort({ points: -1 }) // Sort players by points in descending order
      .limit(10) // Limit to the top 10 players
      .select("userName points fullName"); // Only return necessary fields

    res.status(200).json({
      message: "Leaderboard fetched successfully",
      leaderboard: topPlayers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
