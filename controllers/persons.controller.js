// const logger = require('../utils/logger')
const Person = require('../models/Person')

exports.getAllPerson = async (req, res) => {
    // logger.info(req.headers);person.id
    const persons = await Person.find({})

    // logger.info('Total documents: ', persons.length)

    return res.status(200).json(persons)
}

exports.getPerson = async (req, res) => {
    // logger.info(req.headers);person.id
    const { personId } = req.params

    const person = await Person.findById(personId)

    return res.status(200).json(person)
}

exports.createPerson = async (req, res) => {
    const data = req.body

    const person = await Person.create({ ...data })

    return res.status(200).json(person)
}

exports.deletePerson = async (req, res) => {
    await Person.findOneAndDelete(req.params.id)

    return res.sendStatus(204)
}

exports.updatePerson = async (req, res) => {
    // find a specific contact
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, {
        ...req.body,
    })

    return res.status(201).json(updatedPerson)
}
