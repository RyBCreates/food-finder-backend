const { findById } = require("../models/FavoriteRecipes");
const User = require("../models/user");

// GET a User
const getUser = async (req, res) => {
  const User = await findById(req.body);

  try {
    res.status(200).json(User);
  } catch (err) {
    console.error("Error fetching User info", err);
    res.status(500).json({ error: "Failed to fetch User" });
  }
};

// POST - Update a User's Info

module.exports = { getUser, updateUser };
