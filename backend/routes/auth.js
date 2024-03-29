const express = require('express')
const router = express.Router()
// importing User schema for data entry in database 
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
//hashing password using bcrypt
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
//a middleware 
var fetchuser=require('../middleware/fetchUser.js')

//ideally we have to hid this string in our environment variable
const JWT_SECRET = 'adityaisgood';


//         MAKING ALL AUTHENTICATION RELATED END POINTS IN THIS FILE


//you cant directly use req.body you need a middle way to use it 
//middleman created in index.js file


//creating a user using POST "/api/auth/createuser"
//use router.post not roter.get so that the password is safe
//router.post gives safty

//                    ROUTER-1
router.post('/createuser', [
    //for correct entry checking though express validator 
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Name must be atleast 6 characters long').isLength({ min: 6 }),
    body('password', 'Password must be atleast * characters long').isLength({ min: 8 })
], async (req, res) => {
    let success=false

    //     console.log(req.body)
    //   const user=User(req.body);

    //   for saving data in mongoDb
    //   user.save()
    //       or 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    //simply if errors is not empty return error else save data 
    try {
        //check if there exist a user already with this email
        // before creating user we have to check if there already exist a user of this name
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Account already exist" })
        }


        //insted of using password:req.body.password we will use bcryptjs
        //generating salt and adding to password for extra safety of user
        // we use await because it returns promise 
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        //creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass

        })


        //prevents repeatation of data
        //   .then(res.send(req.body))
        //   .catch(err=> console.log(err),
        //   res.json({error:"please enter email correctly"}))

        // we will not return user details to user we will return a token which will be used in signining 
        // we will use jsonwebtoken
        // -----> res.json(user)
        const data = {
            user: {
                id: user.id
            }
        }
        //jwt.sign is a sunc method hence dont need to add await
        const authToken = jwt.sign(data, JWT_SECRET)
        // if we add {} we will be able to send response as authToken:
        success=true
        res.json({ success,authToken })


    }
    catch (error) {
        console.log(error)
        res.status(500).send("Error Occured")
    }
})

// authenticate a user 
//                          ROUTER-2
router.post('/login', [
    //for correct entry checking though express validator 
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
        let success=false;
    //sending back error if not true
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // here talking about password, email entered by user 
    const { email, password } = req.body
    try {
        //seraching in data base
        let user = await User.findOne({ email })
        // returning bad response if user does not exist in database
        if (!user) {
            return res.status(400).json({error: "Wrong Credentials Try Again" })
        }
        //comparing entered password to user password 
        //passwordCompare will return true false 
        //bcrypt is defined by me
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({success, error: "Wrong Credentials Try Again" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({ success,authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")

    }
})


// Get logged in user detail
//                       ROUTER-3 
// adding fetchuser middleware in getuser request
router.post('/getuser',fetchuser, async (req, res) => {

    try {
        // now from authToken we have to fetch user id and give all the data 
        userId=req.user.id

        //selecting every data of user except the password
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")

    }
})


module.exports = router