const express = require('express');
const appRoute = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');

const app = express();

app.use('/persons', appRoute);

app.listen(config.port, () => {
    logger.info(`app server is listening on port ${config.port}`);
})