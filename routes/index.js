const express = require("express");
const router = express.Router();

const recipeRoutes = require("./recipes");

router.use("/recipes", recipeRoutes);

module.exports = router;
