const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: (v) => /^(\d{3}-\d{2}-\d{4})$/.test(v),
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: true,
    },
})

/* eslint no-param-reassign: 0, no-underscore-dangle: 0
    ------------
    We are ignoring these eslint rules as we must override the returned document schema from mongodb
 */
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
