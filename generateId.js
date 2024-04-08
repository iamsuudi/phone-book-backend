const persons = require('./persons');

const generateId = () => {
    const maxId = Math.max([...persons.map(person => person.id), 0]);
    return maxId + 1;
}

module.exports = generateId;