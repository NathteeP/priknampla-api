const express = require('express')
const authenticate = require('../middlewares/authenticate')
const favController = require('../controllers/fav-controller')

const favRouter = express.Router()

favRouter.patch('/:userId/:recipeId', authenticate, favController.modifyFav)
favRouter.patch('/:userId/:recipeId/rate', authenticate, favController.rateRecipe)
favRouter.get('/:userId', authenticate, favController.getUserFav)

module.exports = favRouter