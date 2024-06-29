const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const personRouter = require('./routers/persons.router')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('connecting to mongodb')

mongoose
    .connect(config.mongoURL)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', personRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
