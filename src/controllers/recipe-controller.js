const createRecipe = require("../services/create-recipe")
const recipeService = require("../services/recipe-service")
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

recipeController.createRecipe = createRecipe

module.exports = recipeController