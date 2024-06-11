require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRouter = require('./routes/auth-route')
const notFoundMiddleware = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error')
const recipeRouter = require('./routes/recipe-route')
const favRouter = require('./routes/fav-route')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/recipe', recipeRouter)
app.use('/fav', favRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))