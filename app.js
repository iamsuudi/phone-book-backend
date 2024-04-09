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
        logger.info('Total documents: ', response.length);
        res.json(response);
    })
});

app.post('/', morgan(":method :url :status :response-time ms :newContact"), (req, res) => {
    
    if (!req.body) {
        return res.send(400).json({error: 'Empty content'})
    }

    const newPerson = new Person({...req.body});
    newPerson.save().then(response => {
        // persons.push({id: generateId(), ...req.body});
        res.json(response);
    })
});

app.delete('/:id', (req, res) => {
    
    Person.findOneAndDelete(req.params.id).then(response => {
        logger.info('id: ', req.params.id);
        res.json(response);
    });
});

/* app.get('/:id', (req, res) => {
    // find a specific contact
    res.json(persons.find(person => Number(person.id) === Number(req.params.id)));
}); */

module.exports = app;