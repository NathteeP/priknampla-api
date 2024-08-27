const { picture } = require("../config/cloudinary")
const createRecipe = require("../services/create-recipe")
const editRecipe = require("../services/edit-recipe")
const recipeService = require("../services/recipe-service")
const uploadService = require("../services/upload-service")
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

recipeController.getRecipe = async (req,res,next) => {
    try{
        const result = await recipeService.findRecipeById(+req.params.recipeId)
        res.status(200).json(result)
    } catch (err) {
        next (err)
    }
}

recipeController.createRecipe = createRecipe
recipeController.editRecipe = editRecipe

recipeController.uploadRecipePicture = async (req,res,next) => {
    try {

            const result = await uploadService.upload(req.file.path)
        await recipeService.updateRecipeHeaderByRecipeId({picture: result},+req.body.recipeId)

        res.status(200).json('test')
    } catch (err){
        next(err)
    }
}

recipeController.getRecipeRating =  async (req,res,next) => {
    try{
        const result = await recipeService.getRecipeRating(+req.params.recipeId)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

module.exports = recipeController