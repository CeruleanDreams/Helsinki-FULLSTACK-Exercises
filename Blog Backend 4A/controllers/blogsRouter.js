const blogsRouter = require("express").Router()
const Blog = require("../models/blogs")

blogsRouter.get("/", (req, res) => {
    Blog.find({}).then((blogs) => res.json(blogs))
})

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter //You export the router object
  