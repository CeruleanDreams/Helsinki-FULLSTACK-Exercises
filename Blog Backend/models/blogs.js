const { transform } = require('lodash');
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  })
  
  const Blog = mongoose.model('Blog', blogSchema);

  blogSchema.set("toJSON", {transform: (doc, retObj) => {

    if (!retObj.likes){
      retObj.likes = 0
    } //If missing info, docs do not initialise that info to a default value

    retObj.id = retObj._id
    delete retObj._id
    delete retObj.__v
  }}); //This works since toJSON is called on all documents as it is extracted from the DB

  module.exports = Blog