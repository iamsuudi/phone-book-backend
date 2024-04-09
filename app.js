const express = require('express');
const app = express.Router();
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./utils/logger');
const config = require('./utils/config');
const Person = require('./models/Person');

morgan.token('newContact', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    // logger.info(req.headers);person.id
    Person.find({}).then(response => {
        res.json(response);
    })
});

/* app.post('/', morgan(":method :url :status :response-time ms :newContact"), (req, res) => {
    // logger.info({id: generateId(), ...req.body}, ' is added');
    persons.push({id: generateId(), ...req.body});
    res.json({id: generateId(), ...req.body});
});

app.delete('/:id', (req, res) => {
    // logger.info(`Delete id: ${req.params.id}`);
    persons = persons.filter((person) => Number(person.id) !== Number(req.params.id));
    res.json(req.body);
});

app.get('/:id', (req, res) => {
    // find a specific contact
    res.json(persons.find(person => Number(person.id) === Number(req.params.id)));
}); */

module.exports = app;