require("dotenv").config()

const PORT = process.env.PORT
const mongoUrl = process.env.MANGODB_URI

module.exports = {PORT, mongoUrl}