const mockRecipes = require("../utils/mockRecipes");

const getRecipes = (req, res) => {
  res.json(mockRecipes);
};

module.exports = { getRecipes };
