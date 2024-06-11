const express = require('express')
const recipeController = require('../controllers/recipe-controller')
const authenticate = require('../middlewares/authenticate')

const recipeRouter = express.Router()

recipeRouter.get('/', recipeController.search)
recipeRouter.post('/', authenticate, recipeController.createRecipe)

module.exports = recipeRouter