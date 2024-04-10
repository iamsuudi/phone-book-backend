const express = require("express");
const app = express.Router();
const cors = require("cors");
const morgan = require("morgan");

const logger = require("./utils/logger");
const config = require("./utils/config");
const Person = require("./models/Person");

morgan.token("newContact", (req, res) => {
    return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    // logger.info(req.headers);person.id
    Person.find({}).then((response) => {
        logger.info("Total documents: ", response.length);
        res.json(response);
    });
});

app.post(
    "/",
    morgan(":method :url :status :response-time ms :newContact"),
    (req, res, next) => {
        const newPerson = new Person({ ...req.body });
        newPerson
            .save()
            .then((response) => {
                // persons.push({id: generateId(), ...req.body});
                res.json(response);
            })
            .catch((error) => {
                next(error);
            });
    }
);

app.delete("/:id", (req, res) => {
    Person.findOneAndDelete(req.params.id).then((response) => {
        logger.info("id: ", req.params.id);
        res.json(response);
    });
});

app.put("/:id", (req, res, next) => {
    // find a specific contact
    const UpdatedPerson = { ...req.body };
    Person.findByIdAndUpdate(req.params.id, UpdatedPerson, {
        new: true,
        runValidators: true,
    }).then((updatedData) => {
        res.json(updatedData);
    }).catch((error) => {
        next(error);
    });
});

app.use((error, req, res, next) => {
    // logger.info(error);
    logger.info(error.message);

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    next(error);
});

module.exports = app;
