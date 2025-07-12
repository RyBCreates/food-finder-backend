const express = require("express");
const router = express.Router();
const { addFavorite } = require("../controllers/favoriteRecipes");

router.post("/", addFavorite);

module.exports = router;
