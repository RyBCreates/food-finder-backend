const Favorite = require("../models/FavoriteRecipes");
const transformSpoonacularRecipe = require("../utils/transformRecipeData");

// get Favorite Recipes

const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
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
    const { recipe } = req.body;
    const userId = req.user._id;

    if (!userId || !recipe || !recipe.id) {
      return res.status(400).json({ message: "Missing required data" });
    }

    const favoriteData = transformSpoonacularRecipe(recipe, userId);
    const existing = await Favorite.findOne({ userId, recipeId: recipe.id });
    if (existing) {
      return res.status(409).json({ message: "Recipe already favorited" });
    }

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

// Delete a Favorite Recipe
const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Favorite.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted", id });
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
};

module.exports = { addFavorite, getFavorites, deleteFavorite };
