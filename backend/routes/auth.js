const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    obj={
        a:"the",
    number:134
    }
    res.json(obj)
})
module.exports=router