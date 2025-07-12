const Favorite = require("../models/FavoriteRecipes");
const transformSpoonacularRecipe = require("../utils/transformRecipeData");

// get Favorite Recipes

const getFavorites = async (req, res) => {
  try {
    const userId = req.query.userId || "user123";
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ error: "Failed to get favorites" });
  }
};

// Add Recipe to your favorites
const addFavorite = async (req, res) => {
  try {
    const { userId, recipe } = req.body;

    const favoriteData = transformSpoonacularRecipe(recipe, userId);

    const favorite = new Favorite(favoriteData);
    const saved = await favorite.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error in addFavorite:", err);
    res
      .status(500)
      .json({ error: "Failed to save favorite", details: err.message });
  }
};

module.exports = { addFavorite, getFavorites };
