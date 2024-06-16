const prisma = require("../models/prisma")

const recipeService = {}

recipeService.createRecipeHeader = data => prisma.recipe.create({data})
recipeService.createIngredientsTable = data => prisma.ingredientsTable.create({data})
recipeService.createManyIngredients = data => prisma.ingredient.createMany({data})
recipeService.createManySteps = data => prisma.step.createMany({data})


recipeService.search = async input => {
    return await prisma.$queryRaw`SELECT * FROM recipe WHERE name like ${input}`
}
module.exports = recipeService