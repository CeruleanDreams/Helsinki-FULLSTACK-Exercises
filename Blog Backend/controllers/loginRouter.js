const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const loginRouter = require("express").Router()
const User = require('../models/users')

loginRouter.post('/', async (req, res) => {
    const {username, password } = req.body

    const user = await User.findOne({username})
    console.log("BB", user)

    const passwordCorrect = user === null 
    ? false 
    : await bcryptjs.compare(password, user.passwordHashed)

    if (!user || !passwordCorrect){
        return res.status(401).json({error: "invalid username or password"})
    }

    const {name, id} = user

    const tokenedUser = {
        username,
        id
    }

    const token = jwt.sign(tokenedUser, process.env.SECRET, {expiresIn: 60*60*6}) //Don't forget to add to .env
    res.status(200).send({token, username, name})
})

module.exports = loginRouter