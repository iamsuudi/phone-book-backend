require('dotenv').config();

const port = process.env.PORT
const mongoURL = process.env.MONGODB_URI

module.exports = {
    port,
    mongoURL,
}
