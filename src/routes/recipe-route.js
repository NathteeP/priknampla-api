const express = require('express')
const recipeController = require('../controllers/recipe-controller')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')

const recipeRouter = express.Router()

recipeRouter.get('/', recipeController.search)
recipeRouter.get('/:recipeId', recipeController.getRecipe)
recipeRouter.post('/', authenticate, recipeController.createRecipe)
recipeRouter.patch('/picture', upload.single('picture'),
recipeController.uploadRecipePicture)

module.exports = recipeRouter