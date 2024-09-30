// import Ground from "../models/groundModel.js"; // Adjust the path as necessary
// import jwt from "jsonwebtoken";

// export const createGround = async (req, res) => {
//   const { name, location, availableSports, pricePerHour, availability } =
//     req.body;
//   const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "No token provided, authorization denied." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
//     const owner = decoded.id; // Get the owner's ID from the decoded token

//     const newGround = new Ground({
//       name,
//       location,
//       owner, // Set the owner ID
//       availableSports,
//       pricePerHour,
//       availability,
//     });

//     await newGround.save();
//     res
//       .status(201)
//       .json({ message: "Ground created successfully", ground: newGround });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

// // Example for getting all grounds
// export const getGrounds = async (req, res) => {
//   try {
//     const grounds = await Ground.find();
//     res.status(200).json(grounds);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

// // Example for updating a ground
// export const updateGround = async (req, res) => {
//   const { id } = req.params; // Ground ID from URL
//   const updates = req.body; // Get updated fields from request body

//   try {
//     const updatedGround = await Ground.findByIdAndUpdate(id, updates, {
//       new: true,
//     });
//     if (!updatedGround) {
//       return res.status(404).json({ message: "Ground not found." });
//     }
//     res
//       .status(200)
//       .json({ message: "Ground updated successfully", ground: updatedGround });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

// // Example for deleting a ground
// export const deleteGround = async (req, res) => {
//   const { id } = req.params; // Ground ID from URL

//   try {
//     const deletedGround = await Ground.findByIdAndDelete(id);
//     if (!deletedGround) {
//       return res.status(404).json({ message: "Ground not found." });
//     }
//     res.status(200).json({ message: "Ground deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

import Ground from "../models/groundModel.js";
import User from "../models/userModel.js";

// Create a new ground (for groundOwner)
export const createGround = async (req, res) => {
  const {
    ownerId,
    name,
    location,
    availableSports,
    pricePerHour,
    availability,
  } = req.body;

  try {
    // Check if the owner exists and has the "groundOwner" role
    const owner = await User.findById(ownerId);
    if (!owner || owner.role !== "groundOwner") {
      return res
        .status(404)
        .json({ message: "Owner not found or not authorized to add grounds." });
    }

    // Create a new ground
    const newGround = new Ground({
      owner: ownerId,
      name,
      location,
      availableSports,
      pricePerHour,
      availability,
    });

    await newGround.save();

    // Add the ground ID to the owner's groundsOwned array
    owner.groundsOwned.push(newGround._id);
    await owner.save();

    res
      .status(201)
      .json({ message: "Ground created successfully", ground: newGround });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing ground
export const updateGround = async (req, res) => {
  const {
    groundId,
    name,
    location,
    availableSports,
    pricePerHour,
    availability,
  } = req.body;

  try {
    // Find the ground by ID
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found." });
    }

    // Update ground details
    ground.name = name || ground.name;
    ground.location = location || ground.location;
    ground.availableSports = availableSports || ground.availableSports;
    ground.pricePerHour = pricePerHour || ground.pricePerHour;
    ground.availability = availability || ground.availability;

    await ground.save();

    res.status(200).json({ message: "Ground updated successfully", ground });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a ground
export const deleteGround = async (req, res) => {
  const { groundId } = req.body;

  try {
    // Find the ground by ID
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found." });
    }

    // Remove the ground from the database
    await Ground.findByIdAndRemove(groundId);

    // Remove the ground ID from the owner's groundsOwned array
    const owner = await User.findById(ground.owner);
    if (owner) {
      owner.groundsOwned = owner.groundsOwned.filter(
        (id) => id.toString() !== groundId
      );
      await owner.save();
    }

    res.status(200).json({ message: "Ground deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all grounds for a specific owner
export const getGroundsByOwner = async (req, res) => {
  const { ownerId } = req.params;

  try {
    // Find all grounds for the owner
    const grounds = await Ground.find({ owner: ownerId });
    if (grounds.length === 0) {
      return res
        .status(404)
        .json({ message: "No grounds found for this owner." });
    }

    res
      .status(200)
      .json({ message: "Grounds retrieved successfully", grounds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// // Example for getting all grounds
export const getGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find();
    res.status(200).json(grounds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
