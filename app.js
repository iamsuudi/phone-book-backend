const express = require('express');
const app = express.Router();
const cors = require('cors');

const logger = require('./utils/logger');
let persons = require('./persons');
const generateId = require('./generateId');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    // logger.info(req.headers);person.id
    res.json(persons);
});

app.post('/', (req, res) => {
    logger.info({id: generateId(), ...req.body}, ' is added');
    persons.push({id: generateId(), ...req.body});
    res.json({id: generateId(), ...req.body});
});

app.delete('/:id', (req, res) => {
    logger.info(`Delete id: ${req.params.id}`);
    persons = persons.filter((person) => Number(person.id) !== Number(req.params.id));
    res.json(req.body);
});

app.get('/:id', (req, res) => {
    // find a specific contact
    res.json(persons.find(person => Number(person.id) === Number(req.params.id)));
});

module.exports = app;