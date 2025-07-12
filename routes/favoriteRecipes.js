const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favoriteRecipes");

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
