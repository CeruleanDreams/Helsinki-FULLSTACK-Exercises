const blogsRouter = require("express").Router()
const Blog = require("../models/blogs")

blogsRouter.get("/", (req, res) => {
    Blog.find({}).then((blogs) => res.json(blogs))
})

blogsRouter.get('/', async (req, res) => {
  blogs = await Blog.find({})
  res.json(blogs)

 });
  
blogsRouter.post('/', async (req, res, next) => {
    const receivedBlog = req.body

    if (!receivedBlog.title || !receivedBlog.url){
      res.status(400).end()
    }

    const blogToSave = new Blog(receivedBlog)
    
    try{
    result = await blogToSave.save();
    res.status(201).json(result);
    }

    catch(exception){
      next(exception)
    }

  })

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  catch(exception){
    next(exception)
  }
})

blogsRouter.put("/:id", async (req, res, next) => {
  try{
    await Blog.findByIdAndUpdate(req.params.id, {likes: req.body.likes})
    res.status(202).end()
  } 
  catch(exception) {
    next(exception)
  }
})
  
  module.exports = blogsRouter //You export the router object
  