const config = require("./utils/config")

const express = require('express')

const app = express()

const cors = require('cors')

require("dotenv").config

const mongoose = require("mongoose")

const usersRouter = require('./controllers/usersRouter')

const blogsRouter = require('./controllers/blogsRouter')

const loginRouter = require('./controllers/loginRouter')

mongoose.connect(config.MONGODB_URI)

app.use(cors())

app.use(express.json())

const tokenExtractor = require('./middleware/extractToken')

const userExtractor = require('./middleware/extractUser')

app.use("/api/login", loginRouter)

app.use("/api/users", usersRouter)

console.log("Done")

app.use("/api/blogs", tokenExtractor, userExtractor, blogsRouter)


const errorHandler = (error, req, res, next) => {
    console.log(error.message);
  
    next(error);
  }
  
  // this has to be the last loaded middleware.
  
app.use(errorHandler)

module.exports = app