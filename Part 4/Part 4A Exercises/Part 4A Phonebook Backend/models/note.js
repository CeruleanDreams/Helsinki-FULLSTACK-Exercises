mongoose = require("mongoose");



//Access

const url = process.env.MANGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url)
.then(result => {console.log("Connection successful.")})
.catch(error => {console.log("Error!")});


const personSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        minLength: 2,
        required: true 
        },
    number: 
        {
        type: String,
        minLength: 8,
        validate: 
            {
                validator: value => (/\d{3}-\d{4}/.test(value)),
                message: props => `${props.value} is not a valid phone number.`
            },
        required: true
        }
    });

personSchema.set("toJSON", 
{transform: (doc, ret) => {
    console.log(ret.id)
    ret.id = ret._id.toString(); //The id we desire is taken straight from _id and stringified
    delete ret._id;
    delete ret.__v;
    }
})

module.exports = mongoose.model("Person", personSchema);



    



