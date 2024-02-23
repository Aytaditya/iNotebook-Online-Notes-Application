const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body,validationResult}=require('express-validator')

//you cant directly use req.body you need a middle way to use it 


//create a user using POST "/api/auth"

//use router.post not royer.get so that the password is saved 
router.post('/',[
    //for correct entry checking
    body('email').isEmail(),
    body('name').isLength({min:8}),
    body('password').isLength({min:8})
],(req,res)=>{
//     console.log(req.body)
//   const user=User(req.body);

//   //for saving data in mongoDb
//   user.save()
//       or 
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  //simply if errors is not empty return error else save data 
  res.send(req.body)
  
})
module.exports=router