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

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    image: { type: String, required: true },
    recipeId: { type: Number, required: true },
    readyInMinutes: { type: Number, required: true },
    pricePerServing: { type: Number, required: true },
    extendedIngredients: [ingredientSchema],
    instructions: [instructionStepSchema],
    aggregateLikes: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
