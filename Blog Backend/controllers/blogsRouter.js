
const blogsRouter = require("express").Router()
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blogs")
const User = require("../models/users")


/*blogsRouter.get("/", (req, res) => {
    Blog.find({}).then((blogs) => res.json(blogs))
})*/



blogsRouter.get('/', async (req, res) => { 
  const blogs = await Blog.find({}).populate("user")
  res.json(blogs)

 });
  
blogsRouter.post('/', async (req, res, next) => {
    let receivedBlog = req.body
    // console.log("BODY", receivedBlog)

    //Guaranteed since tokens aren't created unless the user doesn't already exist in the DB
    const user = req.user

    if (!receivedBlog.title || !receivedBlog.url){
      return res.status(400).json({error: "Missing title or url"}) 
    }

    //Assigning the creator
    receivedBlog.user = user._id;

    const blogToSave = new Blog(receivedBlog)
    
    try {

    const result = await blogToSave.save();

    //Saving onto list of blogs for the user
    user.blogs.push(result.id)

    await user.save() //don't forget to save changes to the blogs array

    return res.status(201).json(result);
    }

    catch(exception){
      next(exception)
    }
    
  })

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === req.user._id.toString() && req.token){
    await Blog.findByIdAndDelete(req.params.id)
    return res.status(204).end()
    }
    else{
      return res.status(401).json({error: "Current user is not user of the blog"}) 
    }
  }
  catch(exception){
    next(exception)
  }
})

blogsRouter.put("/:id", async (req, res, next) => {
  try{
    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === req.user._id.toString() && req.token){
      blog.likes = req.body.likes;
      await blog.save()
      return res.status(202).end()
    }
    else{
      return res.status(401).json({error: "Current user is not user of the blog"}) 
    }
  } 
  catch(exception) {
    next(exception)
  }
})
  
  module.exports = blogsRouter //You export the router object
  