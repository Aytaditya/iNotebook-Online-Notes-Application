const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        //declaring email entered as string and required input and should be unique (our login page backend)
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now

    }
    //the schema that we created will be used in our routes
})

const User = mongoose.model('user', userSchema)
//saving data in users collection of database 
//User is model name

//In MongoDB, when you create a Mongoose model, Mongoose will automatically pluralize the model name to form the collection name in the database. This is a default behavior of Mongoose to ensure consistency with MongoDB's naming conventions.

module.exports = User
