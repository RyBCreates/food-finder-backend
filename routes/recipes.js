const express = require("express");
const router = express.Router();
const { getRecipes } = require("../controllers/recipes");

// Get all recipes
router.get("/", getRecipes);

module.exports = router;
