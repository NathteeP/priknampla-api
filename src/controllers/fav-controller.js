const favService = require("../services/fav-service")
const createError = require("../utils/create-error")

const favController = {}

favController.modifyFav = async (req,res,next) => {
    try{
        if (+req.params.userId !== req.user.id) createError('Bad request: wrong params', 400)

        const existFav = await favService.findRecipeRatingByUserIdAndRecipeId(req.user.id, +req.params.recipeId)

        if (existFav && existFav?.isFavorite === req.body.isFavorite) {
            existFav.isFavorite === true ? 
            createError('recipe is already user favorite', 400) :
            createError('recipe is already remove from favorite', 400)
            
        }

        if (Object.values(req.body).length === 0) createError('no data recieved', 400)

        req.body.userId = req.user.id
        req.body.recipeId = +req.params.recipeId
        const compoundId = {userId:req.user.id, recipeId:req.body.recipeId}
        
        
        existFav ? 
        await favService.modifyFavOrRating(compoundId, req.body) : 
        await favService.addFavOrRating(req.body)
        
        res.status(200).json('recipe add to your favorite')

    } catch (err) {
        next(err)
    }
}

favController.rateRecipe = async (req,res,next) => {
    try {

        if (+req.params.userId !== req.user.id) createError('Bad request: wrong params', 400)

        const existFav = await favService.findRecipeRatingByUserIdAndRecipeId(req.user.id, +req.params.recipeId)

        if (Object.values(req.body).length === 0) createError('no data recieved', 400)

        req.body.userId = req.user.id
        req.body.recipeId = +req.params.recipeId
        const compoundId = {userId:req.user.id, recipeId:req.body.recipeId}

        existFav ? 
        await favService.modifyFavOrRating(compoundId, req.body) : 
        await favService.addFavOrRating(req.body)

        res.status(200).json('rating submitted')
    } catch (err) {
        next(err)
    }
}

favController.getUserFav = async (req,res,next) => {
    try{
        const result = await favService.findAllUserFav(+req.params.userId)

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

module.exports = favController