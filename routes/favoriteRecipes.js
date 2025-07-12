const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites } = require("../controllers/favoriteRecipes");

router.get("/", getFavorites);
router.post("/", addFavorite);

module.exports = router;
