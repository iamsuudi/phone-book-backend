const express = require('express')
const {
    getAllPerson,
    createPerson,
    getPerson,
    updatePerson,
    deletePerson,
} = require('../controllers/persons.controller')

const personRouter = express.Router();

personRouter.get('/persons', getAllPerson)
personRouter.post('/persons', createPerson)
personRouter.get('/persons/:personId', getPerson)
personRouter.put('/persons/:personId', updatePerson)
personRouter.delete('/persons/:personId', deletePerson)

module.exports = personRouter
