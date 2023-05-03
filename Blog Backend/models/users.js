const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  
    name: String,
    username: {type: String, unique: true},
    passwordHashed: String, //Hashed version
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId, //Specify it's an id
            ref: "Blog" 
        }
    ]
  })


  userSchema.plugin(uniqueValidator)



userSchema.set("toJSON", {transform: (doc, retObj) => {

    /*if (retObj.passwordHashed){
      console.log(retObj.passwordHashed);
    }*/
    
    retObj.id = retObj._id
    delete retObj._id
    delete retObj.__v
    delete retObj.passwordHashed
  }}); //This works since toJSON is called on all documents as it is extracted from the DB

  const User = mongoose.model('User', userSchema);

  module.exports = User