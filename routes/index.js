const express = require("express");
const router = express.Router();

const recipeRoutes = require("./recipes");
const favorites = require("./favoriteRecipes");

router.use("/recipes", recipeRoutes);
router.use("/favorites", favorites);

module.exports = router;
