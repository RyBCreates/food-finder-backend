const express = require("express");
const router = express.Router();

const recipeRoutes = require("./recipes");
const favoriteRecipeRoutes = require("./favoriteRecipes");

router.use("/recipes", recipeRoutes);
router.use("/favorites", favoriteRecipeRoutes);

module.exports = router;
