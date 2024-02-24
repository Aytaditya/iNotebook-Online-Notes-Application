const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

//you cant directly use req.body you need a middle way to use it 
//middleman created in index.js file


//create a user using POST "/api/auth/createuser"
//use router.post not roter.get so that the password is safe
//royer.post gives safty
router.post('/createuser', [
    //for correct entry checking though express validator 
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Name must be atleast 6 characters long').isLength({ min: 6 }),
    body('password', 'Password must be atleast * characters long').isLength({ min: 8 })
], async (req, res) => {

    //     console.log(req.body)
    //   const user=User(req.body);

    //   //for saving data in mongoDb
    //   user.save()
    //       or 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //simply if errors is not empty return error else save data 
    try {
        //check if there exist a user already with this email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Account already exist" })
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        })


        //prevents repeatation of data
        //   .then(res.send(req.body))
        //   .catch(err=> console.log(err),
        //   res.json({error:"please enter email correctly"}))
        res.json(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error Occured")

    }

})
module.exports = router