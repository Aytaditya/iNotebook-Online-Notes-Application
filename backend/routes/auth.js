const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body,validationResult}=require('express-validator')

//you cant directly use req.body you need a middle way to use it 


//create a user using POST "/api/auth"

//use router.post not royer.get so that the password is saved 
router.post('/',[
    //for correct entry checking though express validator 
    body('email','Enter a valid Email').isEmail(),
    body('name','Name must be atleast 6 characters long').isLength({min:6}),
    body('password','Password must be atleast * characters long').isLength({min:8})
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

  User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password

  })
  //prevents repeatation of data
  .then(res.send(req.body))
  .catch(err=> console.log(err),
  res.json({error:"please enter email correctly"}))
  
})
module.exports=router