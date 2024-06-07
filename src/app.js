require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRouter = require('./routes/auth-route')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/auth', authRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))