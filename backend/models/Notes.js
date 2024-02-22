const mongoose =require('mongoose');
//model folder is my schema folder
//notes schema
const notesSchema=new Schema({
    title:{
        type: String,
        required: true

    },
    description:{
        required: true,
        unique:true
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