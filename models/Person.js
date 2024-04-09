const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
