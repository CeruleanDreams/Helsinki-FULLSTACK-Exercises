require('express')

const tokenExtractor = async (req, res, next) => {
    
    const authorization = req.get('authorization');
    //console.log(authorization)
    
    if (authorization && authorization.startsWith('Bearer ')) {
     req.token = authorization.replace('Bearer ', '')
     //console.log("TOKEN", req.token)
    }
    next()
  }

module.exports = tokenExtractor