const prisma = require("../models/prisma")

const favService = {}

favService.findRecipeRatingByUserIdAndRecipeId = (userId, recipeId) => 
    prisma.recipeRating.findFirst({
        where: {
            userId: userId,
            recipeId: recipeId
        }
    })

favService.findAllUserFav = (userId) => 
    prisma.recipeRating.findMany({
        where:{
            userId: userId,
            isFavorite: true
        },
        include: {
            recipe: {
                include: {
                    user: {
                        select: {
                            displayName:true
                        }
                    }
                }
            }
        }
    })

favService.addFavOrRating = (data) => 
    prisma.recipeRating.create({data})


favService.modifyFavOrRating = (compoundId, newData) => 
    prisma.recipeRating.update({
        where: {
            userId_recipeId: compoundId
        },
        data: newData
    })


module.exports = favService