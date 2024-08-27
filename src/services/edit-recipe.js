const recipeService = require("./recipe-service");

const editRecipe = async (req, res, next) => {
    try {
        if (Object.values(req.body).length === 0) createError('No input data', 400);

        const recipeId = req.params.id;
        const existingRecipe = await recipeService.findRecipeById(recipeId);
        if (!existingRecipe) createError('Recipe not found', 404);

        const recipeData = req.body;
        const updatingRecipeHeader = { ...recipeData }
        delete updatingRecipeHeader.step;
        delete updatingRecipeHeader.ingredientsTable;
        delete updatingRecipeHeader.id;
        delete updatingRecipeHeader.ownerId;
        delete updatingRecipeHeader.user;
        await recipeService.updateRecipeHeaderByRecipeId(updatingRecipeHeader, recipeData.id);

        // Delete existing ingredients tables and their ingredients
        for (let el of existingRecipe.ingredientsTable) {
            await recipeService.deleteIngredientsByTableId(el.tableId);
        }
        await recipeService.deleteIngredientsTablesByRecipeId(recipeData.id);

        // Create new ingredients tables and their ingredients
        for (let el of req.body.ingredientsTable) {
            const ingredientsTableData = {
                recipeId: recipeData.id,
                header: el.header
            };
            const tableIdRes = await recipeService.createIngredientsTable(ingredientsTableData);
            const ingredientsData = el.ingredient;
            ingredientsData.forEach(element => element.tableId = tableIdRes.tableId);
            await recipeService.createManyIngredients(ingredientsData);
        }

        // Update Steps
        const stepData = req.body.step;
        stepData.forEach(element => {
            element.recipeId = recipeData.id;
        });

        // Delete old steps and insert new ones
        await recipeService.deleteStepsByRecipeId(recipeData.id);
        await recipeService.createManySteps(stepData);

        res.status(200).json(req.body);
    } catch (err) {
        next(err);
    }
};

module.exports = editRecipe;