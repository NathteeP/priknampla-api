const prisma = require("../models/prisma")

const recipeService = {}

recipeService.createRecipeHeader = data => prisma.recipe.create({data})
recipeService.createIngredientsTable = data => prisma.ingredientsTable.create({data})
recipeService.createManyIngredients = data => prisma.ingredient.createMany({data})
recipeService.createManySteps = data => prisma.step.createMany({data})
recipeService.updateRecipeHeaderByRecipeId = (data,recipeId) => prisma.recipe.update({data, where: {id:recipeId}})
recipeService.findRecipeById = recipeId => prisma.recipe.findFirst({where: {id:recipeId},
    include: {
        step: true,
        user: {
            select: {
                displayName: true
            }
        },
        ingredientsTable: {
            include: {
                ingredient: true
            }
        }
    }
   
})


recipeService.search = async input => {
    return await prisma.$queryRaw`SELECT r.id, r.name, r.preparedTime, r.picture, u.displayName FROM recipe r INNER JOIN user u ON r.ownerId=u.id WHERE name like ${input}`
}
module.exports = recipeService