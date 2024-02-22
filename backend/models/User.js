const mongoose =require('mongoose');

const userSchema=new Schema({
    name:{
        type: String,
        required: true

    },
    email:{
        //declaring email entered as string and required input and should be unique (our login page backend)
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    timeStamp:{
        type:Date,
        default:Date.now

    }
    //the schema that we created will be used in our routes
})
module.exports=mongoose.model('user',userSchema)