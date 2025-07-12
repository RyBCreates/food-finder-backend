const mongoose = require("mongoose");

// Ingredient schema
const ingredientSchema = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    unit: String,
  },
  { _id: false }
);

// Step schema
const instructionStepSchema = new mongoose.Schema(
  {
    number: Number,
    step: String,
  },
  { _id: false }
);

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  recipeId: Number,
  title: String,
  image: String,
  readyInMinutes: Number,
  pricePerServing: Number,
  extendedIngredients: [ingredientSchema],
  instructions: [instructionStepSchema],
});

module.exports = mongoose.model("Favorite", favoriteSchema);
