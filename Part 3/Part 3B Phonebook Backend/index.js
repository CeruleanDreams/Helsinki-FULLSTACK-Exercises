


const express = require("express") //Import express

const app = express() //Create express App

const cors = require("cors")

app.use(cors())

require("dotenv").config()

app.use(express.json()) //for all requests to any endpoint, it will execute this function to parse JSON payloads

app.use(express.static("build"))

const Note = require("./models/note");


app.get(("/api/persons/:id"), (req, res, next) => {
Note.findById(req.params.id).then(note => res.json(note)).catch(error => next(error))
});

app.get(("/api/persons"), (req, res, next) => {
  Note.find().then(notes => res.json(notes)).catch(error => next(error))
});

app.get('/api/info', (req, res, next) => {
  Note.find().then((notes) => {
      const length = notes.length;
      const date = new Date();
      res.send(`Phonebook has info for ${length} people, \n ${date}`);
  })
  .catch(error => next(error));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log("Server started on Port 3001")});


app.delete(("/api/persons/:id"), (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
  .then(result => {res.status(204).end()})
  .catch(error => next(error));
});

app.post(("/api/persons"), (req, res, next) => {
  if (req.body.name === "" || req.body.number === ""){

    const error = new Error("")
    error.name = "EmptyNameOrNumber"
    error.message = "Entry must have name AND number associated."

    next(error)
  }

  else{
    const id = Math.floor(Math.random()*100000);

    const newNote = new Note({
      "name": req.body.name,
      "number": req.body.number,
    })
    newNote.save().then(savedNote => {res.json(savedNote)})
    .catch(error => next(error));  //Save that note, then send it as a response
  }
 });

 app.put(("/api/persons/:id"), (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Note.findByIdAndUpdate(req.params.id, person, {new:true, runValidators: true, context: "query" }).then(updatedNote => {res.json(updatedNote)}).catch(error => {console.log(error.response.data.error); return next(error);})
 });


const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "EmptyNameOrNumber"){
    res.status(404).send({error: "Missing name or number"})
  }
  
  if (err.name === "CastError"){
    return res.status(400).send({error: "Malformatted id"})
  }

  if (err.name === "ValidationError"){
    return res.status(400).json({error: err.message})
  }

  next(err)
}
  
app.use(errorHandler)
