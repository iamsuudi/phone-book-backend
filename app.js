const express = require('express');
const app = express.Router();
const cors = require('cors');

const logger = require('./utils/logger');
const persons = require('./persons');
const generateId = require('./generateId');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    // logger.info(req.headers);
    res.json(persons);
});

app.post('/', (req, res) => {
    logger.info(req.body);
    persons.push({id: generateId(), ...req.body});
    res.json(req.body);
});

app.delete('/:id', (req, res) => {
    logger.info(`Delete id: ${req.params.id}`);
    const index = persons.find(person => person.id === req.params.id);
    persons.splice(index, 1);
    res.json(req.body);
});

module.exports = app;