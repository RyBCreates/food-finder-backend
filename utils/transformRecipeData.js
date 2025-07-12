function transformSpoonacularRecipe(apiRecipe, userId) {
  return {
    userId,
    recipeId: apiRecipe.id,
    title: apiRecipe.title,
    image: apiRecipe.image,
    readyInMinutes: apiRecipe.readyInMinutes,
    pricePerServing: apiRecipe.pricePerServing,
    rating: apiRecipe.spoonacularScore || null,
    sourceUrl: apiRecipe.sourceUrl,

    extendedIngredients:
      apiRecipe.extendedIngredients?.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })) || [],

    instructions:
      apiRecipe.analyzedInstructions?.[0]?.steps?.map((step) => ({
        number: step.number,
        step: step.step,
      })) || [],
  };
}

module.exports = transformSpoonacularRecipe;
