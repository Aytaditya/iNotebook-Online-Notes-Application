const mongoose =require('mongoose');
const {Schema}=mongoose;


//model folder is my schema folder
//notes schema
// a schema is a blueprint or structure that defines the organization of data within a database


const notesSchema=new Schema({
    // we have to link notes and user together so that other user cannot see notes of other user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //this statement says that user is like a foreign key and is of different Schema

        ref:'User'
        // this User should match the name of the model used ofr using type

    },
    title:{
        type: String,
        required: true

    },
    description:{
        type:String,
        required: true,
    },
    tag:{
        type: String,
        default:"General"
        
    },
    date:{
        type:Date,
        default:Date.now
    },

})
module.exports=mongoose.model('notes',notesSchema)
// will store data of notes in notes collection