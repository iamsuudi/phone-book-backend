const port = 3001;
const mongoURL = `mongodb+srv://abdulfetah:${process.argv[2]}@suudi.nro6rmy.mongodb.net/phonebook?retryWrites=true&w=majority&appName=suudi`;

module.exports = {
    port,
    mongoURL,
}