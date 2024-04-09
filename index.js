const express = require("express");
const mongoose = require("mongoose");
const appRoute = require("./app");
const logger = require("./utils/logger");
const config = require("./utils/config");

const app = express();

if (process.argv.length < 3) {
    logger.info("give password as argument");
    process.exit(1);
}

logger.info("connecting to mongodb");

mongoose
    .connect(config.mongoURL)
    .then((result) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

app.use(express.static("dist"));
app.use("/persons", appRoute);

app.listen(config.port, () => {
    logger.info(`app server is listening on port ${config.port}`);
});
