const Favorite = require("../models/FavoriteRecipes");
const transformSpoonacularRecipe = require("../utils/transformRecipeData");

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

module.exports = { addFavorite };
