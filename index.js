const express = require("express");
const mongoose = require("mongoose");
const appRoute = require("./app");
const logger = require("./utils/logger");
const config = require("./utils/config");

const app = express();

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
