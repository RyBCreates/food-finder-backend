const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favoriteRecipes");

router.get("/", auth, getFavorites);
router.post("/", auth, addFavorite);
router.delete("/:id", auth, deleteFavorite);

module.exports = router;
