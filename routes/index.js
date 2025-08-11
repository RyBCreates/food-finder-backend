const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const recipeRoutes = require("./recipes");
const favorites = require("./favoriteRecipes");

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);
router.use("/favorites", favorites);

module.exports = router;
