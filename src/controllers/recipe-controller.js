const recipeService = require("../services/recipe-service")
const createError = require("../utils/create-error")
const recipeController = {}

recipeController.search = async (req,res,next) => {
    try{
        const searchTerm = req.query.search
        const searchArray = searchTerm.split('%20')
        const allSearchResult = []

        for (let word of searchArray) {
            word = `%${word}%`
            const result = await recipeService.search(word)
            if (Object(result).length > 0) allSearchResult.push(result)
        }
        res.status(200).json(allSearchResult)    
    
    } catch (err) {
        next(err)
    }
}

recipeController.createRecipe = async (req,res,next) => {
    try{
        

        if (Object.values(req.body).length === 0) createError('No input data', 400)

        const recipeData = req.body.recipe
        recipeData.ownerId = req.user.id
        await recipeService.createRecipe(recipeData)
        res.status(200).json('recipe created')


    } catch (err) {
        next(err)
    }
}

module.exports = recipeController