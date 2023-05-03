const bcryptjs = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/users");
const { result } = require("lodash");
const jwt = require("jsonwebtoken")

/*usersRouter.get("/", (req, res) => {
    User.find({}).then((users) => res.json(users))
})*/


usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate("blogs")
  res.json(users)

 });
  
usersRouter.post('/', async (req, res, next) => {
    let receivedUser = req.body

    const user = await User.findById(receivedUser.id)

    //console.log("FRESH", receivedUser)

    if (!receivedUser.name || !receivedUser.username || !receivedUser.password){
      res.status(400).json({error: "content missing"})
    }

    else if (receivedUser.username.length < 3 || receivedUser.password.length < 3) {
      res.status(400).json({ error: 'invalid password or username length' })
    }

    else {
      const saltRounds = 10

      receivedUser = {...receivedUser, password: await bcryptjs.hash(receivedUser.password, saltRounds)}; 
      //More secure than just doing receivedUser.password = await bcryptjs hash(receivedUser.password, saltRounds)
    

      const {name, username, password} = receivedUser

      const userToSave = new User({
          name,
          username,
          passwordHashed: password //changing the property-key to passwordHashed
      })
      
      try{
      const result = await userToSave.save();
      // console.log("SAVE", result)
      res.status(201).json(result);
      } catch(error){
        next(error)
      }
      
    }
  })

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  catch(error){
    next(error)
  }
})


usersRouter.put("/:id", async (req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(202).end()
  } 
  catch(error) {
    next(error)
  }
})
  
  module.exports = usersRouter //You export the router object
  