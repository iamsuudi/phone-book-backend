const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: (v) => {
                return /^(\d{3}-\d{2}-\d{4})$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: true,
    },
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
