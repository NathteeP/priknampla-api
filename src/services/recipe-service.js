const prisma = require("../models/prisma")

const recipeService = {}

recipeService.createRecipe = data => prisma.recipe.create({data})

recipeService.search = async input => {
    return await prisma.$queryRaw`SELECT * FROM recipe WHERE name like ${input}`
}
module.exports = recipeService