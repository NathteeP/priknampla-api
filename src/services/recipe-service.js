const prisma = require("../models/prisma")

const recipeService = {}

recipeService.createRecipe = data => prisma.recipe.create({data})

module.exports = recipeService