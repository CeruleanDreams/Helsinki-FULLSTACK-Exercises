const User = require("../models/users")
const jwt = require("jsonwebtoken")

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    
    //console.log(decodedToken.id)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    req.user = user;
    //console.log(req.user)

    next()
}

module.exports = userExtractor