const createError = require("../utils/create-error")
const recipeService = require("./recipe-service")

const createRecipe = async (req,res,next) => {
    try{
        
        if (Object.values(req.body).length === 0) createError('No input data', 400)

        const recipeData = req.body.recipe
        recipeData.ownerId = req.user.id
        const recipeRes = await recipeService.createRecipeHeader(recipeData)

        for (let el of req.body.ingredientsTable) {
            const ingredientsTableData = {
                recipeId: recipeRes.id,
                header: el.header
            }
            const tableIdRes = await recipeService.createIngredientsTable(ingredientsTableData)
            const ingredientsData = el.ingredient
            ingredientsData.forEach(element => element.tableId = tableIdRes.tableId)
            await recipeService.createManyIngredients(ingredientsData)
        }

        const stepData = req.body.step
        stepData.forEach(element => {
            element.recipeId = recipeRes.id
        });

        await recipeService.createManySteps(stepData)

        res.status(200).json(req.body)

    } catch (err) {
        next(err)
    }
}

module.exports = createRecipe