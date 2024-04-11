const express = require('express')

const logger = require('../utils/logger')
const Person = require('../models/Person')

const personRouter = express.Router()

personRouter.get('/', (req, res) => {
    // logger.info(req.headers);person.id
    Person.find({}).then((response) => {
        logger.info('Total documents: ', response.length)
        res.json(response)
    })
})

personRouter.post(
    '/',
    (req, res, next) => {
        const newPerson = new Person({ ...req.body })
        newPerson
            .save()
            .then((response) => {
                // persons.push({id: generateId(), ...req.body});
                res.json(response)
            })
            .catch((error) => {
                next(error)
            })
    },
)

personRouter.delete('/:id', (req, res) => {
    Person.findOneAndDelete(req.params.id).then((response) => {
        logger.info('id: ', req.params.id)
        res.json(response)
    })
})

personRouter.put('/:id', (req, res, next) => {
    // find a specific contact
    const UpdatedPerson = { ...req.body }
    Person.findByIdAndUpdate(req.params.id, UpdatedPerson, {
        new: true,
        runValidators: true,
    })
        .then((updatedData) => {
            res.json(updatedData)
        })
        .catch((error) => {
            next(error)
        })
})

/* eslint consistent-return: 0, no-else-return: 0 */
personRouter.use((error, req, res, next) => {
    // logger.info(error);
    logger.info(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
})

module.exports = personRouter
