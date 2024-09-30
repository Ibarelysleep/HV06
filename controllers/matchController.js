import User from "../models/userModel.js";
import Ground from "../models/groundModel.js";

// Match players based on sports preferences and location
export const matchPlayers = async (req, res) => {
  const { userId, sportPreference, location } = req.body;

  try {
    // Get the user initiating the match
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the user is a player
    if (currentUser.role !== "player") {
      return res
        .status(403)
        .json({ message: "Only players can match with other players" });
    }

    // Find other players with matching sport preferences and within the same location
    const matchedPlayers = await User.find({
      role: "player",
      sportsPreferences: sportPreference,
      location,
      _id: { $ne: currentUser._id }, // Exclude the current user
    });

    res.status(200).json({
      message: "Players matched successfully",
      matchedPlayers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Match available grounds based on sports preferences and location
export const matchGrounds = async (req, res) => {
  const { sportPreference, location } = req.body;

  try {
    // Find grounds available for the given sport and location with case-insensitive match
    const matchedGrounds = await Ground.find({
      availableSports: { $regex: new RegExp(sportPreference, "i") }, // case-insensitive match for sports
      location: { $regex: new RegExp(location, "i") }, // case-insensitive match for location
    });

    res.status(200).json({
      message: "Grounds matched successfully",
      matchedGrounds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
